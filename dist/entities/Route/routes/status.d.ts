/// <reference types="express" />
export default function status(extraStatusHandler?: () => Promise<Record<string, any>>): import("express").Router;
