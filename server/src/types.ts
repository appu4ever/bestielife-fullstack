import { Request, Response } from 'express';
import { ReadStream } from 'fs';
import { Redis } from 'ioredis';
export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
};

export type ImageUpload = {
  filename: string;
  createReadStream: () => ReadStream;
};
