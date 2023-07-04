export interface UsersProviderProps {
    children: React.ReactNode;
}

export interface Users{
    token: string | null,
    logged: boolean,
    user: string | null,
    loading: boolean,
}
export type UsersContextType = {
    // users: ( state: string, setState: string, actions: any ) => void;
    isReady: () => boolean
    getUsers: () => void;
    setUsers: (token: string | null, logged: boolean, user: string | null, loading: boolean) => void;
    getAuthUser: () => void;
    signUp: (newUser: any, history: any) => void;
    logIn: (email: string, password: string) => void;
    logInPlayers: (user: any) => void;
    updateUser: (user: any) => void;
    logOut: () => void;
}