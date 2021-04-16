import React, { useEffect,useState } from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import classes from './Quiz.module.css'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
  // fetchMyQuizById,
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from '../../store/actions/actionsQuiz'

const Quiz = (props) => {
  useEffect(()=>{
    props.fetchQuizById(props.match.params.id)
    console.log(props.match.params)
    console.log(props.quiz)
    return () =>{
      props.retryQuiz()
      console.log(props.match.params)
      console.log(props.quiz)
    }
  },[])

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>{props.info? props.info.name : null}</h1>
          {props.loading || !props.quiz ? (
            <Loader />
          ) : props.isFinished ? (
            <FinishedQuiz
              result={props.result}
              quiz={props.quiz}
              onRetry={props.retryQuiz}
              testName={props.info.name}
            />
          ) : (
            <ActiveQuiz
              answers={props.quiz[props.activeQuestion].answers}
              question={props.quiz[props.activeQuestion].question}
              onAnswerClick={props.quizAnswerClick}
              quizLength={props.quiz.length}
              answerNumber={props.activeQuestion + 1}
              state={props.answerState}
              testName={props.info.name}
            />
          )}
        </div>
      </div>
    )
}

function mapStateToProps(state) {
  return {
    result: state.quiz.result,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    info: state.quiz.info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    // fetchMyQuizById: (id) => dispatch(fetchMyQuizById(id)),
    quizAnswerClick: (answerId,name) => dispatch(quizAnswerClick(answerId,name)),
    retryQuiz: () => dispatch(retryQuiz()),
  }
}

// let WithUrlDataComponent = withRouter(Quiz)
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
