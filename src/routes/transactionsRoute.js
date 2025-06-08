import express from 'express'
import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId } from '../controllers/transactionsController.js'

const router = express.Router()

///////////////// GET \\\\\\\\\\\\\\\\\\\\\\\
router.get("/:userId", getTransactionsByUserId)

router.get('/summary/:userId', getSummaryByUserId)

///////////////// POST \\\\\\\\\\\\\\\\\\\\\\\
router.post("/", createTransaction)

///////////////// DELETE \\\\\\\\\\\\\\\\\\\\\\\
router.delete('/:id', deleteTransaction)


export default router;
