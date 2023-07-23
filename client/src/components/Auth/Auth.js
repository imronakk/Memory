import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Icon from './icon.js';
import { useNavigate } from 'react-router-dom'; 
import { GoogleLogin } from '@react-oauth/google';
import Inputform from './inputForm'
import { createOrGetUser } from './GlgRes';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth'

const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, SetIsSignup] = useState(false)

  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
  const [formData, setFormData] = useState(initialState)

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (isSignup) {
      dispatch(signup(formData,navigate))
    }else{
      dispatch(signin(formData,navigate))
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const switchMode = () => {
    SetIsSignup((prevIsSignup) => !prevIsSignup)
  }

  const googleSuccess = async (res) => {
    const result = await createOrGetUser(res);
    const token = res?.credential;

    // console.log(token)
    // console.log(res)

    try {
      dispatch({type:'AUTH' , data:{result,token}})
      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

  const googleError = (error) => {
    console.log(error)
    console.log("Unsuccessful sign in ")
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>

          <form className={classes.form} onSubmit={handleSubmit}>

            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Inputform name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Inputform name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}

              <Inputform name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Inputform name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              
              {isSignup && <Inputform name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ background: 'rgb(18 16 16)' }} className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
 
            <GoogleLogin
              render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onError={googleError}
              cookiePolicy="single_host_origin"
            />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode} >
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>

          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Auth
