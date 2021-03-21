import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {selectErrorMessage} from "../../reducers/toDoReducer";
import {useSelector} from "react-redux";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const SnackbarError = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const errorMessage: string = useSelector(selectErrorMessage);

    useEffect(() => {
        if (errorMessage !== '') {
            setOpen(true);
        }
    }, [errorMessage]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Error! {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}