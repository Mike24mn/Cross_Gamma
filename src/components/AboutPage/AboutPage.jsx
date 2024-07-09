import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="container">
      <div className="section">
        <h1 className="section-title">Description:</h1>
        <p>
          CrossGamma is a desktop application designed for options traders to
          track and manage positions. The app is intended to integrate with
          Schwab API endpoints to provide account information and performance
          insights. The end goal is to supply users with an enhanced ability to
          analyze positions for risk exposure and to provide a meaningful and
          insightful method of logging profits.
        </p>
      </div>

      <div className="section">
        <h1 className="section-title">Why?</h1>
        <p>
          Brokerage software today lacks the ability to track some of the
          metrics created within this App. Many of which are truly invaluable to
          options traders. This creates a need for custom software to fill the
          gap, especially for relatively niche trading strategies. Cross Gamma
          seeks to ensure everyone has access to in-house tools used by larger
          institutions and hedge funds to monitor positions. Cross Gamma is
          essentially meant to be a companion tool to use alongside your
          brokerage software/website. API integration will eventually be
          expanded to include any broker that offers API endpoints and
          integration with user accounts via OAuth. This will likely be in the
          form of a drop-down menu on the login page and routes designed to
          accommodate each broker's authentication process respectively.
        </p>
        <div className="section">
        <h1 className="section-titleexample">Example:</h1>
        <img src="/images/image copy 2.png" alt="Example" className="example-imageone" />
        <img src="/images/image copy.png" alt="Example" className="example-imagetwo" />
      </div>
      </div>

      <div className="section">
        <h1 className="section-title">Future Release Features:</h1>
        <ul className="future-features-list">
          <li>Time until-market-close will be located next to the clock</li>
          <li>
            A user alert system for notes, or the ability to be alerted on
            positions of the users' choice
          </li>
          <li>Live integration with Schwab API endpoints</li>
          <li>
            A scanner that searches for options to sell, similar to what brokers
            offer, but with added specific criteria that option writers find
            valuable, such as avoiding earnings events and potential sigma
            events (multiple standard deviation events) like a pharmaceutical
            company announcing a new drug or drug breakthrough in the pipeline
          </li>
          <li>
            Scanner and Table should auto-refresh (setInterval???) when a user
            is on the page every so often (10 seconds?) and calculation will be
            performed again to recalculate position standings
          </li>
          <li>
            A bar graph that shows monthly performance, i.e., how your
            performance varies from one month to the next (will be located on
            the Account Overview Page)
          </li>
          <li>
            Call/Put positions will display with a respective P for put or a C
            for call (this is part of API ticker column data usually)
          </li>
          <li>
            A forgot password page that links to a user's email and lets them
            reset their password
          </li>
          <li>
            The ability to toggle when premium is expiring by expiration dates
            and see how much premia is expiring by date
          </li>
          <li>
            New tables and a tool suite added to the Current Positions page
          </li>
          <li>
            The ability to click on an account overview box and see a
            comprehensive breakdown of your NLV, Premia Sold, and YTD
            Performance
          </li>
          <li>
            The ability to click on the charts to get a more complete breakdown
            of information and different metrics and the ability to adjust the
            date range
          </li>
        </ul>
      </div>

      <div className="section disclaimer">
        <p>Disclaimer:</p>
        <p className="disclaimer">The Qinematic Quant is not a real company!</p>
      </div>
    </div>
  );
}

export default AboutPage;
