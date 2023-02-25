import Route from '@ioc:Adonis/Core/Route'
import { middlewareRoles } from 'App/Utils/MiddlewareRoles'

Route.post('/users/register', 'Users/Register.store')
Route.get('/users/register/:key', 'Users/Register.show')
Route.put('/users/register', 'Users/Register.update')

Route.post('/users/forgot-password', 'Users/ForgotPassword.store')
Route.get('/users/forgot-password/:key', 'Users/ForgotPassword.show')
Route.put('/users/forgot-password', 'Users/ForgotPassword.update')

Route.get('/users', 'Users/Main.show').middleware(middlewareRoles.auth)
Route.put('/users', 'Users/Main.update').middleware(middlewareRoles.auth)

Route.put('/users/avatar', 'Users/Avatar.update').middleware(middlewareRoles.auth)
Route.delete('/users/avatar', 'Users/Avatar.destroy').middleware(middlewareRoles.auth)


