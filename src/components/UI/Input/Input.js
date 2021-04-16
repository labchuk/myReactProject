import React from 'react'
import classes from './Input.module.css'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const InputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${InputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div style={props.style} className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
          className={classes.InputControl}
        type={InputType}
        id={htmlFor}
          placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Введіть коректне значення'}</span>
      ) : null}
    </div>
  )
}

export default Input
