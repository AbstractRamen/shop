import React from 'react';

import InputForm from '../input-form/input-form';
import CustomButton from '../custom-button/custom-button';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss'

class SignIn extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email: '', password: ''})
    } catch (e) {
      alert('Wrong credentials. Please try again.')
    }

  }

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({[name]: value})
    console.log(e)
  }

  render(){
    return(
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <InputForm
            name='email'
            type='email'
            handleChange={this.handleChange}
            label='Email'
            value={this.state.email}
            required />

          <InputForm
            name='password'
            label='Password'
            type='password'
            handleChange={this.handleChange}
            value={this.state.password}
            required />

          <div className='buttons'>
            <CustomButton type='submit'>
              Sign In
            </CustomButton>
            <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn >
              Google Sign-in
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;
