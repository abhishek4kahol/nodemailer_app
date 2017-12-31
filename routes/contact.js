const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/',(req,res) => {
  res.render('contact');
});

router.post('/send', (req,res) => {
//es6 template string-backticks
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li><h4>Name:</h4> ${req.body.name}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', //Example :: smtp.live.com
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'Your_Email_Address',
            pass: 'Your_Password'
        },
        tls: {
          rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Your_Name"<Your_Email_Address>', // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject, // Subject line
        text: 'Hello', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg:'Email has been sent'});
        });
});
module.exports = router;
