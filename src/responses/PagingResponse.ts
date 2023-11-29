import RangeReponse from "./RangeReponse";

export default class PagingResponse<T> implements RangeReponse<T>
{
    data?: T[];
    message?: string;
    size : number;
    total : number;
}