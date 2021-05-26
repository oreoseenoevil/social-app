import React, { useState, useContext, useEffect } from 'react'
import '@Pages/signin/index.scss'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useHistory } from 'react-router-dom'
import { GiCaptainHatProfile } from 'react-icons/gi'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { login } from '@Actions/auth'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core'

import { useSelector } from 'react-redux'

import { LayoutContext } from '@Context/Layout'

function Copyright() {
  return (
    <Typography variant="body2" color="inherit" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '320px',
    width: '100%',
    color: 'inherit'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    padding: '1em'
  },
  form: {
    width: '95%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: 'inherit'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  multilineColor: {
    color: 'inherit'
  },
  notchedOutline: {
    borderColor: 'inherit'
  },
  button: {
    cursor: 'pointer'
  },
  margin: {
    margin: theme.spacing(1, 0, 1)
  },
  textField: {
    width: '100%'
  }
}))

export default function SignIn() {
  const { dark } = useContext(LayoutContext)
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()
  const initialState = {
    email: '',
    password: ''
  }

  
  const { alert, auth } = useSelector(state => state)

  useEffect(() => {
    if (auth.token) {
      history.push('/')
    }
  }, [auth.token, history])

  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState(initialState)

  const { email, password } = userData

  const handleChange = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]:value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(login(userData))
  }

  return (
    <div className="signin">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <GiCaptainHatProfile className="avatar" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl className={clsx(classes.textField, classes.margin)} variant="outlined">
              <InputLabel
                classes={{
                  root: classes.multilineColor
                }}
              >Email</InputLabel>
              <OutlinedInput
                id="standard-adornment-email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                labelWidth={40}
                required
                classes={{
                  root: classes.multilineColor,
                  notchedOutline: classes.notchedOutline
                }}
              />
            </FormControl>
            <FormControl className={clsx(classes.textField, classes.margin)} variant="outlined">
              <InputLabel
                classes={{
                  root: classes.multilineColor
                }}
              >Password</InputLabel>
              <OutlinedInput
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleChange}
                required
                classes={{
                  root: classes.multilineColor,
                  notchedOutline: classes.notchedOutline
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <MdVisibility className={`visible ${dark && 'active'}`} /> : <MdVisibilityOff className={`visible ${dark && 'active'}`} />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={alert.loading}
            >
              {alert.loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  onClick={() => history.push('/password_reset')}
                  className={classes.button}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2"
                  className={classes.button}
                  onClick={() => history.push('/signup')}
                >
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  )
}
