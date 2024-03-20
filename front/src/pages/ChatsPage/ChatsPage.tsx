import { useState, useEffect } from "react"
import { CenteredBlock } from "../../components/Blocks"
import { Chat } from '../../types/Chats.interface'
import { Link } from "react-router-dom"
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
            {chats.map((chat, index) => {
                return (
                    <div key={index} className="chat">
                        <Link to={`/chat/${chat.user.id}`}>{chat.user.first_name}</Link>
                    </div>
                )
            })}
        </CenteredBlock>
    )
}