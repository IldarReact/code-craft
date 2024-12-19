import { Request as MirageRequest } from 'miragejs';
import { Registry, ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export interface ExecuteRequest {
  code: string;
  language: string;
}

export type AppSchema = Schema<Registry<{
  execution: ModelDefinition;
}, {}>>

export type HandlerRequest = MirageRequest & {
  requestBody: string;
}