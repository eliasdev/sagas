/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-mixed-operators */
import { createContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { UsersContextType, UsersProviderProps } from './Users.type';
import init, { initialState } from './src';
import { auth, db } from './../../firebase/firebase';
import { getDocs, collection } from 'firebase/firestore';


export const UsersContext = createContext<UsersContextType | undefined>(undefined)

const UserProvider = ({ children }: UsersProviderProps) =>{
    const [state, setState] = useState(initialState)
    const [ready, setReady] = useState(false);
    const stateRef = useRef(state);

    const app = init({ state, stateRef, setState });
    
    // useEffect(() => {loadSession()}, [])

    useEffect(() => {
        loadSession()
        stateRef.current = state;
    }   , [state]);
    
    // const getUsers = () => {
    //     return stateRef.current.users;
    // };

    // const updateState = (newState: any) => {
    //     try {
    //         setState((state: any) => ({...state, 
    //             users:{...state.users, logged: true, user: auth.currentUser},  
    //         }))
            
    //         return setReady(true)
    //     } catch (error) {
    //         // Failed to initialize persisted state
    //         return setReady(false);
    //     }
    // };

    
    const loadSession =async()=>{
        // Get persisted state
        // No token found? we're ready 
        // return setReady(true);
        const token = localStorage.getItem('token');
        if (token) {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const data: any = await getDocs(collection(db, "users"));
                    const results = data.docs.map((doc: any) => doc.data());
                    const _user = results.find((u: any) => u.id === token);
                    setState((state: any) => ({ ...state, users: { ...state.users, logged: true, user: _user } }));                    
                    localStorage.setItem('token', _user.id);
                    return setReady(true)
                } else {
                    // Failed to initialize persisted state
                    console.log('no user');
                    return setReady(false);
                }
            });
        }
    }

    return(
        <UsersContext.Provider value={{...app.users, isReady: () => ready}}>
            {children}
        </UsersContext.Provider>
    )
};

export default UserProvider;







// export const initialState = {
//     users: {
//         token: localStorage.getItem('token'),
//         logged: false,
//         user: null,
//         loading: true,
//     },
// }




// const reset =()=>{
    //     setState(() => initialState);
    // }
    
    // const getUsers =()=>{
    //     return state.users || {};
    // }

    // const setUsers=()=>{
    //     const newUsers ={
    //         token: null,
    //         logged: false,
    //         user: null,
    //         loading: false
    //     }
        
    //         // Save users data in state
    //         setState(state => ({ ...state, newUsers }));
    //         // Return users
    //         return newUsers;
    // }

    // async function getAuthUser(): Promise<void> {
    //     try {
    //         const { data } = await axios({
    //             headers: { 'x-auth-token': state.users.token },
    //             url: 'http://localhost:4000/api/auth',
    //             method: 'GET',
    //         });
    //         setState((state) => ({ ...state, users: { ...state.users, logged: true, user: data.user } }));
    //     } catch {
    //     }
    // }

    // const signUp =async (
    //     name: string, lastName: string, email: string, password: string, school: string, phone: string, stateCountry: string, city: string, district: string
    // ) => {
    //     console.log(name);
        
    //     try {
    //         const { data } = await axios({
    //             headers: { 'x-auth-token': state.users.token },
    //             url: 'http://localhost:4000/api/users',
    //             method: 'POST',
    //             data: {
    //                 name,
    //                 lastName,
    //                 email,
    //                 password,
    //                 school,
    //                 phone,
    //                 stateCountry,
    //                 city,
    //                 district                    
    //                 // avatar,
    //             },
    //         });
    //         localStorage.setItem('token', data.token);
    //         setState((state) => ({ ...state, users: { ...state.users, token: data.token } }));
    //         // getAuthUser();
    //     } catch {
    //     }
    // }

    // const logIn =async( email: string, password: string )=>{
        
    //     try {
    //         const { data } = await axios({
    //             headers: { 'x-auth-token': state.users.token },
    //             url: 'http://localhost:4000/api/auth',
    //             method: 'POST',
    //             data: { email, password },
    //           });
              
              
    //         localStorage.setItem('token', data.token);
    //         setState((state) => ({ ...state, users: { ...state.users, token: data.token } }));
    //     } catch (error) {
            
    //     }
    // }
    // const logOut =async()=>{
    //     localStorage.removeItem('token');
    //     reset();
    // }

    // const value: UsersContextType ={
    //     getUsers,
    //     setUsers,
    //     getAuthUser,
    //     signUp,
    //     logIn,
    //     logOut
    // };

