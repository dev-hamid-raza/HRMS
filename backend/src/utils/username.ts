import { User } from "../models/user.model.js"

export const generateUniqueUsername = async (first: string, last: string) => {
    let base = `${first}${last}`.replace(/\s+/g, "").toLowerCase()
    let username = base
    let counter = 0

    while (await User.findOne({ username })) {
        counter++
        username = `${base}${counter}`
    }

    return username
};
