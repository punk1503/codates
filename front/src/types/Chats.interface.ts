import { User } from "./User.interface"

export type Message = {
    user: User,
    chat: number,
    text: string,
    timestamp: string,
}

export type Chat = {
    user: User,
}