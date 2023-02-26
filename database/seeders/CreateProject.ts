import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Project } from 'App/Models'
import kebabCase from 'lodash.kebabcase'

export default class extends BaseSeeder {
  public async run () {
    await Project.createMany([
      {
        name: faker.random.words(3),
        description: faker.random.words(10),
        pathName: kebabCase(faker.random.words(3)),
        maxGroups: 1,
        maxUserPerGroup: 2,
      },
      {
        name: "Meu novo projeto",
        description: "Este é um projeto incrível que estou trabalhando",
        pathName: "meu-novo-projeto",
        maxGroups: 10,
        maxUserPerGroup: 2
      },
    ])
  }
}
