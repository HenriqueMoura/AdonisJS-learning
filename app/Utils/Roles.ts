const userRoles = { admin: 'admin', normal: 'normal' } as const

type UserRole = keyof typeof userRoles

const rolesArray = Object.keys(userRoles) as UserRole[];

export { userRoles, UserRole, rolesArray }
