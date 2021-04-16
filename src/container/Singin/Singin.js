import React, { Component } from 'react'
import is from 'is_js'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Singin.module.css'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/actionAuth'
import LogoText from "../../components/UI/LogoText/LogoText";

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введіть коректний email',
        valid: false,
        placeholder: "Введіть email",
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введітье правельний пароль',
        valid: false,
        placeholder: "Ваш пароль",
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  }

  loginHandler = async () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registrHandler = async () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  submitHandler = (event) => {
    event.preventDefault()
  }
  validateControl(value, validation) {
    if (!validation) {
      return true
    }
    let isValid = true
    if (validation.required) {
      const emptyCount = value.split(' ').length - 1
      isValid = value.trim() !== '' && !emptyCount && isValid
    }
    if (validation.email) {
      isValid = is.email(value) && isValid
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }
  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }
    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    formControls[controlName] = control
    let isFormValid = true
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({
      formControls,
      isFormValid,
    })
  }
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
          <Input
              key={controlName + index}
              type={control.type}
              placeholder = {control.placeholder}
              value={control.value}
              valid={control.valid}
              touched={control.touched}
              label={control.label}
              errorMessage={control.errorMessage}
              shouldValidate={!!control.validation}
              onChange={(event) => this.onChangeHandler(event, controlName)}
          />
      )
    })
  }

  ;

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.Wrapper}>
          <LogoText
          display={'flex'}
          justifyContent={'center'}
          marginBottom={'20px'}/>
          <form className={classes.WrapperForm} onSubmit={this.submitHandler}>
            <h1>Вхід</h1>
            {this.renderInputs()}
            <Button
              style={{ width: '100%', padding: '16px',}}
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Увійти
            </Button>
            <span className={classes.SpanInfo}>Ще не зареєстровані? Обов'язково <a href="/singup">зареєструйтесь</a></span>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  }
}

export default connect(null, mapDispatchToProps)(Auth)
