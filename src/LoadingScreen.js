import React from 'react';
import PropTypes from 'prop-types';
import './LoadingScreen.css';

/**
 * WaitingScreen receives text props and renders
 * simple window with text.
 */
const LoadingScreen = (props) => {
  return (
    <div className='loading-screen'>
      {props.text}
    </div>
  )
}

LoadingScreen.propTypes = {
  text: PropTypes.string
}

export default LoadingScreen;