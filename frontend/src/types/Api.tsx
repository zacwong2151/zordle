export type JSONResponse = {
    data: any
    message: string,
    success: boolean
}

export const INTERNAL_SERVER_ERROR_RESPONSE: JSONResponse = {
    data: null,
    message: "Internal Server Error",
    success: false
}