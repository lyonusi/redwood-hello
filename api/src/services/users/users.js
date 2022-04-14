import { db } from 'src/lib/db'
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  VERIFICATION_CODE_EXPIRES_IN_SECONDS,
} from 'src/lib/email'
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

export const generateVerificationCodeAndEmail = async ({ id }) => {
  const verificationCode = Math.random().toFixed(6).slice(-6) // random 6 digits code
  const codeExpires = new Date()
  codeExpires.setSeconds(
    codeExpires.getSeconds() + VERIFICATION_CODE_EXPIRES_IN_SECONDS
  )
  let user = await db.user.findUnique({
    where: { id },
  })
  user = await db.user.update({
    data: {
      verificationCode: verificationCode,
      verificationCodeExpiresAt: codeExpires,
    },
    where: { id },
  })
  await sendVerificationEmail(user.email, user.username, verificationCode)
  return user
}

export const resetPassword = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  await sendPasswordResetEmail(user.email, user.username, user.resetToken)
  return user
}

export const verifyUser = async (email, verificationCode) => {
  const user = await db.user.findUnique({
    where: { email },
  })

  let verifyUserResult
  if (!user) {
    verifyUserResult = { err: Error(`User email does not exist.`), res: null }
    return verifyUserResult
  }

  if (!user.verificationCodeExpiresAt && !user.verificationCode) {
    verifyUserResult = {
      err: Error(`Verification code has expired or is invalid.`),
      res: null,
    }
    return verifyUserResult
  }
  const current = new Date()
  const isCodeExpired = current >= user.verificationCodeExpiresAt
  if (isCodeExpired) {
    verifyUserResult = {
      err: Error(`Verification code has expired.`),
      res: null,
    }
    return verifyUserResult
  }
  if (user.verificationCode != verificationCode) {
    verifyUserResult = {
      err: Error(`Verification code is invalid.`),
      res: null,
    }
    return verifyUserResult
  }
  if (user.isEmailVerified) {
    verifyUserResult = {
      err: Error(`User email has been verified.`),
      res: null,
    }
    return verifyUserResult
  }
  verifyUserResult = {
    err: null,
    res: await db.user.update({
      data: {
        isEmailVerified: true,
        verificationCode: null,
        verificationCodeExpiresAt: null,
        updatedAt: new Date(),
      },
      where: { email },
    }),
  }
  return verifyUserResult
}
