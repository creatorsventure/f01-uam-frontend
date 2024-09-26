export interface IAPIResponse {
    status: boolean;
    message: string;
    type: APIResponseType;
    object: any;
}

export class APIResponse implements IAPIResponse {
    status: boolean;
    message: string;
    type: APIResponseType;
    object: any;
}

export enum APIResponseType {
    MESSAGE = 0,
    OBJECT = 1,
    LIST = 2
}
