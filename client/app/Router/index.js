import React from 'react'
import { useParams, Route, Redirect } from 'react-router-dom'
import { PageNotFound } from '@Utils'
import { useSelector } from 'react-redux'

const generatePage = pageName => {
  const component = () => require(`../Pages/${pageName}`).default

  try {
    return React.createElement(component())
  } catch (error) {
    return <PageNotFound />
  }
}

export const PageRender = () => {
  const { page, id } = useParams()
  const { auth } = useSelector(state => state)

  let pageName = ''

  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`
    } else {
      pageName = `${page}`
    }
  }

  return generatePage(pageName)
}

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isLogin = localStorage.getItem('mern_session')

  return (
    <Route
      {...rest}
      render={props =>
        isLogin && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}
