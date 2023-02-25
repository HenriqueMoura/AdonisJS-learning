import Route from '@ioc:Adonis/Core/Route'
import { middlewareRoles } from 'App/Utils/MiddlewareRoles'

Route.post('/:pathName/groups', 'Group/Main.store').middleware(middlewareRoles.auth)