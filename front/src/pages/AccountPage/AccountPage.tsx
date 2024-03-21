import './AccountPage.css'
import { useEffect, useState } from 'react'
import { User } from '../../types/User.interface'
import { PhotoGallery } from '../../components/UserCard/UserCard'
import { CenteredBlock } from '../../components/Blocks'
import hljs from 'highlight.js'
import Axios from '../../utils/axiosConfig'
import addMediaPrefix from '../../utils/addMediaPrefix'
import '../../components/UserCard/UserCard.css'
import '../../assets/css/themes.css'

export default function AccountPage() {
    const [user, setUser] = useState<User | null>(null)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    useEffect(() => {
        Axios.get('whoami/')
        .then((response) => {
            setUser(response.data)        
            hljs.highlightAll()

        })
    }, [])
    return (
        <CenteredBlock>
            <div className='account_block'>
                <div className="account_block__top">
                    <div className="dummy"></div>
                    {
                        !isEditMode ? <svg onClick={() => {setIsEditMode(true)}} className='account_block__top__edit' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        :<svg onClick={() => {setIsEditMode(false)}} className='account_block__top__close' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    }           
                </div>
                {!isEditMode ?
                    <>
                        <PhotoGallery photos={user?.images ? user?.images.map((image) => addMediaPrefix(image.image)) : []}></PhotoGallery>
                        <h4>{user?.first_name}, {user?.age}</h4>
                        <div><strong>username: </strong>{user?.username}</div>
                        <p><strong>Описание: </strong>{user?.description}</p>
                        <p><strong>Город: </strong>{user?.city.name}</p>
                        <div className="tech_block">
                            {user?.technologies?.map((tech, index) => {
                                return (
                                <div
                                    key={index}
                                    className="tech"
                                    style={{ backgroundColor: tech.background_color, color: tech.font_color }}
                                >
                                    {tech.name}
                                </div>
                                )
                            })}
                        </div>
                        <p><strong>Тема редактора: </strong>{user?.code_theme}</p>
                        <pre className={`code_block theme-${user?.code_theme}`}>
                            <code className='code_block'>
                                {user?.code_snippet}
                            </code>
                        </pre>
                    </>
                    :
                    <></>
                }
            </div>
        </CenteredBlock>
    )
}
