import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import LogoText from "../../components/UI/LogoText/LogoText";
import classes from './Layout.module.css'

const Layout = (props) => {
    const [state, setState] = useState({
        menu: false,
    })
  const toggleMenuHandler = () => {
    setState({
      menu: !state.menu,
    })
  }

  const menuCloseHandler = () => {
    setState({
      menu: false,
    })
  }
  const renderLinks = () => {
      const cls = [classes.link]
      cls.push(classes.close)
    if (props.isAuthenticated) {
      return (
        <Fragment>
          <NavLink className={classes.link} to="/quiz-creator">
            Мої тести
          </NavLink>
          <NavLink className={cls.join(' ')} to="/logout">
              <img src="/image/exit.png" alt=""/>
          </NavLink>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <NavLink className={classes.link} to="/singin">
            Вхід
          </NavLink>
          <NavLink className={classes.link} to="/singup">
            Реєстрація
          </NavLink>
        </Fragment>
      )
    }
  }
    return (
      <div className={classes.Layout}>
          <aside className={classes.sidebar__nav}>
              <div className={classes.sidebar_component}>
                  <div className={classes.sidebar__logo}>
                      <LogoText
                          marginBottom={'30px'}
                      />
                  </div>
                  <ul>
                      <li>
                          <NavLink to="/"><i>
                              <img src="/image/link-test.svg" alt=""/>
                          </i>
                              <span>Тести</span>
                          </NavLink>

                      </li>
                      <li>
                          <NavLink to="/my-quiz">
                              <i>
                                  <img src="/image/link-mytest.svg" alt=""/>
                              </i>
                              <span>Мої тести</span>
                          </NavLink>

                      </li>
                      <li>
                          <NavLink to="/quiz-creator">
                              <i>
                                  <img src="/image/link-create.svg" alt=""/>
                              </i>
                              <span>Створити тест</span>
                          </NavLink>

                      </li>
                      <li>
                          <NavLink to="/quiz-results">
                              <i>
                                  <img src="/image/link-results.svg" alt=""/>
                              </i>
                              <span>Мої результати</span>
                          </NavLink>
                      </li>
                      <li>
                          <NavLink  to="/logout">
                              <i>
                                  <img src="/image/link-logout.svg" alt=""/>
                              </i>
                              <span>Вийти</span>
                          </NavLink>
                      </li>
                  </ul>
              </div>
          </aside>
              <div id={classes.dashboard__layout} className={classes.content}>
                  <div className={classes.content__page}>
                      <div className={classes.Layout_header}>
                      </div>
                      {props.children}
                      {/*<FooterDashboard/>*/}
                  </div>
              </div>
          </div>
      //   <header>
      //     <div className={classes.header}>
      //       <div className={classes.header_logo}>
      //           <img src="/image/Logo.jpg" alt=""/>
      //       </div>
      //       <nav className={classes.header_nav}>
      //         <NavLink className={classes.link} to="/">
      //           Тести
      //         </NavLink>
      //         {renderLinks()}
      //       </nav>
      //     </div>
      //   </header>
      //
      //   <div className={classes.bars}>
      //     <Drawer
      //       isOpen={state.menu}
      //       onClose={menuCloseHandler}
      //       isAuthenticated={props.isAuthenticated}
      //     />
      //     <MenuToggle
      //       onToggle={toggleMenuHandler}
      //       isOpen={state.menu}
      //     />
      //   </div>
      //   <main>{props.children}</main>
      //     <footer>
      //         <div className={classes.footer}>
      //             <div className={classes.paf}>
      //                 <p>© 2020-2021 «Освітній проект «MyEasyQuiz»</p>
      //             </div>
      //         </div>
      //     </footer>
      // </div>
    )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

export default connect(mapStateToProps)(Layout)
