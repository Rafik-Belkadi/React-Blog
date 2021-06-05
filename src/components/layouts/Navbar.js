import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginModal from '../utils/LoginModal'
import cookie from 'react-cookies'
import { UserContext } from '../../contexts'
import AddArticleModal from '../utils/AddArticleModal'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const { user, setUser } = React.useContext(UserContext)

    React.useEffect(() => {
        setUser(cookie.load('user'))
    }, [])
    const disconnect = (e) => {
        cookie.remove('user')
        setUser(null)
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {user?.user ? user?.user?.name : "News"}
                    </Typography>
                    {
                        user?.user && <Button onClick={disconnect} variant="contained" style={{ background: "red", color: "white", marginRight: 10 }} > Se déconnecter </Button>
                    }

                    {
                        user?.user ? <AddArticleModal /> :  <LoginModal />
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}