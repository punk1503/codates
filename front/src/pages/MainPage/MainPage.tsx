import "../../components/Button/Button.css"
import "./MainPage.css"
import { CenteredBlock } from "../../components/Blocks"
import { useAuth } from "../../context/AuthContext"
export default function MainPage() {
    const { isAuthenticated } = useAuth()
    return (
        <>
        <CenteredBlock style={{marginTop: "5rem"}}>
            <div className="main_page__grid">
                <div className="main_page__grid__row">
                    <div className="main_page__grid__col main_page__grid__col--left">
                        <div className="main_page__grid__wrapper--header">
                            <h1><span style={{color: "var(--primary)"}}>Co</span><span style={{color: "var(--accent)"}}>Dates</span></h1>
                            <p>Ваш помощник в корпоративном нетворкинге.</p>
                        </div>
                        {isAuthenticated ? 
                            <div className="main_page__grid__wrapper--buttons">
                                <a href="/signin" className="custom_button">Войти</a>
                                <span>Еще нет аккаунта?<br /><a href="/signup">Регистрация</a></span>
                            </div>
                        : <></>}
                    </div>
                    <div className="main_page__grid__col">
                        <img src="https://placehold.co/400x400" alt="" />
                    </div>
                </div>
            </div>
        </CenteredBlock>
        </>
    )
}