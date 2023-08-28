// import cors from 'cors'
import express from 'express'
const app = express()
import 'express-async-errors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import notFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/error-handler.js'
import authenticateUser from './middlewares/auth.js'

// app.use(cors())
if(process.env.NODE_ENV!='production'){
  app.use(morgan('dev'))
}
app.use(express.json())

// app.get('/', (req, res) => {
//   // res.set({
//   //   "Access-Control-Allow-Origin":"*"
//   // })
//   res.json({msg:"Welcome"})
// })

app.get('/api/v1', (req, res) => {
  res.json({msg:"Api"})
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL, process.env.MONGO_PSWD)
      .then(() => {
        app.listen(port, () => {
          console.log(`Server is listening on port ${port}`)
        })
      })
      .catch(() => {
        console.log('DB connection failed')
      })
  } catch (error) {
    console.log(error)
  }
}

start()
