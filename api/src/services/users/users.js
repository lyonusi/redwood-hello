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

export const emailUser = async ({ id }) => {
  console.log('~~~~~~~~~~ id =', id)
  const user = await db.user.findUnique({
    where: { id },
  })

  console.log('Sending email to', user)
  await sendTestEmail(user.email)

  return user
}

function sendTestEmail(emailAddress) {
  const subject = 'Test Email'
  const text =
    'This is a manually triggered test email.\n\n' +
    'It was sent from a RedwoodJS application.'
  const html =
    'This is a manually triggered test email.<br><br>' +
    'It was sent from a RedwoodJS application.'
  return sendEmail({ to: emailAddress, subject, text, html })
}
