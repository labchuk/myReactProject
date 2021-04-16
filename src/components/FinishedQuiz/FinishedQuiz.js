import React, {useMemo, useEffect} from 'react'
import Button from '../UI/Button/Button'
import classes from './FinishedQuiz.module.css'
import { Link } from 'react-router-dom'

// function resultInPersent(trueQuiz, allQuiz){
//     return ((100 * trueQuiz) / allQuiz)
// }

const FinishedQuiz = (props) => {

    useEffect(()=>{

    },[])
    const computed = () => {
        return  Math.round((100 * successCount) / props.quiz.length)
    }
    console.log(props.result)
  const successCount = Object.keys(props.result).reduce((total, key) => {
    if (props.result[key] === 'success') {
      total++
    }
    return total
  }, 0)
    console.log(typeof successCount)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fas',
            props.result[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.result[quizItem.id]],
          ]
          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>
        <div className={classes.progress}>
            <div className={classes.progress_bar} style={{width: `${computed()}%`}}>
                <p>{computed()}%</p>
            </div>
        </div>
      <p>
        Правильно {successCount} з {props.quiz.length}
      </p>
      <Button
        style={{ marginRight: '20px' }}
        onClick={props.onRetry}
        type="primary"
      >
        Повторити
      </Button>
      <Link to="/">
        <Button type="success">Список тестів</Button>
      </Link>
    </div>
  )
}

export default FinishedQuiz
