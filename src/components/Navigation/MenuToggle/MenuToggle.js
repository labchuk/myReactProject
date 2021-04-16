import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = (props) => {
  const cls = [classes.MenuToggle, 'fas']

  if (props.isOpen) {
    cls.push('fa-times')
  } else {
    cls.push('fa-bars')
  }

  return <i className={cls.join(' ')} onClick={props.onToggle} />
}

export default MenuToggle
