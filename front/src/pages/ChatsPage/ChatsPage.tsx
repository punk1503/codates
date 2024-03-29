import { useState, useEffect } from "react"
import { CenteredBlock } from "../../components/Blocks"
import { Chat } from '../../types/Chats.interface'
import { Link } from "react-router-dom"
import Axios from "../../utils/axiosConfig"
import Button from "../../components/Button"
import './ChatsPage.css'
import '../../components/ClearLink.css'

export default function ChatsPage() {
	const [chats, setChats] = useState<Chat[]>([])
	const [isPopupShown, setIsPopupShown] = useState<boolean>(false)
	const [currenChatToDelete, setCurrentChatToDelete] = useState<number>(-1)
	function fetchChats() {
		Axios.get('chats/')
		.then((response: any) => {
			setChats(response.data)
		})
	}

	useEffect(() => {
		fetchChats()
	}, [])

	function openRemoveChatPopup(user_id: number) {
		setIsPopupShown(true)
		setCurrentChatToDelete(user_id)
	}

	function sendDeleteChatRequest() {
		Axios.delete(`chat-destroy/${currenChatToDelete}/`)
		.then(() => {
			fetchChats()
		})
	}
	return (
		<CenteredBlock>
			<h1>Чаты</h1>
			{isPopupShown && 
				<div className="popup">
					<h5>Удалить этот чат?</h5>
					<div className="popup__buttons_block">
						<Button onClick={() => {setIsPopupShown(false)}} style={{backgroundColor: 'var(--background)', color: 'var(--text)'}}>Нет</Button>
						<Button onClick={sendDeleteChatRequest}>Да</Button>
					</div>
				</div>
			}
			<div className="chats">
				{chats.map((chat, index) => {
					return (
						<div key={index} className="chat">
							<img src={chat.user.images[0]?.image} alt=""/>
							<Link to={`/chat/${chat.user.id}`} className="chat__user_name">{chat.user.first_name}</Link>
							<svg onClick={() => {openRemoveChatPopup(chat.user.id)}} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
						</div>
					)
				})}
			</div>
		</CenteredBlock>
	)
}
