import { faker } from '@faker-js/faker'
function generateCode(): string {
  const alphaNumeric = faker.random.alphaNumeric(6) // Gera string com letras e números
  const chunks = alphaNumeric.match(/.{1,3}/g) // Divide a string em grupos de 3 caracteres
  return chunks!.join('-') // Retorna a string final com hífens
}

export { generateCode }
