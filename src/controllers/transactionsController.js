import { sql } from "../config/db.js"

export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params
    console.log(userId)
    const transactions = await sql`SELECT * FROM transactions  WHERE user_id  = ${userId} ORDER BY created_at DESC`
    res.status(200).json(transactions)
  } catch (error) {
    console.log("Error Geting The Transaction", error)
    res.status(500).json({ message: "Internal Error" })
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;
    const balanceResult = await sql`
        SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}
    `
    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount),0) as income FROM transactions   
      WHERE user_id = ${userId} AND amount > 0
    `
    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount),0) as expenses FROM transactions   
      WHERE user_id = ${userId} AND amount < 0
    `
    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expensesResult[0].expenses
    })
  } catch (error) {
    console.log("Error Getting  The Transaction Summary for user", error)
    res.status(500).json({ message: "Internal Error" })
  }
}


export async function createTransaction(req, res) {
  try {
    const { title, amount, category, user_id } = req.body
    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" })
    }
    const transaction = await sql`
    INSERT INTO transactions(user_id,title,amount,category)
    VALUES (${user_id},${title},${amount},${category})
    RETURNING * 
  `
    console.log(transaction)
    res.status(201).json(transaction[0])
  } catch (error) {
    console.log("Error Creating the transaction", error)
    res.status(500).json({ message: "Internal Error" })
  }
}


export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid id" })
    }
    const result = await sql`
  DELETE FROM transactions WHERE id = ${id} RETURNING *
`
    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction Not Found" })
    }
    res.status(200).json({ message: "The Transaction Deleted Successfully" })
  } catch (error) {
    console.log("Error Deleting The Transaction", error)
    res.status(500).json({ message: "Internal Error" })
  }
}
