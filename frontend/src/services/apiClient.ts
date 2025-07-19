import { axiosInstance } from "./axiosInstance"


type RequestOptions = {
    params?: Record<string, string | number | boolean>
}

export const getApi = async <ResponseType>(
    url: string,
    options: RequestOptions = {}
): Promise<ResponseType> => {
    const response = await axiosInstance.get<ResponseType>(url, options)
    return response.data
}

export const postApi = async<BodyType, ResponseType> (
    url: string,
    data: BodyType,
    options: RequestOptions = {}
): Promise<ResponseType> => {
    const response = await axiosInstance.post<ResponseType>(url, data, options)
    return response.data
}