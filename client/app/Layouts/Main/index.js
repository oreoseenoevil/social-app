import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PageRender, PublicRoute } from '@Router'
import Home from '@Pages/home'
import SignIn from '@Pages/signin'
import SignUp from '@Pages/signup'
import { refreshToken, getPosts, getSuggestions } from '@Actions'

export const Main = () => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
    }
  }, [dispatch, auth.token])

  return (
    <Switch>
      <Route
        component={auth.token ? Home : SignIn}
        path={'/'}
        exact 
      />
      <PublicRoute 
        restricted={true} 
        component={SignIn}
        path='/signin'
        exact
      />
      <PublicRoute 
        restricted={true} 
        component={SignIn}
        path='/login'
        exact
      />
      <PublicRoute 
        restricted={true} 
        component={SignUp}
        path='/register'
        exact
      />
      <PublicRoute 
        restricted={true} 
        component={SignUp}
        path='/signup'
        exact
      />
      <Route component={PageRender} path='/:page' exact />
      <Route component={PageRender} path='/:page/:id' exact />
    </Switch>
  )
}
