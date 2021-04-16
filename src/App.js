import React, { Component, Fragment } from 'react'
import Layout from './hoc/Layout/Layout'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Quiz from './container/Quiz/Quiz'
import Singin from './container/Singin/Singin'
import Singup from './container/Singup/Singup'
import MyQuiz from './container/MyQuiz/MyQuiz.js'
import QuizList from './container/QuizList/QuizList'
import QuizCreator from "./container/QuizCreator/QuizCreator";
import QuizResults from "./container/QuizResults/QuizResults";
import Home from './container/Home/Home'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/actionAuth'
import Logout from './components/Logout/Logout'


class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/singin" component={Singin} />
        <Route path="/singup" component={Singup} />
        <Route path="/" exact component={Home}/>
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/quiz-list" component={QuizList} />
          <Route path="/my-quiz" component={MyQuiz} />
          <Route path="/quiz-results" component={QuizResults} />
            <Redirect to="/quiz-list" />
        </Switch>
      )
    }
    return (
        <Fragment>
            {!this.props.isAuthenticated ? (
                <Fragment>{routes}</Fragment>
                )
                : (<Layout>
                    {routes}
                </Layout>) }
        </Fragment>

    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
