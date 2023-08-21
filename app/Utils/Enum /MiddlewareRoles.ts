const middlewareRoles = { admin: 'acl:admin', partner: 'acl:partner', auth: 'auth' } as const

type MiddlewareRole = keyof typeof middlewareRoles

const middlewareArray = Object.keys(middlewareRoles) as MiddlewareRole[]

export { MiddlewareRole, middlewareArray, middlewareRoles }
