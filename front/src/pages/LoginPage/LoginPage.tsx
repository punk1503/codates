import { useNavigate } from "react-router-dom"
import { CenteredBlock } from "../../components/Blocks"
import { useAuth } from "../../context/AuthContext"
import Form from "../../components/Form/Form"
import Cookies from "js-cookie"

export default function LoginPage() {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuth()
    return (
        <>
        <CenteredBlock>
            <h1>Вход</h1>
            <Form
                action_url="signin/"
                fields_data={
                    [
                        {
                            label: 'Имя пользователя',
                            placeholder: 'username',
                            requestFieldName: 'username',
                            fieldType: 'text',
                            isRequired: true
                        },
                        {
                            label: 'Пароль',
                            placeholder: '********',
                            requestFieldName: 'password',
                            fieldType: 'password',
                            isRequired: true
                        }
                    ]
                }
                submit_button_text="Вход"
                response_callback={(response) => {
                    Cookies.set('sessionid', response.data['sessionid'])
                    setIsAuthenticated(true)
                    navigate('/')
                }}
            ></Form>
        </CenteredBlock>
        </>
    )
}
