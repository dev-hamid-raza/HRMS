import { AUTH_API } from "@/lib/constants/api/auth"
import { getApi, postApi } from "./apiClient"
import type { IUserResponse } from "@/types/auth.types"

export const login = async (body: {
    username: string
    password: string
}) => {
    const res =  await postApi<IUserResponse>({
        url: AUTH_API.LOGIN,
        body
    })
    return res.data
}

export const checkSession = async () => {
    const res =  await getApi<IUserResponse>({
        url: AUTH_API.CHECK_SESSION,
    })
    return res.data
}