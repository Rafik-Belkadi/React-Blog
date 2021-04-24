import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import cookie from 'react-cookies'
import { UserContext } from '../../contexts'

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const { user, setUser } = React.useContext(UserContext)
    const [loginForm, setLoginForm] = React.useState({
        email: '',
        password: ''
    })

    const onInputChange = (e, fieldName) => {
        setLoginForm({ ...loginForm, [fieldName]: e.target.value })
    }

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/signin", loginForm)
            .then(res => {
                console.log(res.data)
                cookie.save('user', res.data, {
                    path: '/',
                    maxAge: 3600,
                })
                setUser(res.data)
            })
    }
    return (
        <div>
            <Button style={{ color: "white" }} onClick={handleClickOpen}>
                Login
      </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <TextField onChange={(e) => onInputChange(e, 'email')} id="standard-basic" label="Standard" />
                    <br />
                    <TextField onChange={(e) => onInputChange(e, 'password')} type="password" id="sandard-basic" label="Standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
          </Button>
                    <Button onClick={handleLogin} color="primary" autoFocus>
                        Se connecter
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
