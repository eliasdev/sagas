/* eslint-disable import/no-anonymous-default-export */
import user from './user';

export const initialState = {
    users: {
        token: localStorage.getItem('token'),
        logged: false,
        user: null,
        loading: true,
    },
}

export default ({ state: reactState, stateRef, setState: setReactState }: any) =>{
    let state = reactState;
  // SetState function that syncs with react state
  const setState = (fn: any) => {
    setReactState((reactState: any) => {
      state = fn(reactState);
      stateRef.current = state;
      return state;
    });
  };
  const actions = {
    get users() { return user({ state, setState, actions }); },
    reset: () => {
        setState(() => initialState);
    },
  }
  return actions;
}