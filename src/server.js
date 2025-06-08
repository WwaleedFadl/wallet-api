import express from "express";
import dotenv from 'dotenv'
import { initDB, sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from './routes/transactionsRoute.js'

/////////////////////////// ABC \\\\\\\\\\\\\\\\\\\\\\
dotenv.config();
const app = express()
const PORT = process.env.PORT || 5001;

/////// Middleware \\\\\\
app.use(express.json())
app.use(rateLimiter)

////////////////////////// Initalize \\\\\\\\\\\\\\\\\\\\\\
initDB()
////////////////////////// Routes \\\\\\\\\\\\\\\\\\\\\\
app.use('/api/transactions', transactionsRoute)

////////////////////////// GO \\\\\\\\\\\\\\\\\\\\\\
initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server On Port', PORT)
  })

})
