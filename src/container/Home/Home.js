import React, {Fragment,useState} from 'react'
import classes from './Home.module.css'
import LogoText from "../../components/UI/LogoText/LogoText";
import {NavLink} from "react-router-dom";

const Home = () => {
    const [state,setState] = useState({
        isShow: false
    })
    const showBars = () => {
        setState(prev => {
            return {
                ...prev,
                isShow: !state.isShow
            }
        })
    }
    const cls = [classes.bar, 'fas']
    const clss = [classes.nav]
    if (!state.isShow){
        cls.push('fa-bars')
    }else {
        cls.push('fa-times')
        clss.push(classes.open)
    }


    return (
        <div className={classes.home}>
            <header className={classes.header}>
                <div className={classes.header_container}>
                    <div className={classes.header_wrapper}>
                        <LogoText
                        color={'#fff'}/>
                        <div className={clss.join(' ')}>
                            <ul>
                                <li>
                                    <NavLink className={classes.link} to="/singin">
                                        Вхід
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={classes.link} to="/singup">
                                        Реєстрація
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className={classes.bars} onClick={showBars}>
                            <i className={cls.join(' ')}></i>
                        </div>
                    </div>
                </div>
            </header>
            <div className={classes.fullscreen}>
                <div className={classes.backcolor}>
                    <div className={classes.container}>

                        <div className={classes.full_content}>
                            <h1>Тестова система для студентів та вчителів</h1>
                            <p>Перевір свої знання за допомогою наших тестів або створюй свої</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={classes.about}>
                        <h1>Про проект</h1>
                        <p>Головні можливості тестової системи</p>
                        <div className={classes.about__columns}>
                            <div className={classes.column}>
                                <div className={classes.icons}>
                                    <img src="/image/icon2.png" alt=""/>
                                </div>
                                <h1>Проходження тестів</h1>
                                <p>Кожний користувач може проходити велику кількість різноманітних тестів по різним
                                    та найпопулярнішим в сучасному світі спеціалізаціям.</p>
                            </div>
                            <div className={classes.column}>
                                <div className={classes.icons}>
                                    <img src="/image/icon2.png" alt=""/>
                                </div>
                                <h1>Створення тестів</h1>
                                <p>Якщо вас не задовільняють наявні тести користувачів або просто ще немає тестів по певній темі.
                                Ви можете створити свій власний тест.</p>
                            </div>
                            <div className={classes.column}>
                                <div className={classes.icons}>
                                    <img src="/image/icon3.png" alt=""/>
                                </div>
                                <h1>Менторство</h1>
                                <p>Якщо ви вчитель, ви можете надавати ваші створені тести вашим студентам та переглядати їхні результати які будуть доступні тільки вам.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={classes.main__footer}>
                <div className={classes.footer_info}>
                    <p>© 2020-2021 «Освітній проект «MyEasyQuiz»</p>
                </div>
            </footer>
        </div>
    )
}

export default Home