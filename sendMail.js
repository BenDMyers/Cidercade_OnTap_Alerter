/*** UTILITIES FOR TRANSPORTING EMAIL MESSAGE ***/

const nodemailer = require('nodemailer');

// Email
const {outboxAddress, outboxPass, receiverAddress} = require('./config/keys');
const transporter = nodemailer.createTransport(`smtps://${outboxAddress}%40gmail.com:${outboxPass}@smtp.gmail.com`);

const sendMail = (message) => {
    const mailOptions = {to: receiverAddress, subject: '♝ Your Cidercade On-Tap Updates', text: message};
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {console.log(error);}
        else {
            console.log(info.response);
        }
    });
};

export default sendMail;