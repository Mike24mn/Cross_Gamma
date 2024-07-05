import React from 'react';
import "./AboutPage.css"
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <center><h1>Description:</h1></center>
        <p></p>
        <center><p>
        CrossGamma is a desktop application designed for options traders to track and 
        manage open positions. The app integrates with Schwab API endpoints to
         provide account information and performance insights. The end goal
         is to supply users with an enhanced ability to analyze positions for risk exposure
         and to provide a meaningful and insightful method of logging profits.</p></center>
         <p></p>
         <center><h1>Why?</h1></center>
         <p></p>
         <center><p>Brokerage software today lacks the ability to track some of the metrics created
          within this App. Many of which are truly invaluable to options traders. This creates a need for custom 
          software to fill the gap, especially for relatively niche trading strategies.
           Cross Gamma seeks to ensure everyone has access to [in-house] tools used by larger institutions
           and hedge funds to monitor positions.
         </p></center>
        <center><p>* Add example video here *</p></center>
      </div>
    </div>
  );
}

export default AboutPage;
