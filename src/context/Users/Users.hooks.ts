import { useContext } from "react";
import {UsersContext} from "./Users"
import {UsersContextType} from './Users.type'

export const useUsers =(): UsersContextType =>{
    const users = useContext(UsersContext)
    if (!users) throw new Error("useGnome must be used within a GnomeProvider");
  return users;
}