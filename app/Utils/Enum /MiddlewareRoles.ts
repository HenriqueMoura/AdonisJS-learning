const middlewareRoles = { admin: 'acl:admin', auth: 'auth' } as const

type MiddlewareRole = keyof typeof middlewareRoles

const middlewareArray = Object.keys(middlewareRoles) as MiddlewareRole[]

export { middlewareRoles, MiddlewareRole, middlewareArray }
