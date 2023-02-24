const middlewareRoles =  [ 'acl:admin', 'auth'] as const

type middlewareRole = typeof middlewareRoles[number]

export { middlewareRoles, middlewareRole}