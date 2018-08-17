import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import {connect} from 'react-redux'
import AccountIcon from 'material-ui-icons/AccountBox'


const TopBar = (props) => {
  const { location, history, user } = props

  return (
    <AppBar position="absolute" style={{zIndex:10, backgroundColor:'#f9e54f'}}>
      <Toolbar>
        <Typography variant="title" color="black" style={{flex: 1, width: '200px', fontFamily:'Rye', fontSize: '30px'}} >
          <img
            src={require(`../../images/goldrush.png`)}
            className="header-logo"
          />
        </Typography>
        {
          user &&
          <Button color="black" style={{flex: 1, fontFamily:'Rye', fontSize: '0.7em'}}><AccountIcon /> { user.firstName }</Button>
        }

        {
          location.pathname.indexOf('signup') > 0 &&
          <Button color="black" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          location.pathname.indexOf('login') > 0 &&
          <Button color="black" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          location.pathname.indexOf('games/') > 0 &&
          <Button style={{flex: 1, fontFamily:'Rye', fontSize: '0.9em'}}color="black" onClick={() => history.push('/games')}>All Games</Button>
        }
        {
          /games$/.test(location.pathname) &&
          <Button color="black" onClick={() => history.push('/logout')}>Log out</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(
  connect(mapStateToProps)(TopBar)
)
