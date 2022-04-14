import * as nodemailer from 'nodemailer'
export const VERIFICATION_CODE_EXPIRES_IN_SECONDS = 60 * 60 * 24

export async function sendEmail({ to, subject, text, html }) {
  console.log('Sending email to', to)
  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SEND_IN_BLUE_EMAIL,
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Blog Service" <' + process.env.SEND_IN_BLUE_EMAIL + '>',
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html, // html body
  })
  return info
}

export function sendPasswordResetEmail(emailAddress, name, token) {
  const subject = 'Reset Your Password'
  const link = process.env.HOST_URL + 'reset-password?resetToken=' + token
  const text =
    'Hi ' +
    name +
    ',\n\n' +
    'You recently requested to reset your password.\n\nThe token and link are valid for 20 minutes.\n\n' +
    'Your token is ' +
    token +
    'Your link is ' +
    link
  const html =
    'Hi ' +
    name +
    ', <br><br>You recently requested to reset your password.<br><br>The token and link are valid for 20 minutes.<br><br>' +
    'Your token is ' +
    token +
    '<br><br>Your link is <a href="' +
    link +
    '" >' +
    link +
    '</a>'
  return sendEmail({ to: emailAddress, subject, text, html })
}

export function sendVerificationEmail(email, name, code) {
  const subject = 'Please Verify Your Email'
  const link =
    process.env.HOST_URL +
    '.netlify/functions/verifyEmail?email=' + //this path will be replaced by frontend page path
    email +
    '&code=' +
    code
  const text =
    'Hi ' +
    name +
    ',\n\n' +
    'Welcome to join our community!\n\n' +
    'Please enter this code to verify your email address. The code and link are valid for 24 hours.\n\n' +
    'Your code is ' +
    code +
    '.\n\n' +
    'Your link is ' +
    link
  const html =
    'Hi ' +
    name +
    ',<br><br>' +
    'Welcome to join our community!<br><br>' +
    'Please enter this code to verify your email address. The code and link are valid for 24 hours.<br><br>' +
    'Your code is ' +
    code +
    '.<br><br>' +
    'Your link is <a href="' +
    link +
    '" >' +
    link +
    '</a>'
  return sendEmail({ to: email, subject, text, html })
}
