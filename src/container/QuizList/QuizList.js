import classes from './QuizList.module.css'
import React ,{useEffect, Fragment} from 'react'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes} from '../../store/actions/actionsQuiz'
import LayoutHeader from "../../hoc/Layout/LayoutHeader/LayoutHeader";

const QuizList = (props) => {
  const renderQuizes = (number) => {
    return props.quizes.map((quiz) => {
      if (number === quiz.type) {
        return (
            <li key={quiz.id}>
              <NavLink to={{ pathname: '/quiz/' + quiz.id}}>
                {`Тест - `}{quiz.name}
              </NavLink>
            </li>
        )
      }
    })
  }
  // componentDidMount() {
  //   this.props.fetchQuizes()
  // }
  useEffect(()=>{
    props.fetchQuizes()
    console.log(props.quizes)
  },[])

    return (
        <Fragment>
          <LayoutHeader
          title={'Тести'}/>
          <div className={classes.QuizList} id={classes.QuizList}>
            <div className={classes.WrapperQuizList}>
              <h1>Список тестів</h1>
              <div className={classes.Tests}>
                <div className={classes.Link}>
                  <h1>Програмування</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />) : (
                      <ul>{renderQuizes(1)}</ul>
                  )}
                </div>
                <div className={classes.Link}>
                  <h1>Веб-дизайн</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />
                  ) : (
                      <ul>{renderQuizes(2)}</ul>
                  )}
                </div>
                <div className={classes.Link}>

                  <h1>Маркетинг</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />
                  ) : (
                      <ul>{renderQuizes(3)}</ul>
                  )}
                </div>
                <div className={classes.Link}>
                  <h1>Seo</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />
                  ) : (
                      <ul>{renderQuizes(4)}</ul>
                  )}
                </div>
                <div className={classes.Link}>
                  <h1>Менеджмент</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />
                  ) : (
                      <ul>{renderQuizes(5)}</ul>
                  )}
                </div>
                <div className={classes.Link}>
                  <h1>Копірайтинг</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />
                  ) : (
                      <ul>{renderQuizes(6)}</ul>
                  )}
                </div>
                <div className={classes.Link}>
                  <h1>SMM</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />
                  ) : (
                      <ul>{renderQuizes(7)}</ul>
                  )}
                </div>
                <div className={classes.Link}>
                  <h1>Фото и відео обробка</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />
                  ) : (
                      <ul>{renderQuizes(8)}</ul>
                  )}
                </div>
                <div className={classes.Link}>
                  <h1>Іноземні мови</h1>
                  {props.loading && props.quizes.length !== 0 ? (
                      <Loader />
                  ) : (
                      <ul>{renderQuizes(9)}</ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>

    )
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
    quizitem: state.quiz.quizName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
