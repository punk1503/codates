import { useEffect, useState } from "react"
import { CenteredBlock } from "../../components/Blocks"
import Form from "../../components/Form"
import Axios from "../../utils/axiosConfig"
import reformToSelectData from "../../utils/reformToSelectData"
import { useNavigate } from "react-router-dom"

export default function RegistrationPage() {
    const [cities, setCities] = useState<CityReformed[]>([])
    const [technologies, setTechnologies] = useState<TechnologyReformed[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCitiesAndTechologies = () => {
            Axios.get<City[]>('cities/')
            .then((response) => {
                setCities(response.data.map((data) => {return reformToSelectData(data)}))
            })
            .catch((error) => {
            })

            Axios.get<Technology[]>('technologies/')
            .then((response) => {
                setTechnologies(response.data.map((data) => {return reformToSelectData(data)}))
            })
            .catch((error) => {

            })
        }

        fetchCitiesAndTechologies()
    }, [])
    return (
        <>
            <CenteredBlock>
                <h1>Регистрация</h1>
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
                                    value: true,
                                },
                                {
                                    label: 'Женский',
                                    value: false,
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
                } response_callback={() => {navigate('/')}}></Form>
            </CenteredBlock>
        </>
    )
}