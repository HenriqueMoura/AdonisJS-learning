import Route from '@ioc:Adonis/Core/Route'
import { middlewareRoles } from 'App/Utils/MiddlewareRoles'

Route.post('/projects', 'Project/Main.store').middleware(middlewareRoles.admin)
Route.delete('/projects/:id', 'Project/Main.destroy').middleware(middlewareRoles.admin)
Route.get('/projects/:id', 'Project/Main.show').middleware(middlewareRoles.auth)