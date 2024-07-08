const express = require('express');
const pool = require('../modules/pool');
const { default: yahooFinance } = require('yahoo-finance2');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");


  // We are going to use this to grab a chart eventually 

router.get("/chart/AAPL", rejectUnauthenticated, async (req, res) => {
    try {
        const result = await yahooFinance.chart("AAPL", {
            period1: '2024-01-01',
            period2: '2024-07-08', 
            interval: '1d' // daily int. 
          });
          res.json(result) } // send result as json
    catch (error) {
        res.status(500).json(error)
    }
    
})

/*  THIS ROUTE BELOW IS A GOOD EXAMPLE OF PULLING A GIVEN SYMBOLS CHART DATA

router.get("/chartgrab/:symbol", rejectUnauthenticated, async (req, res) => {
    const { symbol } = req.params // destructure symbol so we can look for certain symbols specified by user
    try {
        const result = await yahooFinance.chart(symbol, {
            period1: '2024-01-01',
            period2: '2024-07-08', 
            interval: '1d' // daily int. 
          });
          res.json(result) } // send result as json
    catch (error) {
        res.status(500).json(error)
    }
    
})
*/

module.exports = router;


