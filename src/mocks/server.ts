import { createServer, Model, Server } from 'miragejs';
import { executeHandler } from './handlers';

let server: Server | undefined;

export function makeServer() {
  if (server) {
    server.shutdown();
  }

  server = createServer({
    models: {
      execution: Model.extend({}),
    },

    routes() {
      this.namespace = 'api';

      this.post('/execute', executeHandler);
    }
  });

  return server;
}