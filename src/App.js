import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndUp from './pages/sign-in-and-up/sign-in-and-up';

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentUser: null
    }
  }

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
            ...snapShot.data()
          }
          })
        })
      }
      this.setState({ currentUser: userAuth})
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  unsubscribeFromAuth = null

  render(){return (
    <div>
      <BrowserRouter>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' component={SignInAndUp}/>
        </Switch>
      </BrowserRouter>
    </div>
  );}
}

export default App;
