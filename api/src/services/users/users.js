import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const User = {
  audits: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).audits(),
}

export const requestToResetPassword = async ({ id }) => {
  console.log('~~~~~~~~~~ id =', id)
  const user = await db.user.findUnique({
    where: { id },
  })

  console.log('Sending email to', user)
  await sendPasswordResetEmail(user.resetToken, user.email)

  return user
}

function sendPasswordResetEmail(token, emailAddress) {
  console.log('sending verification email to', emailAddress)
  const subject = 'Reset Your Password'
  const link = 'http://localhost:8910/reset-password?resetToken=' + token
  const text =
    'This is a manually triggered test email.\n\n' +
    'It was sent from a RedwoodJS application.' +
    'Your token is ' +
    token +
    'Your link is ' +
    link
  const html =
    'This is a manually triggered test email.<br><br>' +
    'It was sent from a RedwoodJS application.<br><br>' +
    'Your token is ' +
    token +
    '<br><br> Your link is ' +
    link
  return sendEmail({ to: emailAddress, subject, text, html })
}

export const setEmailVerified = ({ id }) => {
  return db.user.update({
    is_email_verified: true,
    where: { id },
  })
}
