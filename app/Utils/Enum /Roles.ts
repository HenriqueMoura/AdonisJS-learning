const userRoles = { admin: 'admin', normal: 'normal', professor: 'professor' } as const

type UserRole = keyof typeof userRoles

const rolesArray = Object.keys(userRoles) as UserRole[]

export { userRoles, UserRole, rolesArray }
