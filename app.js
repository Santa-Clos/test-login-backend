import 'dotenv/config'
import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.use('/movies', moviesRouter) // /movies

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})
