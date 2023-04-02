import Route from '@ioc:Adonis/Core/Route'
import { middlewareRoles } from 'App/Utils/Enum /MiddlewareRoles'

Route.post('/auth', 'Auth/Main.store')
Route.delete('/auth', 'Auth/Main.destroy').middleware(middlewareRoles.auth)
