import { db } from 'src/lib/db'

export const audits = () => {
  return db.audit.findMany()
}

export const audit = ({ id }) => {
  return db.audit.findUnique({
    where: { id },
  })
}

export const Audit = {
  user: (_obj, { root }) =>
    db.audit.findUnique({ where: { id: root.id } }).user(),
}
