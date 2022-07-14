import { AxiosResponse } from 'axios';

export interface error {
  statusCode: number;
  message: string;
}

// export interface resolve {
//   response: Record<string, any> | Array<any>;
// }

export type Resolve = Record<string, any>;

export type AxiosResponseType = Promise<AxiosResponse<Resolve, error>>;
