import React from 'react';

import InputForm from '../input-form/input-form';
import CustomButton from '../custom-button/custom-button';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss'

class SignIn extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({email: '', password: ''})
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
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;
