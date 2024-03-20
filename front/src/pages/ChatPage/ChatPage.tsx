import { useEffect, useRef, useState } from "react"
import { useParams } from 'react-router-dom'
import { CenteredBlock } from "../../components/Blocks"
import { Message } from '../../types/Chats.interface'
import { backendAdress } from "../../utils/env"
import { User } from "../../types/User.interface"
import Axios from "../../utils/axiosConfig"
import Spinner from "../../components/Spinner"
import './ChatPage.css'

function Msg(props: {text: string, user: User}) {
    const { user_id } = useParams<{ user_id: string }>()
    if (user_id) {
        return (
            <div className={"message" + (parseInt(user_id) !== props.user.id ? " message--right" : " message--left")}>{props.text}</div>
        )
    }

    return <></>
}

export default function ChatPage() {
    const { user_id } = useParams<{ user_id: string }>()
    const [messages, setMessages] = useState<Message[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>('')
    const socketUrl = `ws/chat/${user_id}/`
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);
    const chatDummyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function listener(event: any) {
            const responseData: Message = JSON.parse(event.data).message
            setMessages(prevMessages => [...prevMessages, responseData])
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

    useEffect(() => {if (chatDummyRef.current) chatDummyRef.current.scrollIntoView({behavior: 'smooth'})}, [messages])

    useEffect(() => {
        Axios.get(`chat/${user_id}/`)
        .then((response) => {
            setMessages(response.data)
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
            <div className="chat_block">
                <div className="chat_header">
                    <h4>Чат</h4>
                </div>
                <div className="messages">
                    {messages.map((message, index) => (
                        <Msg key={index} text={message.text} user={message.user}></Msg>
                    ))}
                    <div ref={chatDummyRef} id="dummy"></div>
                </div>
                <div className="send_block">
                    <input className="message_input" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} type="text" />
                    <button className="message_send_button" onClick={sendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                    </button>
                </div>
            </div> 
            :
            <>
                <h1>Чат не существует</h1>
            </>
            }
        </CenteredBlock>
    )
}
