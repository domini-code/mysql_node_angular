//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import nodemailer = require('nodemailer');

let pass = 'qjxzvryiqqhmgkzj';
// create reusable transporter object using the default SMTP transport

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // false for 587, true for 465, false for other ports
  auth: {
    user: 'fernando.mastropietro@gmail.com', // generated ethereal user
    pass: pass, // generated ethereal password  : qeofjyjeuchtxbbd
  },
});
  
transporter.verify().then(() => {
  console.log("Ready for send emails !");
});