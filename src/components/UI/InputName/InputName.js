import React from 'react'
import classes from './InputName.module.css'

const InputName = (props) => {
  const InputType = props.type || 'text'
  const cls = [classes.InputName]
  const htmlFor = `${InputType}-${Math.random()}`

  return (
    <div style={props.style} className={cls.join(' ')}>
      <label htmlFor={htmlFor}>Назва теста</label>
      <input
        type={InputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChangeName}
      />
      {/* { isInvalid(props) 
            ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null} */}
    </div>
  )
}

export default InputName
