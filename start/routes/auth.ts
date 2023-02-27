import Route from '@ioc:Adonis/Core/Route'
import { middlewareRoles } from 'App/Utils/MiddlewareRoles'

Route.post('/auth', 'Auth/Main.store')
Route.delete('/auth', 'Auth/Main.destroy').middleware(middlewareRoles.auth)
