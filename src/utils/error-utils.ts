import {ResponseT} from '../api/todolist-api'
import {Dispatch} from "redux";
import { setAppError, setAppStatus } from '../app/app-reducer';

export const handleServerAppError = <D>(data: ResponseT<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Sorry. Undefined error have occurred!'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
    dispatch(setAppError(error.message ? error.message : 'Sorry. Undefined error have occurred!'))
    dispatch(setAppStatus({status: 'failed'}))
}