import Route from '@ioc:Adonis/Core/Route'
import { middlewareRoles } from 'App/Utils/Enum /MiddlewareRoles'

Route.post('/projects', 'Project/Main.store').middleware(middlewareRoles.admin)
Route.delete('/projects/:path', 'Project/Main.destroy').middleware(middlewareRoles.admin)
Route.put('/projects/:path', 'Project/Main.update').middleware(middlewareRoles.admin)
Route.get('/projects/:path', 'Project/Main.show').middleware(middlewareRoles.auth)
