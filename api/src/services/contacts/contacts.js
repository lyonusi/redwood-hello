import { validate } from '@redwoodjs/api'
import { db } from 'src/lib/db'

export const contacts = () => {
  return db.contact.findMany()
}

export const createContact = ({ input }) => {
  validate(input.email, 'email', { email: true })
  return db.contact.create({ data: input })
}
