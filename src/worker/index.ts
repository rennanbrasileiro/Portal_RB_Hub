import { Hono } from "hono";

interface Env {
  // Add your environment bindings here
}

const app = new Hono<{ Bindings: Env }>();

export default app;
