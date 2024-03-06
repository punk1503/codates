import Form from "../../components/Form/Form"
import "./LoginPage.css"

export default function LoginPage() {
    return (
        <>
            <Form
                action_url="/drf-auth/login/"
                fields_data={
                    [
                        {
                            label: 'Электронная почта',
                            placeholder: 'example@email.ru',
                            requestFieldName: 'email',
                            fieldType: 'email',
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
            ></Form>
        </>
    )
}