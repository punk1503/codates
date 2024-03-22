import './AccountPage.css'
import { useEffect, useState, useRef } from 'react'
import { User } from '../../types/User.interface'
import { PhotoGallery } from '../../components/UserCard/UserCard'
import { CenteredBlock } from '../../components/Blocks'
import { City, CityReformed } from "../../types/City.interface"
import { Technology, TechnologyReformed } from "../../types/Technology.interface"
import { FormError } from '../../components/Form/Form'
import hljs, {HighlightResult} from 'highlight.js'
import Axios from '../../utils/axiosConfig'
import addMediaPrefix from '../../utils/addMediaPrefix'
import reformToSelectData from '../../utils/reformToSelectData'
import Button from '../../components/Button'
import CustomSelect from '../../components/CustomSelect'
import '../../components/Input/Input.css'
import '../../components/UserCard/UserCard.css'
import '../../assets/css/themes.css'

function createMarkup(result: HighlightResult): { __html: string } {
    return { __html: result.value.trim() }
}

function highlight(code: string, language: string | null): HighlightResult {
    if (language === null || language.trim() === '') {
      return hljs.highlightAuto(code)
    }
    return hljs.highlight(code, { language })
}  
  
export default function AccountPage() {
    const [user, setUser] = useState<User | null>(null)
    const [errors, setErrors] = useState<string[]>([])
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [cities, setCities] = useState<CityReformed[]>([])
    const [technologies, setTechnologies] = useState<TechnologyReformed[]>([])
    const [themes, setThemes] = useState<{key: string, label: string}[]>()
    
    // edit form fields
    const [age, setAge] = useState<number>()
    const [userTechnologies, setUserTechnologies] = useState<TechnologyReformed[]>([])
    const [userCity, setUserCity] = useState<CityReformed>()
    const [userSnippet, setUserSnippet] = useState<string>()
    const [userTheme, setUserTheme] = useState<{value: string, label: string}>()
    
    const textareaRef = useRef(null)
    
    let result = highlight(userSnippet ? userSnippet : '', null)
    let markup = createMarkup(result)
    function fetchUserData() {
        Axios.get('whoami/')
        .then((response) => {
            setUser(response.data)
            setAge(response.data.age) 
            setUserCity(reformToSelectData(response.data.city))
            setUserTechnologies(response.data.technologies.map((tech: Technology) => reformToSelectData(tech)))
            setUserSnippet(response.data.code_snippet)
        })
    }

    useEffect(() => {
        result = highlight(userSnippet ? userSnippet : '', null)
        markup = createMarkup(result)
    })

    useEffect(() => {
        fetchUserData()
    }, [])

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

        const fetchThemes = () => {
            Axios.get('themes/')
            .then((response) => {
                setThemes(response.data)
            })
        }

        fetchCitiesAndTechologies()
        fetchThemes()
    }, [])

    function formSubmit() {
        const data = {
            age: age,
            technologies: userTechnologies,
            city: userCity?.value,
            code_snippet: userSnippet,
            code_theme: userTheme,
        }
        Axios.patch('user-edit/', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            fetchUserData()
            setIsEditMode(false)
        })
        .catch((error) => {
            setErrors(error.data)
        })
    }

    return (
        <CenteredBlock style={{marginTop: '30px'}}>
            <div className='account_block'>
                <div className="account_block__top">
                    <div className="dummy">Ваш профиль</div>
                    {
                        !isEditMode ? <svg onClick={() => {setIsEditMode(true)}} className='account_block__top__edit' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        :<svg onClick={() => {setIsEditMode(false)}} className='account_block__top__close' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    }           
                </div>
                {!isEditMode ?
                    <>
                        {user?.images[0] ? 
                        <PhotoGallery photos={user?.images ? user?.images.map((image) => addMediaPrefix(image.image)) : []}></PhotoGallery>
                        :
                        <></>
                        }
                        <h4>{user?.first_name}, {user?.age}</h4>
                        <div><strong>username: </strong>{user?.username}</div>
                        <p><strong>Описание: </strong>{user?.description}</p>
                        <p><strong>Город: </strong>{user?.city.name}</p>
                        <div className="tech__bar">
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
                        <pre className={`code_block theme-${user?.code_theme ? user?.code_theme : 'default'}`}>
                            <code className='code_block hljs' dangerouslySetInnerHTML={markup}>
                            </code>
                        </pre>
                    </>
                    :
                    <div className='edit_form'>
                        {errors?.map((error) => {
                            return <FormError text={error}></FormError>
                        })}
                        <input type="file" multiple accept='.jpg,.png' />
                        <label>Возраст</label>
                        <input type="number" min={18} className="custom_input" value={age} onChange={(e) => {setAge(parseInt(e.target.value))}}/>
                        <label>Город</label>
                        <CustomSelect isMulti={false} isSearchable={true} options={cities} onChange={setUserCity} value={userCity} defaultValue={userCity}></CustomSelect>
                        <CustomSelect isMulti={true} isSearchable={true} options={technologies} onChange={setUserTechnologies} value={userTechnologies} defaultValue={[...userTechnologies].map((elem) => elem)}></CustomSelect>
                        <CustomSelect isMulti={false} isSearchable={true} options={themes} onChange={setUserTheme} value={userTheme} defaultValue={userTheme}></CustomSelect>
                        <textarea ref={textareaRef} id='textbox' rows={10} value={userSnippet} onChange={(e) => {setUserSnippet(e.target.value as string)}}></textarea>

                        <Button onClick={() => {formSubmit()}}>Сохранить</Button>
                    </div>
                }
            </div>
        </CenteredBlock>
    )
}
