import { useNavigate } from "react-router-dom"
import Form from "../../components/Form/Form"
import { CenteredBlock } from "../../components/Blocks"

export default function LoginPage() {
    const navigate = useNavigate()

    return (
        <>
        <CenteredBlock>
            <h1>Вход</h1>
            <Form
                action_url="/drf-auth/login/"
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
                response_callback={() => {navigate('/')}}
            ></Form>
        </CenteredBlock>
        </>
    )
}