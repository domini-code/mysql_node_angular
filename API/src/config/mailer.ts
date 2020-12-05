//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
import nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
  export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'fernando.mastropietro@gmail.com', // generated ethereal user
      pass: 'qjxzvryiqqhmgkzj', // generated ethereal password  : qjxzvryiqqhmgkzj
    },
  });
  
  transporter.verify().then(() => {
      console.log("Ready for send emails !");
  });