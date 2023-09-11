import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppInitAC, SetAppInitType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import { auth } from '../../api/todolists-api'
import { FormType } from './login'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks


export const loginTC = (data:FormType) =>async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
     const res=  await auth.login(data)
        if(res.data.resultCode===0){
dispatch(setIsLoggedInAC(true))
dispatch(setAppStatusAC('succeeded'))
        }else{
            handleServerAppError(res.data, dispatch)
     }
    
    }catch(e){
        handleServerNetworkError((e as {message:string}),dispatch)
    }
    
}
export const meTC = () =>async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
     const res=  await auth.me()
        if(res.data.resultCode===0){
dispatch(setIsLoggedInAC(true))
dispatch(setAppStatusAC('succeeded'))
        }else{
            handleServerAppError(res.data, dispatch)
     }
    
    }catch(e){
        handleServerNetworkError((e as {message:string}),dispatch)
    }
    finally{
        dispatch(setAppInitAC(true))
    }
    
}


// export const logoutTC = () =>async (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'))
//     try{
//         const res= await auth. logOut()
//         if (res.data.resultCode === 0)
//         dispatch(setIsLoggedInAC(false))
//         dispatch(setAppStatusAC('succeeded'))
//     } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         }
//         catch(e) {
//             handleServerNetworkError((e as{message:string}), dispatch)
//         };
//     }
export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'));
    try {
      const res = await auth.logOut();
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e) {
      handleServerNetworkError((e as{message:string}), dispatch);
    }
  };
 


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType | SetAppInitType