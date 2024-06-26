const base64 = require('base-64')
const axios = require('axios')

const SCHWA_APP_KEY = process.env.SCHWA_APP_KEY
const SCHWA_SECRET = process.env.SCHWA_SECRET
const CALLBACK_URL = process.env.CALLBACK_URL

const authUrl = `https://api.schwabapi.com/v1/oauth/authorize?client_id=${SCHWA_APP_KEY}&redirect_uri=${CALLBACK_URL}`

async function getToken(returnedLink) {
  const code = returnedLink.substring(returnedLink.indexOf('code=') + 5, returnedLink.indexOf('%40'))
  const headers = {
    "Authorization": `Basic ${base64.encode(`${SCHWA_APP_KEY}:${SCHWA_SECRET}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: CALLBACK_URL
  }

  try {
    const response = await axios.post('https://api.schwabapi.com/v1/oauth/token', new URLSearchParams(data), { headers: headers })
    return response
  } catch (error) {
    console.error(error)
    throw error;
  }
}

async function getAccountNum() {
  const accessToken = await getToken().then(res => res.data.access_token)
  const baseUrl = "https://api.schwabapi.com/trader/v1/";

  try {
    const responseTwo = await axios.get(`${baseUrl}/accounts/accountNumbers`, { headers: { "Authorization": `Bearer ${accessToken}` } })
    return responseTwo
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  authUrl,
  getToken,
  getAccountNum
}