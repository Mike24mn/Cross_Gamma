import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <center><h1>Purpose:</h1></center>
        <p></p>
        <center><p>
        CrossGamma is a desktop application designed for options traders to track and 
        manage their options positions. The app integrates with Schwab API endpoints to
         provide account information and performance insights. The end goal
         is to supply users with an enhanced ability to analyze positions for risk exposure
         and to provide a meaningful and simple way of logging profits.</p></center>
         <p></p>
         <center><h1>Why?</h1></center>
         <p></p>
         <center><p>Brokerage software today lacks the ability to track the metrics we have created
          within this App. Many of which are truly invaluable.
         </p></center>
        <center><p>* Add example video here *</p></center>
      </div>
    </div>
  );
}

export default AboutPage;
