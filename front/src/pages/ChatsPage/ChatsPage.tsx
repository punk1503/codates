import { useState, useEffect } from "react"
import { CenteredBlock } from "../../components/Blocks"
import { Chat } from '../../types/Chats.interface'
import { Link } from "react-router-dom"
import Axios from "../../utils/axiosConfig"
import './ChatsPage.css'
import '../../components/ClearLink.css'

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
			<div className="chats">
				{chats.map((chat, index) => {
					return (
						<Link className="clear_link" to={`/chat/${chat.user.id}`}>
							<img src={chat.user.images[0]?.image} alt="" />
							<div key={index} className="chat">
								{chat.user.first_name}
							</div>
						</Link>
					)
				})}
			</div>
		</CenteredBlock>
	)
}