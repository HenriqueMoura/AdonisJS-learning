import Route from '@ioc:Adonis/Core/Route'
import { middlewareRoles } from 'App/Utils/MiddlewareRoles'

Route.post('/projects', 'Project/Main.store').middleware(middlewareRoles[0])
Route.get('/projects/:id', 'Project/Main.show').middleware(middlewareRoles[0])