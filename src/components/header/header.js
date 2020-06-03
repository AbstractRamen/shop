import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './header.styles.scss'

import { ReactComponent as Logo } from '../../assets/original.svg';
import { auth } from '../../firebase/firebase.utils';
import CartHeader from '../cart-header/cart-header';
import CartDropdown from '../cart-dropdown/cart-dropdown';

const Header = ({currentUser, hidden}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo'/>
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/contact'>
        CONTACT
      </Link>
      {
        currentUser ?
        <div className='option' onClick={()=> auth.signOut()}>
        SIGN OUT
        </div>
        :
        <Link className='option' to='/signin'>
        SIGN IN
        </Link>
      }
      <CartHeader />
    </div>
    { hidden ?
      null : <CartDropdown />
    }
  </div>
)

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden
})

export default connect(mapStateToProps)(Header);
