import * as nodemailer from 'nodemailer'
export async function sendEmail({ to, subject, text, html }) {
  console.log('Sending email to:', to)
  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: 'lyonusi@Gmail.com',
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Utopic" <lyonusi@Gmail.com>',
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html, // html body
  })
  return info
}
