import React from 'react';

import './sign-in-and-up.styles.scss'

import SignUp from '../../components/sign-up/sign-up'
import SignIn from '../../components/sign-in/sign-in'

const SignInAndUp = () => (
  <div className='sign-in-and-up'>
    <SignIn />
    <SignUp />
  </div>
)

export default SignInAndUp;
