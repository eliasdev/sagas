/* eslint-disable import/no-anonymous-default-export */
// import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useUsers} from './context/Users'
import { useEffect } from 'react';

export default function({ component: Component, path, isPrivate, ...rest}: any){
const {getUsers} = useUsers();
const { logged, user }: any = getUsers();
const findToken = localStorage.getItem('token');

return (
  <Route
      path={path}
      render={(props) => (isPrivate && !logged && !findToken ? (
        <Redirect
          to={{ pathname: '/login' }}
        />
      ) : (
        <Component {...props} />
      ))}
      {...rest}
    />
)

}