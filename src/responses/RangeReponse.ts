import StandardResponse from "./StandardResponse";

export default interface RangeReponse<T> extends StandardResponse {
    data?: T[];
}