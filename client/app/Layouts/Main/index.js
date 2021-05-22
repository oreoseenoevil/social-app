import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PageRender } from '@Router'
import SignIn from '@Pages/signin'

export const Main = () => {
  return (
    <Switch>
      <Route component={SignIn} path='/' exact />
      <Route component={PageRender} path='/:page' exact />
      <Route component={PageRender} path='/:page/:id' exact />
    </Switch>
  )
}
