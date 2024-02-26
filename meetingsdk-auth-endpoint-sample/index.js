require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')
const JWT = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors())

// app.post('/', (req, res) => {

//   var utcDate = new Date(Date.UTC(
//     new Date().getUTCFullYear(),
//     new Date().getUTCMonth(),
//     new Date().getUTCDate(),
//     new Date().getUTCHours(),
//     new Date().getUTCMinutes(),
//     new Date().getUTCSeconds(),
//     new Date().getUTCMilliseconds()
//   ));

//   const iat = Math.round(utcDate / 1000) - 100;
//   const exp = iat + 60;
//   const tokenExp = iat + 60 * 10;

//   const oHeader = { alg: 'HS256', typ: 'JWT' }

//   const oPayload = {
//     sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
//     mn: req.body.meetingNumber,
//     role: req.body.role,
//     iat: iat,
//     exp: exp,
//     appKey: process.env.ZOOM_MEETING_SDK_KEY,
//     tokenExp: tokenExp
//   }

//   // const oPayload = {
//   //   "sdkKey": "WdiILOE6TZKXjWFlUxYU7g",
//   //   "mn": "221 933 6165",
//   //   "role": 0,
//   //   "iat": 1708682376,
//   //   "exp": 1708689576,
//   //   "appKey": "WdiILOE6TZKXjWFlUxYU7g",
//   //   "tokenExp": 1708689576
//   // };

//   const sHeader = JSON.stringify(oHeader)
//   const sPayload = JSON.stringify(oPayload)
//   const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_MEETING_SDK_SECRET)

//   // Options for JWT
//   // const options = {
//   //   algorithm: 'HS256' // Specify the algorithm as HS256
//   // };

//   // // Create the JWT
//   // const signature = JWT.sign(oPayload, process.env.ZOOM_MEETING_SDK_SECRET, options);
//   // console.log(signature);


//   console.log(signature);
//   res.json({
//     signature: signature,
//     sdkKey: process.env.ZOOM_MEETING_SDK_KEY
//   });

// })

// app.post('/', (req, res) => {

//   const iat = Math.round(new Date().getTime() / 1000) - 30;
//   const exp = iat + 60 * 60 * 2

//   const oHeader = { alg: 'HS256', typ: 'JWT' }

//   const oPayload = {
//     sdkKey: "WdiILOE6TZKXjWFlUxYU7g",
//     mn: req.body.meetingNumber,
//     role: req.body.role,
//     iat: iat,
//     exp: exp,
//     appKey: "WdiILOE6TZKXjWFlUxYU7g",
//     tokenExp: iat + 60 * 60 * 2
//   }

//   const sHeader = JSON.stringify(oHeader)
//   const sPayload = JSON.stringify(oPayload)
//   const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, "xQRZ9BcRzO5FfpJ6E75kU7rJgwRZzYCA")

//   console.log(signature);

//   res.json({
//     signature: signature,
//     sdkKey: "WdiILOE6TZKXjWFlUxYU7g"
//   })
// })

app.post('/', (req, res) => {


  // const utcDate = new Date(Date.UTC(
  //   new Date().getUTCFullYear(),
  //   new Date().getUTCMonth(),
  //   new Date().getUTCDate(),
  //   new Date().getUTCHours(),
  //   new Date().getUTCMinutes(),
  //   new Date().getUTCSeconds(),
  //   new Date().getUTCMilliseconds()
  // ));

  let utcDate = new Date();

  const iat = Math.round(utcDate.getTime() / 1000) - 100;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: "WdiILOE6TZKXjWFlUxYU7g",
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: "WdiILOE6TZKXjWFlUxYU7g",
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  let signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, "xQRZ9BcRzO5FfpJ6E75kU7rJgwRZzYCA")

  console.log(signature);

  // signature = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJXZGlJTE9FNlRaS1hqV0ZsVXhZVTdnIiwibW4iOiIyMjE5MzM2MTY1Iiwicm9sZSI6MCwiaWF0IjoxNzA4NzAzNTI0LCJleHAiOjE3MDg3MTA3MjQsImFwcEtleSI6IldkaUlMT0U2VFpLWGpXRmxVeFlVN2ciLCJ0b2tlbkV4cCI6MTcwODcxMDcyNH0.9QC4JYmKxR3n3I6oyxalT-UUn1ZYPa9jhZuGIcq4kdw";
  res.json({
    signature: signature,
    sdkKey: "WdiILOE6TZKXjWFlUxYU7g"
  })
})

app.listen(port, () => console.log(`Zoom Meeting SDK Auth Endpoint Sample Node.js listening on port ${port}!`))
