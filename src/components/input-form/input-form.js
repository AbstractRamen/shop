import React from 'react';

import './input-form.styles.scss'

const inputForm = ({label, handleChange, ...otherProps}) => (
  <div className='group'>
    <input className='form-input'
      type={otherProps.type}
       value={otherProps.value}
      onChange={handleChange} {...otherProps} />
    {
      label ? (
        <label className={`${otherProps.value.length? 'shrink' : ''} form-input-label`}>
          {label}
        </label>) : null
    }
  </div>
)

export default inputForm;
