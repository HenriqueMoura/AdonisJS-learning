const userGenre = ['masculino', 'feminino', 'outros'] as const

type UserGenre = (typeof userGenre)[number]

export { userGenre, UserGenre }
