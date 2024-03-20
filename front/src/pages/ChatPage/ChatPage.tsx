import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { CenteredBlock } from "../../components/Blocks"
import { Message } from '../../types/Chats.interface'
import { backendAdress } from "../../utils/env"
import Axios from "../../utils/axiosConfig"

export default function ChatPage() {
    const { user_id } = useParams<{ user_id: string }>()
    const [messages, setMessages] = useState<Message[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>('')
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const socketUrl = `ws/chat/${user_id}/`

    useEffect(() => {
        const newSocket = new WebSocket('ws' + backendAdress.slice(4) + socketUrl)
        newSocket.addEventListener('message', event => {
            const responseData: Message = JSON.parse(event.data).message
            setMessages(prevMessages => [...prevMessages, responseData])
            console.log(responseData)
        })
        setSocket(newSocket)
    }, [user_id])

    function sendMessage() {
        if (socket) {
            socket.send(JSON.stringify({ chat: 1, text: currentMessage }))
        }
        setCurrentMessage('')
    }

    return (
        <CenteredBlock>
            <h1>Чат</h1>
            {messages.map((message, index) => (
                <div key={index}>{message.user.first_name}: {message.text}</div>
            ))}
            <div>
                <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} type="text" />
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </CenteredBlock>
    )
}
