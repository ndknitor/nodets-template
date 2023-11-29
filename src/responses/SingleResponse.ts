import StandardResponse from "./StandardResponse";

export default interface SingleResponse<T> extends StandardResponse {
    data? : T;
}