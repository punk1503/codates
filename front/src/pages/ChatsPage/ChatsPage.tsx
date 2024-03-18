import { useState, useEffect } from "react"
import { CenteredBlock } from "../../components/Blocks"
import { Chat, Message } from '../../types/Chats.interface'
import Axios from "../../utils/axiosConfig"

export default function ChatsPage() {
    const [chats, setChats] = useState<Chat[]>([])
    useEffect(() => {
        function fetchChats() {
            Axios.get('chats/')
            .then((response: any) => {
                setChats(response.data)
            })
        }
        fetchChats()
    }, [])
    return (
        <CenteredBlock>
            <h1>Чаты</h1>
            {chats.map((chat) => {
                return (
                    <div>
                        {chat.user1.username} - {chat.user2.username}
                    </div>
                )
            })}
        </CenteredBlock>
    )
}