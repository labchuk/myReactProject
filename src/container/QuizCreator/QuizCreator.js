import React, {Fragment, useState} from "react";
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Select from '../../components/UI/Select/Select'
import Input from '../../components/UI/Input/Input'
import InputName from '../../components/UI/InputName/InputName'
import LayoutHeader from "../../hoc/Layout/LayoutHeader/LayoutHeader";
import {createQuizInfo, createQuizQuestion, finishCreateQuiz} from "../../store/actions/actionCreate";
import {fetchQuizes} from "../../store/actions/actionsQuiz";
import {connect} from "react-redux";
import { useAlert } from 'react-alert'


function createOptionControl(index) {
    return createControl(
        {
            label: `Відповідь ${index}`,
            errorMessage: 'Поле не може бути пустим',
            id: index,
        },
        {
            required: true,
        }
    )
}

function createFormControl() {
    return {
        question: createControl(
            {
                label: 'Введіть питання',
                errorMessage: 'Поле не може бути пустим',
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}


const QuizCreator = props => {
    const alert = useAlert();
    const [state, setState] = useState({
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControl(),
        nameTes: '',
        createTest: false,
        next: false,
        typeTest: 1,
        showWarn: false
    })

    const submitHandler = (event) => {
        event.preventDefault()
    }

    const addQuestionHandler = (event) => {
        event.preventDefault()
        const {
            question,
            option1,
            option2,
            option3,
            option4,
        } = state.formControls

        const questionItem = {
            question: question.value,
            id: props.quiz.length + 1,
            rightAnswerId: state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ],
        }

        props.createQuizQuestion(questionItem)

        setState(prev => {
            return {
                ...prev,
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControl(),
            }

        })
    }

    const createQuizHandler = (event) => {
        event.preventDefault()
        console.log('fef')
        setState(prev => {
            return {
                ...prev,
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControl(),
                next: false}
        })
        const info = {
            name: state.nameTes,
            testType: state.typeTest,
            date: Date.now()
        }
        props.createQuizInfo(info)
        props.finishCreateQuiz()
        props.fetchQuizes()
        alert.show('Тест створено')
    }

    const changeHandler = (value, controlName) => {
        console.log(value)
        const formControls = { ...state.formControls }
        const control = { ...formControls[controlName] }

        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        setState(prev => {
            return {
                ...prev,
                formControls,
                isFormValid: validateForm(formControls),
            }
        })
    }
    const createTestVisible = () => {
        setState(prev => {
                return{
                    ...prev,
                    next: false
                }

            }
        )
        setState(prev => {
                return {
                    ...prev,
                    createTest: !state.createTest,
                }
            }
        )
    }
    const changeHandlerName = (value) => {
        // console.log(value)
        let oldNameTes = state.nameTest
        oldNameTes = value
        setState(prev => {
            return{
                ...prev,
                nameTes: oldNameTes,
            }
        })
    }
    const changeHandlerType = event => {
        setState(prev => {
            return {
                ...prev,
                typeTest: +event.target.value
            }
        })
    }
    const renderControl = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]
            return (
                <Fragment key={controlName + index}>
                    <Input
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={(event) => changeHandler(event.target.value, controlName)
                        }
                    />
                    {index === 0 ? <hr /> : null}
                </Fragment>
            )
        })
    }
    const nameTest = () => {
        return (
            <InputName
                onChangeName={(event) => changeHandlerName(event.target.value)}
            />
        )
    }

    const selectChangeHandler = (event) => {
        setState(prev => {
            return {
                ...prev,
                rightAnswerId: +event.target.value,
            }
        })
    }
    const nextModal = () => {
        setState(prev => {
                return {
                    ...prev,
                    showWarn: true
                }
            }
        )
        if(props.quiz.length) {
            setState(prev => {
                    return {
                        ...prev,
                        next: !state.next
                    }
                }
            )
        }
    }


    const select = (
        <Select
            label="Виберіть правельну відповідь"
            value={state.rightAnswerId}
            onChange={selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
            ]}
        />
    )

    return (
        <Fragment>
            <LayoutHeader
            title={'Новий тест'}/>
            <div className={classes.QuizCreator}>
                <div className={classes.container}>
                    <form onSubmit={submitHandler}>
                            {state.next === false ?
                                <div className={classes.firstModal}>
                                  {renderControl()}
                                  {select}
                                    <Fragment >{props.quiz.length === 0 && state.showWarn === true ?
                                        <p style={{color: '#f00', fontSize: '14px'}}>
                                        Додайте запитання
                                    </p> : null}</Fragment>
                                  <Button
                                      style={{ marginRight: '10px' }}
                                      type="success"
                                      onClick={addQuestionHandler}
                                      disabled={!state.isFormValid}
                                  >
                                    Додати питання
                                  </Button>
                                  <Button
                                      type="primary"
                                      onClick={nextModal}
                                      >
                                    Далі
                                  </Button>
                                </div> : <div className={classes.secondModal}>
                                  {nameTest()}
                                  <Select
                                      label="Виберіть напрям тесту"
                                      onChange={changeHandlerType}
                                      options={[
                                        { text: 'Програмування', value: 1 },
                                        { text: 'Веб-дизайн', value: 2 },
                                        { text: 'Маркетинг', value: 3 },
                                        { text: 'Seo', value: 4 },
                                        { text: 'Менеджмент', value: 5 },
                                        { text: 'Копірайтинг', value: 6 },
                                        { text: 'SMM', value: 7 },
                                        { text: 'Фото і відео обробка', value: 8 },
                                        { text: 'Іноземні мови', value: 9 },
                                      ]}
                                  />
                                  <Button
                                      style={{ marginRight: '10px' }}
                                      type="primary"
                                      onClick={nextModal}>
                                    Назад
                                  </Button>
                                  <Button
                                      type="success"
                                      onClick={createQuizHandler}
                                      disabled={state.nameTes.length === 0}
                                  >
                                    Додати тест
                                  </Button>
                                </div>
                            }
                          </form>
                </div>
            </div>
        </Fragment>

    )
}
function mapStateToProps(state) {
    return {
        quiz: state.create.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizInfo: (info) => dispatch(createQuizInfo(info)),
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
        fetchQuizes: () => dispatch(fetchQuizes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)