import JobContext from "./context";
import { NextFunction } from "./types";

export function reschedule(time: number) {
  return async (ctx: JobContext<any>, next: NextFunction) => {
    await next()
    await ctx.schedule(ctx.name, new Date(Date.now() + time), ctx.payload)
  }
}

export function log() {
  return async (ctx: JobContext<any>, next: NextFunction) => {
    const startAt = Date.now()
    await next()
    const time = Date.now() - startAt
    console.log(`Job "${ctx.name}" (id: "${ctx.id}") completed! time: ${(time / 1000).toFixed(3)}s`)
  }
}