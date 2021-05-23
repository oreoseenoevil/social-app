import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageRender } from '@Router'
import Home from '@Pages/home'
import SignIn from '@Pages/signin'
import { refreshToken } from '@Actions/auth'

export const Main = () => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Switch>
      <Route component={auth.token ? Home : SignIn} path='/' exact />
      <Route component={PageRender} path='/:page' exact />
      <Route component={PageRender} path='/:page/:id' exact />
    </Switch>
  )
}
