import nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
  export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'fernando.mastropietro@gmail.com', // generated ethereal user
      pass: 'wtcosjjbifvfgtqy', // generated ethereal password  : wtcosjjbifvfgtqy
    },
  });
  
  transporter.verify().then(() => {
      console.log("Ready for send emails !")
  })