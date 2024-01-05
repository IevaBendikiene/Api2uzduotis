import express from 'express'
import dotenv from 'dotenv'
import beerRouts from './routes/beers.js'
import mongoose from 'mongoose'
import userRoutes from './routes/user.js'

dotenv.config()//ateina is dotenv config funkcija 

const app = express()
//middleware kodas kuris vykdomas serveryje
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
app.use('/api/beers', beerRouts)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.URI)
   .then(() =>{
    app.listen(process.env.PORT, () =>{
        console.log('listen on port', process.env.PORT)
    })
   })
   .catch((err) => console.log(err))