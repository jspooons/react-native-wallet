import express from 'express';
import {
  getTransactionsByUserId,
  getTransactionSummaryByUserId,
  createTransaction,
  deleteTransaction,
} from '../controllers/transactionsController';

const router = express.Router();

router.get('/:userId', getTransactionsByUserId);
router.get('/summary/:userId', getTransactionSummaryByUserId);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);

export default router;
