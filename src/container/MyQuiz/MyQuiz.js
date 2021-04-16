import React, { useEffect, useState,useMemo, Fragment } from 'react'
import classes from './MyQuiz.module.css'
import { connect } from 'react-redux'
import Loader from "../../components/UI/Loader/Loader";
import {NavLink} from "react-router-dom";
import {fetchQuizes} from "../../store/actions/actionsQuiz";
import LayoutHeader from "../../hoc/Layout/LayoutHeader/LayoutHeader";
import Button from "../../components/UI/Button/Button";
import {logout} from "../../store/actions/actionAuth";



const MyQuiz = (props) => {
  const [state, setState] = useState({
    countMyTest: []
  })

  useEffect(()=>{
    console.log('start')
    props.fetchQuizes()
    console.log(props.quizes)
    const newCountTest =  props.quizes.filter(quiz => quiz.user === localStorage.getItem('userId'))
    console.log(newCountTest)
    setState(prev => {
      return {
        ...prev,
        countMyTest: newCountTest
      }
    })
    return ()=>{
      console.log('was delete')
    }
  },[])

  const renderMyQuizes = () => {
    return props.quizes.map((quiz,index) => {
      if (localStorage.getItem('userId') === quiz.user){
        return (
            <li key={quiz.id}>
              <NavLink to={{ pathname: '/quiz/' + quiz.id, propsQuiz: quiz.name }}>
                <span><p>{`Тест №${index + 1} - `}{quiz.name}</p><p className={classes.date}>{new Date(quiz.date).toLocaleString('eu', {
                  hour12: false,
                })}</p></span>

              </NavLink>
            </li>
        )
      }
    })
  }

    return (
    <Fragment>
      <LayoutHeader
      title={'Мої тести'}/>
      <div className={classes.MyQuiz}>
        <div className={classes.container}>
          <div className={classes.CreatorBtn}>
            <h1>Створені тести</h1>
            <Button type='success'>
              <NavLink to="/quiz-creator">
                Створити тест
            </NavLink></Button>
          </div>
          <div className={classes.Tests}>
            {(props.quizes.filter(quiz => quiz.user === localStorage.getItem('userId'))).length ?
                (<Fragment>{props.loading && props.quizes.length !== 0 ? (
                    <Loader />
                ) : (
                    <ul>{
                      renderMyQuizes()}</ul>
                )}</Fragment>) :(<div className={classes.NoTest}>
                  <h1>У вас немає тестів</h1>
                  <p> Створи свій тест</p>
                </div>)
                 }
          </div>
        </div>
        {/*<div className={cls.join(' ')}>*/}
        {/*  <h1>Створення теста</h1>*/}
        {/*
        {/*</div>*/}
      </div>
    </Fragment>

    )
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuiz)
