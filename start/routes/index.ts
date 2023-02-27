import Route from '@ioc:Adonis/Core/Route'

import './auth'
import './users'
import './uploads'
import './project'
import './groups'

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})
