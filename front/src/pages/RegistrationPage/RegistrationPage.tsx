import { CenteredBlock } from "../../components/Blocks"
import Form from "../../components/Form"
export default function RegistrationPage() {
    return (
        <>
            <CenteredBlock>
                <Form action_url="signup/" fields_data={
                    [
                        {
                            label: 'Имя пользователя',
                            placeholder: 'username',
                            requestFieldName: 'username',
                            fieldType: 'text',
                            isRequired: true
                        },
                        {
                            label: 'Возраст',
                            placeholder: '18+',
                            requestFieldName: 'age',
                            fieldType: 'age',
                            isRequired: true
                        },
                        {
                            label: 'Электронная почта',
                            placeholder: 'example@email.ru',
                            requestFieldName: 'email',
                            fieldType: 'email',
                            isRequired: true
                        },
                        {
                            label: 'Номер телефона',
                            placeholder: '+79991234567',
                            requestFieldName: 'telephone_number',
                            fieldType: 'telephone',
                            isRequired: true
                        },
                        {
                            label: 'Пароль',
                            placeholder: '********',
                            requestFieldName: 'password',
                            fieldType: 'password',
                            isRequired: true
                        },
                        
                    ]
                } response_callback={() => {}} error_callback={() => {}}></Form>
            </CenteredBlock>
        </>
    )
}