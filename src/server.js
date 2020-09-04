import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import routes from 'organiza-evento\/routes'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use('/api/v1/evento', routes)

app.listen(PORT, () => {
    console.log('server on in port ' + PORT)
})