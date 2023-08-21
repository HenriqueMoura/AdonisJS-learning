const userRoles = { admin: 'admin', partner: 'partner', normal: 'normal' } as const

type UserRole = keyof typeof userRoles

const rolesArray = Object.keys(userRoles) as UserRole[]

export { UserRole, rolesArray, userRoles }
