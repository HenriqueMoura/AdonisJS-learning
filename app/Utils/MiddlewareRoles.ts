const middlewareRoles = { admin: 'acl:admin', auth: 'auth' } as const

type middlewareRole = keyof typeof middlewareRoles

const middlewareArray = Object.keys(middlewareRoles) as middlewareRole[]

export { middlewareRoles, middlewareRole, middlewareArray }
