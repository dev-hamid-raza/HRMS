import { AUTH_API } from "@/lib/constants/api/auth"
import { postApi } from "./apiClient"

export const login = async (body: {
    username: string
    password: string
}) => {
    const res =  await postApi({
        url: AUTH_API.LOGIN,
        body
    })
    return res.data
}