import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { CenteredBlock } from "../../components/Blocks"
import { Message } from '../../types/Chats.interface'
import { backendAdress } from "../../utils/env"
import Axios from "../../utils/axiosConfig"
import Spinner from "../../components/Spinner"

export default function ChatPage() {
    const { user_id } = useParams<{ user_id: string }>()
    const [messages, setMessages] = useState<Message[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>('')
    const socketUrl = `ws/chat/${user_id}/`
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);

    useEffect(() => {
        function listener(event: any) {
            const responseData: Message = JSON.parse(event.data).message
            setMessages(prevMessages => [...prevMessages, responseData])
            console.log(responseData)
        }
        const newSocket = new WebSocket('ws' + backendAdress.slice(4) + socketUrl)
        setReadyState(WebSocket.CONNECTING)
        newSocket.onopen = () => setReadyState(WebSocket.OPEN)
        newSocket.onclose = () => setReadyState(WebSocket.CLOSED)
        newSocket.addEventListener('message', listener)
        setSocket(newSocket)
        return function () {
            newSocket.removeEventListener('message', listener)
            newSocket.close()
        }
    }, [user_id])

    useEffect(() => {
        Axios.get(`chat/${user_id}`)
        .then((response) => {
            console.log(response)
        })
    }, [])

    function sendMessage() {
        if (socket) {
            socket.send(JSON.stringify({ chat: 1, text: currentMessage }))
        }
        setCurrentMessage('')
    }

    if (readyState === WebSocket.CONNECTING || readyState == WebSocket.CLOSING) {
        return (
            <Spinner/>
        )
    }

    return (
        <CenteredBlock>
            {readyState === WebSocket.OPEN ?
            <>
                {messages.map((message, index) => (
                    <div key={index}>{message.user.first_name}: {message.text}</div>
                ))}
                <div>
                    <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} type="text" />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
            </> 
            :
            <>
                <h1>Чат не существует</h1>
            </>
            }
        </CenteredBlock>
    )
}
