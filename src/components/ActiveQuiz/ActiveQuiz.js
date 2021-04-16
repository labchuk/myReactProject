import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
    <div className = {classes.ActiveQuiz}>
        <p className = {classes.Question}>
            <span>
                <strong>{props.answerNumber}. </strong>
                {props.question}
            </span>
            <small>Запитання {props.answerNumber} з {props.quizLength}</small>
        </p>
        
        <AnswersList 
            answers = {props.answers}
            onAnswerClick = {props.onAnswerClick}
            state = {props.state}
            testName={props.testName}
            />
            

        
    </div>
)

export default ActiveQuiz