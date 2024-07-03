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

  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code: returnedCode,
    redirect_uri: CALLBACK_URL
  }).toString()

  try {
    const response = await axios.post('https://api.schwab.com/v1/oauth/token', data, { headers })
    return response.data
  } catch (error) {
    console.error('Error exchanging code for token:', error)
    throw error
  }
}

async function getAccountNum(accessToken) {
  const baseUrl = "https://api.schwab.com/trader/v1"

  try {
    const response = await axios.get(`${baseUrl}/accounts/accountNumbers`, {
      headers: { "Authorization": `Bearer ${accessToken}` }
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
