import express, { json } from 'express'
import { moviesRouter } from './routes/movies'
import { corsMiddleware } from './middlewares/cors'

const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(corsMiddleware())

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})
