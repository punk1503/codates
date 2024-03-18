import { User } from "./User.interface"

export type Message = {
    sender: User,
    chat: number,
    text: string,
    timestamp: string,
}

export type Chat = {
    user1: User,
    user2: User,
}