const userRoles =  [ 'admin', 'normal'] as const

type userRole = typeof userRoles[number]

export { userRoles, userRole}