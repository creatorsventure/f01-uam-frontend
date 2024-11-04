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
    MESSAGE_ACTUAL = 0,
    MESSAGE_CODE = 1,
    MESSAGE_CODE_LIST = 2,
    OBJECT_ONE = 3,
    OBJECT_LIST = 4
}
