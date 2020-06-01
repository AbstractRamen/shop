import React from 'react';

import InputForm from '../input-form/input-form';
import CustomButton from '../custom-button/custom-button';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss'

class SignUp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      displayName: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { email, password, displayName, confirmPassword } = this.state

    if(password !== confirmPassword){
      alert('Please enter matching passwords')
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)

      await createUserProfileDocument( user, {displayName})
      this.setState({
        email: '',
        password: '',
        displayName: '',
        confirmPassword: ''
      })

    } catch (e) {
      console.log(e)
    }

    this.setState({email: '', password: ''})
  }

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({[name]: value})
  }

  render(){
    return(
      <div className='sign-up'>
        <h2 className='title'>{"I don't have an account"}</h2>
        <span>Assign an email and password</span>
        <form onSubmit={this.handleSubmit}>
          <InputForm
            name='displayName'
            type='string'
            handleChange={this.handleChange}
            label='Display Name'
            value={this.state.displayName}
            required />
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
          <InputForm
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            handleChange={this.handleChange}
            value={this.state.confirmPassword}
            required />
          <div className='buttons'>
            <CustomButton type='submit'>
              Sign Up
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp;
