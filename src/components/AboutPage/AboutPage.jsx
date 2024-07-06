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
        manage positions. The app is inteded to integrate with Schwab API endpoints to
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
       <center><div className='listDiv'>
        <h1>Future Release Features:</h1>
        <li>Time until-market-close will be located next to the clock</li>
        <li>A user alert system for notes, or the ability to be alerted on positions of the users choice</li>
        <li>Live integration with Schwab API endpoints</li>
        <li>A scanner that searches for options to sell, this will be similar to what brokers offer, but with added specific criteria that option writers (generally) find valuable, such as avoiding earnings events and avoiding potential sigma events (multiple standard deviation events) like a pharma company announcing a new drug or drug breakthrough in the pipeline</li>
        <li>Scanner and Table should autorefresh (setInterval???) when a user is on the page every so often (10 seconds?) and calculation will be performed again to recalculate position standings</li>
        <li>Charts showing NLV performance, and a bar graph that shows monthly performance, i.e, how your performance varies from one month to the next on a bar graph (both of these will be located on the Account Overview Page)</li>
        <li>Call/Put positions will display with a respective P for put or a C for call</li>
        <li>A forgot password page that links to a users email and lets them reset their password</li>
        <li>The ability to toggle when premium is expiring by expiration dates and see how much premia is expiring by date</li>
        <li>A class that shows red or green depending on postive or negative for the day and a red class for position under 15%otm</li>
        <li>New tables and a tool suite added to the Current Positions page</li>
        <li>The ability to click on an account overview box and see a comprehensive breakdown of your NLV, Premia Sold, and YTD Performance</li>
        </div></center> 
      </div>
      <center><p>Disclaimer:</p></center>
      <center><h5>Evergreen Investments is not a real company, although one day it may be!</h5></center>
    </div>
  );
}

export default AboutPage;
