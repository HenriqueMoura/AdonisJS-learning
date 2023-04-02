import Route from '@ioc:Adonis/Core/Route'
import { middlewareRoles } from 'App/Utils/Enum /MiddlewareRoles'

Route.post('/:pathName/groups', 'Group/Main.store').middleware(middlewareRoles.auth)
Route.get('/:pathName/groups', 'Group/Main.show').middleware(middlewareRoles.auth)
