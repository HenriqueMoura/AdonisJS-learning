const fileCategories = ['avatar', 'post'] as const

type fileCategory = (typeof fileCategories)[number]

export { fileCategories, fileCategory }
