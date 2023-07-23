import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material'
import memories from '../../images/memories.png'
import useStyle from './styles'
import { Link, useLocation } from 'react-router-dom'
import '../../font.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode';


const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyle();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/auth')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < Date.now()){
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    
    return (
        <AppBar className={classes.appBar} style={{ flexDirection: 'row' }} position="static" color="inherit">

            <div className={classes.brandContainer} >
                <Typography component={Link} to="/" className={classes.heading} style={{ fontFamily: "'Style Script', cursive" }} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" style={{ background: 'rgb(18 16 16)' }} onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" style={{ background: 'rgb(18 16 16)' }} >Sign In</Button>
                )}
            </Toolbar>

        </AppBar>
    )

    // useEffect(() => {
    //     const storedUser = JSON.parse(localStorage.getItem('profile'));
    //     setUser(storedUser);
    // }, [localStorage.getItem('profile')]);

}

export default Navbar
