import { useEffect, useState } from "react"
import { CenteredBlock } from "../../components/Blocks"
import Form from "../../components/Form"
import Axios from "../../utils/axiosConfig"

export default function RegistrationPage() {
    const [cities, setCities] = useState([])
    const [technologies, setTechnologies] = useState([])

    useEffect(() => {
        const fetchCitiesAndTechologies = () => {
            Axios.get('cities/')
            .then((response) => {
                setCities(Object.assign(response.data, {label: response.data.name, key: response.data.id}))
            })
            .catch((error) => {
            })

            Axios.get('technologies/')
            .then((response) => {
                setTechnologies(response.data)
            })
            .catch((error) => {

            })
        }

        fetchCitiesAndTechologies()
    }, [])
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
                            label: 'Возраст',
                            placeholder: '18+',
                            requestFieldName: 'age',
                            fieldType: 'age',
                            isRequired: true
                        },
                        {
                            label: 'Пол',
                            placeholder: 'Только мужчина/женщина',
                            requestFieldName: 'gender',
                            fieldType: 'choices',
                            isRequired: true,
                            choices: [
                                {
                                    label: 'Мужской',
                                    key: true,
                                },
                                {
                                    label: 'Женский',
                                    key: false,
                                },
                            ],
                            isSearchable: false,
                        },
                        {
                            label: 'Технологии',
                            placeholder: 'Ваши любимые языки программирования',
                            requestFieldName: 'technologies',
                            fieldType: 'choices_multi',
                            isRequired: false,
                            choices: technologies,
                            isSearchable: true,
                        },
                        {
                            label: 'Город',
                            placeholder: 'Ваши город',
                            requestFieldName: 'city',
                            fieldType: 'choices',
                            isRequired: false,
                            choices: cities,
                            isSearchable: true
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