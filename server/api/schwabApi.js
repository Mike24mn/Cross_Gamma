const base64 = require('base-64')
const axios = require('axios')
require('dotenv').config()

const SCHWA_APP_KEY = process.env.SCHWA_APP_KEY
const SCHWA_SECRET = process.env.SCHWA_SECRET
const CALLBACK_URL = process.env.CALLBACK_URL

const authUrl = `https://api.schwabapi.com/v1/oauth/authorize?client_id=${SCHWA_APP_KEY}&redirect_uri=${encodeURIComponent(CALLBACK_URL)}&response_type=code`


async function getToken(returnedCode) {

  const headers = {
    "Authorization": `Basic ${base64.encode(`${SCHWA_APP_KEY}:${SCHWA_SECRET}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  console.log("headers IN GET TOKEN POST is:", headers);

  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code: returnedCode,
    redirect_uri: CALLBACK_URL
  }).toString()

  console.log("data IN GET TOKEN POST is: ", data);

  try {
    const response = await axios.post('https://api.schwabapi.com/v1/oauth/token', data, { headers })
    return response.data
  } catch (error) {
    console.error('Error exchanging code for token:', error)
    throw error
  }
}

async function getAccountNum(accessToken) {
  const baseUrl = "https://api.schwabapi.com/trader/v1" // NOTE: NEEDS TO BE THE URL THAT IS POSTED ON THE DEV PORTAL ROUTE YOUR TRYING TO ACCESS
 // The response below goes to a specific API route for schwab, adjust or add more routes as needed (i.e, make more)
  try {
    const response = await axios.get(`${baseUrl}/accounts/accountNumbers`, {
      headers: { 
        "Authorization": `Bearer ${accessToken}`,
      }
    });
    return response.data
  } catch (error) {
    console.error('Error retrieving account numbers:', error)
    throw error
  }
}

module.exports = {
  authUrl,
  getToken,
  getAccountNum
}
