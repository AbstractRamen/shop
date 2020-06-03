import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndUp from './pages/sign-in-and-up/sign-in-and-up';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser  } from './redux/user/user-actions'

class App extends React.Component {

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            currentUser: {
              id: snapShot.id,
            ...snapShot.data()
          }
          })
        })
      }
      this.props.setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  unsubscribeFromAuth = null

  render(){return (
    <div>

        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin'
            render={()=> this.props.currentUser? (
              <Redirect to='/' />) : (
                <SignInAndUp />
              )}/>
        </Switch>

    </div>
  );}
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
