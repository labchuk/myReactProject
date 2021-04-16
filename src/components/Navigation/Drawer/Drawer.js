import React, { Component } from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './Drawer.module.css'
import { NavLink } from 'react-router-dom'

class Drawer extends Component {
  cliclHandler = () => {
    this.props.onClose()
  }
  renderLink(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            activeClassName={classes.active}
            exact={link.exact}
            to={link.to}
            onClick={this.cliclHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]
    if (!this.props.isOpen) {
      cls.push(classes.close)
    }
    const links = [{ to: '/', label: 'Tests', exact: true }]

    if (this.props.isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Create test', exact: false })
      links.push({ to: '/logout', label: 'Log out', exact: false })
    } else {
      links.push({ to: '/singin', label: 'Sing in', exact: false })
      links.push({ to: '/singup', label: 'Sing up', exact: false })
    }
    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLink(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
}

export default Drawer
