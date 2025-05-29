import { Request, Response } from "express";

export async function getTransactionsByUserId(req: Request, res: Response) {
  const db = req.app.get('db');
  const userId = req.params.userId;

  try {
    const transactions = await db.Transactions.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this user.' });
    }

    return res.status(200).json(transactions);
  } catch (error) {
    console.error(`getTransactionsByUserId - ${error}`);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function getTransactionSummaryByUserId(req: Request, res: Response) {
  const db = req.app.get('db');
  const userId = req.params.userId;

  try {
    const summary = await db.Transactions.findOne({
      attributes: [
        [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'totalAmount'],
        [db.sequelize.fn('SUM', db.sequelize.literal(`CASE WHEN amount > 0 THEN amount ELSE 0 END`)), 'totalIncome'],
        [db.sequelize.fn('SUM', db.sequelize.literal(`CASE WHEN amount < 0 THEN amount ELSE 0 END`)), 'totalExpenses'],
      ],
      where: { userId },
      raw: true,
    });

    if (!summary) {
      return res.status(404).json({ message: 'No transactions found for this user.' });
    }

    return res.status(200).json(summary);
  } catch (error) {
    console.error(`getTransactionSummaryByUserId - ${error}`);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function createTransaction(req: Request, res: Response) {
  const db = req.app.get('db');
  const { userId, amount, description } = req.body;

  if (!userId || !amount || !description) {
    return res.status(400).json({ message: 'User ID, amount, and description are required.' });
  }

  try {
    const newTransaction = await db.Transactions.create({
      userId,
      amount,
      description,
    });

    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error(`createTransaction - ${error}`);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  const db = req.app.get('db');
  const transactionId = req.params.id;

  try {
    const transaction = await db.Transactions.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    await transaction.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(`deleteTransaction - ${error}`);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
