import cluster from 'cluster'
import client, { Registry, AggregatorRegistry } from 'prom-client'
import logger from '../Development/logger'
import {
  MetricMessage,
  ClusterMessageType,
  ReportMetricsRequest,
  ReportMetricsResponse,
} from './types'

let REQUEST_ID = 0

export class ClusterRegistry {
  static sendMessage(report: MetricMessage) {
    if (process.send) {
      process.send(report)
    }
  }

  static createId() {
    return [ClusterRegistry.getCurrentWorkerId(), REQUEST_ID++].join('::')
  }

  static getCurrentWorkerId() {
    return cluster.worker.id
  }

  static getWorker(id: number) {
    return (
      cluster.workers &&
      (cluster.workers[id] as Pick<cluster.Worker, 'send' | 'id'> | undefined)
    )
  }

  static getWorkers() {
    return Object.values(cluster.workers).filter(Boolean) as Pick<
      cluster.Worker,
      'send' | 'id'
    >[]
  }

  static addEventListener(registry: ClusterRegistry) {
    process.on('message', registry.handler)
  }

  static removeEventListener(registry: ClusterRegistry) {
    process.off('message', registry.handler)
  }

  static isMaster() {
    return cluster.isMaster
  }

  static merge(registers: Registry[]): ClusterRegistry {
    const clusterRegistry = new ClusterRegistry()
    for (const registry of registers) {
      const metrics: client.Metric<any>[] = registry.getMetricsAsArray() as any
      for (const metric of metrics) {
        clusterRegistry.registerMetric(metric)
      }
    }

    return clusterRegistry
  }

  private registry = new Registry()
  private forkRequests = new Map<string, (metrics: string) => void>()
  private masterRequests = new Map<
    string,
    { metrics: client.metric[][]; worker: number; pending: number }
  >()

  constructor() {
    ClusterRegistry.addEventListener(this)
  }

  registerMetric(metrics: client.Metric<any>) {
    this.registry.registerMetric(metrics)
  }

  handleMasterMessages = (message: MetricMessage) => {
    switch (message.type) {
      case ClusterMessageType.RequestMetric:
        return this.forwardRequestMetrics(message)
      case ClusterMessageType.ResponsetMetric:
        return this.collectMetrics(message)
    }
  }

  handleForkMessages = (message: MetricMessage) => {
    switch (message.type) {
      case ClusterMessageType.RequestMetric:
        return this.reportForkMetrics(message)
      case ClusterMessageType.ResponsetMetric:
        return this.resolveForkMetrics(message)
    }
  }

  get handler() {
    return ClusterRegistry.isMaster()
      ? this.handleMasterMessages
      : this.handleForkMessages
  }

  async metrics() {
    if (ClusterRegistry.isMaster()) {
      return this.registry.metrics()
    }

    const id = ClusterRegistry.createId()
    const req = new Promise<string>((resolve) => {
      this.forkRequests.set(id, resolve)
    })

    ClusterRegistry.sendMessage({
      id,
      type: ClusterMessageType.RequestMetric,
      worker: ClusterRegistry.getCurrentWorkerId(),
    })

    return req
  }

  reportForkMetrics(message: ReportMetricsRequest) {
    const metrics = this.registry.getMetricsAsJSON().catch((err: Error) => {
      logger.error(`Error getting metrics as JSON: ${err.message}`, err)
      return [] as client.metric[]
    })

    return metrics.then((metrics) => {
      const report: ReportMetricsResponse = {
        type: ClusterMessageType.ResponsetMetric,
        id: message.id,
        metrics,
      }

      ClusterRegistry.sendMessage(report)
    })
  }

  resolveForkMetrics(message: ReportMetricsResponse) {
    const resolve = this.forkRequests.get(message.id)
    if (resolve) {
      this.forkRequests.delete(message.id)
      const registry = AggregatorRegistry.aggregate([message.metrics])
      registry
        .metrics()
        .then((metrics) => resolve(metrics))
        .catch((err: Error) => {
          logger.error(`Error resolving metrics: ${err.message}`, err)
          resolve('')
        })
    }
  }

  forwardRequestMetrics(message: ReportMetricsRequest) {
    if (!ClusterRegistry.isMaster()) {
      return
    }

    const workers = ClusterRegistry.getWorkers()
    const pending = workers.length
    if (pending === 0) {
      return
    }

    const worker = message.worker
    const metrics = [] as client.metric[][]
    this.masterRequests.set(message.id, { pending, worker, metrics })

    for (const fork of workers) {
      fork.send(message)
    }
  }

  collectMetrics(message: ReportMetricsResponse) {
    const task = this.masterRequests.get(message.id)
    if (task) {
      task.pending--
      task.metrics.push(message.metrics)

      if (task.pending === 0) {
        this.masterRequests.delete(message.id)
        const fork = ClusterRegistry.getWorker(task.worker)
        if (fork) {
          fork.send({
            id: message.id,
            type: ClusterMessageType.ResponsetMetric,
            metrics: task.metrics,
          })
        }
      }
    }
  }
}
