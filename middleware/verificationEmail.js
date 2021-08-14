const sgMail = require('@sendgrid/mail');
const { v4 } = require('uuid');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendVerificationEmail = (req, res, next) => {
    const verifyToken = v4();
    const message = {
        to: req.body.email,
        from: "jonny.freeman321@gmail.com",
        subject: "Test",
        text: "Test text 2",
        html: `<strong>We are glad to see you here, user with email  ${req.body.email} !<br /></strong >
        Please follow the link below to complete your registration :
        <a href="http://localhost:3000/api/users/verify/${verifyToken}">Link</a>`,
    }
    sgMail
        .send(message)
        .then(() => {
            console.log('Email sent');
            req.body.verifyToken = verifyToken;
            next();
        })
        .catch((error) => {
            console.error(error)
        })
};

module.exports = { sendVerificationEmail };
