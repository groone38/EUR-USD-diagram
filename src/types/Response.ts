export interface IResponse {
  code: number;
  info: { server_time: string; credit_count: number };
  credit_count: number;
  server_time: string;
  msg: string;
  response: DataResponse[];
  status: boolean;
}

export interface DataResponse {
  c: string;
  ch: string;
  cp: string;
  h: string;
  id: string;
  l: string;
  o: string;
  s: string;
  t: string;
  tm: string;
  up: string;
}
