import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {setAppError} from '../../app/app-reducer';
import {selectAppError} from "../../app/app-selectors";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const CustomizedSnackbars = () => {

    const error = useSelector(selectAppError)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        // Prevents closing the error message on mouse click away.
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppError({error: null}))
    };

    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}