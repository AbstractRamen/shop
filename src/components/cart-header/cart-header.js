import React from 'react';
import { connect } from 'react-redux';

import toggleCartHidden from '../../redux/cart/cart-actions';

import './cart-header.styles.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/cart.svg';

const CartHeader = ({toggleCartHidden}) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon'/>
    <span className='item-count'>0</span>
  </div>
)

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(
  null,
  mapDispatchToProps
)(CartHeader);
