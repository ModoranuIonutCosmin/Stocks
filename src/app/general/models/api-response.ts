export interface ApiResponse<T> {
    successful: boolean;
    errorMessage: string;
    response: T;
}
