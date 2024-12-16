import { createServer } from 'miragejs';

if (import.meta.env.MODE === 'development') {
  createServer({
    routes() {
      this.namespace = 'api';
      this.get('/code-execution', () => {
        return { status: 'success', message: 'Code executed successfully!' };
      });
    },
  });
}