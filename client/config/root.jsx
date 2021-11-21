import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Home from '../components/home'
import DummyView from '../components/dummy-view'
import NotFound from '../components/404'

import Startup from './startup'
import ChatPage from '../components/chat'
import RegistrationForm from '../components/registration'
import LoginForm from '../components/login'
import Logout from "../components/logout";

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  const func = (props) => {
    if (!!user && !!user.login && !!token) return <Redirect to={{ pathname: '/' }} />
    return <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.auth.token)
  const func = (props) => {
    /* Думаю лучше обойтись одним токеном - а временное отсутствие данных
     пользователя - обработать в компоненте Chat. Инче форма логина мигает -
     некрасиво.
     Либо надо вводить искусственную задержку и плейсхолдер на форме логина. */
    // if (!!user && !!user.login && !!token) {
    if (token) {
      return <Component {...props} />
    }

    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  }
  return <Route {...rest} render={func} />
}

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <OnlyAnonymousRoute exact path="/login" component={LoginForm} />
            <OnlyAnonymousRoute exact path="/registration" component={RegistrationForm} />
            <Route exact path="/404" component={NotFound} />
            <Route exact path="/logout" component={Logout} />
            <PrivateRoute exact path="/:mode?/:channel?" component={ChatPage} />

            <Route exact path="/dashboard" component={Home} />
            <PrivateRoute exact path="/hidden-route" component={DummyView} />
            <OnlyAnonymousRoute exact path="/anonymous-route" component={DummyView} />

            <Route component={NotFound} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
