import Route from '@ioc:Adonis/Core/Route'

import Auth from './auth'


Route.get('/', async () => {
  return { hello: 'world' }
})
