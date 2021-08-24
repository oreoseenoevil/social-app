import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiCameraLine } from 'react-icons/ri'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup
} from '@material-ui/core'
import clsx from 'clsx'
import '@Components/Profile/Edit/index.scss'
import { checkImage } from '@Helpers'
import { TYPES, updateProfileUser } from '@Actions'
import { LayoutContext } from '@Context/Layout'

const initialState = {
  fullname: '',
  mobile: '',
  address: '',
  website: '',
  story: '',
  gender: ''
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    padding: '1em'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
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
  },
  group: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row'
  }
}))

export const Edit = ({ setOnEdit }) => {
  const { dark } = useContext(LayoutContext)
  const classes = useStyles()
  const [userData, setUserData] = useState(initialState)

  const { fullname, mobile, address, website, story, gender } = userData

  const [avatar, setAvatar] = useState('')
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserData(auth.user)
  }, [auth.user])

  const handleCapture = e => {
    const file = e.target.files[0]
    const err = checkImage(file)
    if (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err }
      })
    }
    setAvatar(file)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateProfileUser({ userData, avatar, auth }))
  }

  return (
    <div className="edit-profile">
      <form className={`${dark && 'dark'}`} onSubmit={handleSubmit}>
        <span
          className={`close x-marked ${dark && 'dark'}`}
          onClick={() => setOnEdit(false)}
        ></span>
        <div className="info-avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
          />
          <span className="group-item">
            <RiCameraLine size="1.5em" />
            <span>Change</span>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={handleCapture}
            />
          </span>
        </div>
        <div className="form-group">
          <FormControl
            className={clsx(classes.textField, classes.margin)}
            variant="outlined"
          >
            <InputLabel
              classes={{
                root: classes.multilineColor
              }}
            >
              Fullname
            </InputLabel>
            <OutlinedInput
              id="standard-adornment-fullname"
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              labelWidth={68}
              required
              classes={{
                root: classes.multilineColor,
                notchedOutline: classes.notchedOutline
              }}
            />
          </FormControl>
          <FormControl
            className={clsx(classes.textField, classes.margin)}
            variant="outlined"
          >
            <InputLabel
              classes={{
                root: classes.multilineColor
              }}
            >
              Mobile
            </InputLabel>
            <OutlinedInput
              id="standard-adornment-mobile"
              type="text"
              name="mobile"
              value={mobile}
              onChange={handleChange}
              labelWidth={50}
              classes={{
                root: classes.multilineColor,
                notchedOutline: classes.notchedOutline
              }}
            />
          </FormControl>
          <FormControl
            className={clsx(classes.textField, classes.margin)}
            variant="outlined"
          >
            <InputLabel
              classes={{
                root: classes.multilineColor
              }}
            >
              Address
            </InputLabel>
            <OutlinedInput
              id="standard-adornment-address"
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              labelWidth={62}
              classes={{
                root: classes.multilineColor,
                notchedOutline: classes.notchedOutline
              }}
            />
          </FormControl>
          <FormControl
            className={clsx(classes.textField, classes.margin)}
            variant="outlined"
          >
            <InputLabel
              classes={{
                root: classes.multilineColor
              }}
            >
              Website
            </InputLabel>
            <OutlinedInput
              id="standard-adornment-mobile"
              type="text"
              name="website"
              value={website}
              onChange={handleChange}
              labelWidth={60}
              classes={{
                root: classes.multilineColor,
                notchedOutline: classes.notchedOutline
              }}
            />
          </FormControl>
          <FormControl
            className={clsx(classes.textField, classes.margin)}
            variant="outlined"
          >
            <InputLabel
              classes={{
                root: classes.multilineColor
              }}
            >
              Story
            </InputLabel>
            <OutlinedInput
              id="standard-adornment-mobile"
              type="text"
              name="story"
              value={story}
              onChange={handleChange}
              labelWidth={38}
              multiline
              rows={2}
              classes={{
                root: classes.multilineColor,
                notchedOutline: classes.notchedOutline
              }}
            />
          </FormControl>
          <FormControl
            component="fieldset"
            className={clsx(classes.textField, classes.margin)}
          >
            <FormLabel component="legend" className={classes.multilineColor}>
              Gender
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={handleChange}
              className={classes.group}
            >
              <FormControlLabel
                name="gender"
                value="male"
                control={<Radio className={classes.notchedOutline} />}
                label="Male"
              />
              <FormControlLabel
                name="gender"
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                name="gender"
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update
        </Button>
      </form>
    </div>
  )
}
