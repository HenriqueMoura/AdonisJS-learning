import Route from '@ioc:Adonis/Core/Route'

import './auth'
import './uploads'
import './users'

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})

Route.get('/', async ({ response }) => {
  return response.send('Não há nada aqui.')
})
