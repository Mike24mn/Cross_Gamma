import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import './Footer.css';
import { useState } from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {


  // rembember to add that luxon is used in the readme
  
  const [currentTime, setCurrentTime] = useState('')

  const updateClock = () => {
    const current = DateTime.local().toFormat('HH:mm:ss')
    setCurrentTime(current);
  }

  useEffect(() => {
    const timeInt = setInterval(updateClock, 1000) // interval for clock
    return () => clearInterval(timeInt) // clear interval when comp. unmounts
  }, []) // run once only when mounting

  return (
    <footer>
      <div className='timedivvy'>Current Time: {currentTime}</div>
      &copy; Cross-Gamma, 2024 | Evergreen Investments
    </footer>
  );
}

export default Footer;
