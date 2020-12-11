import { Users } from './../entity/Users';
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//console.log("NODE => ", process.env.NODE_TLS_REJECT_UNAUTHORIZED);

import { Password, Username } from './gmail';
import nodemailer = require('nodemailer');

//console.log("Username ==> ",Username," /// Pass==> ",Password);
// create reusable transporter object using the default SMTP transport

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // false for 587, true for 465, false for other ports
  auth: {
    user: Username, // generated ethereal user
    pass: Password, // generated ethereal password  : qeofjyjeuchtxbbd
  },
});
  
transporter.verify().then(() => {
  console.log("Ready for send emails !");
});