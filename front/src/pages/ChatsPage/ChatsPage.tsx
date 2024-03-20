import { useState, useEffect } from "react"
import { CenteredBlock } from "../../components/Blocks"
import { Chat, Message } from '../../types/Chats.interface'
import Axios from "../../utils/axiosConfig"
import { backendAdress } from "../../utils/env"

const socket = new WebSocket('ws' + backendAdress.slice(4, backendAdress.length+1) +'ws/chat/2/')

export default function ChatsPage() {
    const [chats, setChats] = useState<Chat[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>('')

    socket.addEventListener('message', event => {
        const responseData: Message = JSON.parse(event.data).message
        setMessages([...messages, ...[responseData]])
    })

    useEffect(() => {
        function fetchChats() {
            Axios.get('chats/')
            .then((response: any) => {
                setChats(response.data)
            })
        }
        fetchChats()
    }, [])

    function sendMessage() {
        socket.send(JSON.stringify({chat: 1, text: currentMessage}))
        setCurrentMessage('')
    }

    useEffect(() => {

    })

    return (
        <CenteredBlock>
            <h1>Чат</h1>
            {messages.map((message, index) => {
                return (<div key={index}>{message.user.first_name}: {message.text}</div>)
            })}
            <div>
                <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} type="text" />
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </CenteredBlock>
    )
}