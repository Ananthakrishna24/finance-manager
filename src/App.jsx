import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import WalletBalance from './WalletBalance';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';

const App = () => {
  const [walletBalance, setWalletBalance] = useState(4500);
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const savedWalletBalance = localStorage.getItem('walletBalance');
    const savedExpenses = localStorage.getItem('expenses');
    
    if (savedWalletBalance) setWalletBalance(parseFloat(savedWalletBalance));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem('walletBalance', walletBalance.toString());
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  const handleExpenseSubmit = (expenseData) => {
    const expenseAmount = parseFloat(expenseData.amount);

    if (expenseAmount > walletBalance) {
      enqueueSnackbar('Insufficient wallet balance!', { variant: 'error' });
      return;
    }

    const newExpense = {
      ...expenseData,
      id: Date.now(),
      amount: expenseAmount
    };

    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    setWalletBalance(prevBalance => prevBalance - expenseAmount);
    setIsModalOpen(false);
    enqueueSnackbar('Expense added successfully!', { variant: 'success' });
  };

  const handleIncomeAdd = (amount) => {
    const incomeAmount = parseFloat(amount);
    setWalletBalance(prevBalance => prevBalance + incomeAmount);
    enqueueSnackbar('Income added successfully!', { variant: 'success' });
  };

  const handleExpenseDelete = (expense) => {
    setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== expense.id));
    setWalletBalance(prevBalance => prevBalance + parseFloat(expense.amount));
    enqueueSnackbar('Expense deleted successfully!', { variant: 'success' });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Expense Tracker
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <WalletBalance 
          balance={walletBalance} 
          onIncomeAdd={handleIncomeAdd} 
        />
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Total Expenses</h2>
          <p className="text-3xl font-bold text-red-500">₹{totalExpenses.toFixed(2)}</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            + Add Expense
          </button>
        </motion.div>
        <ExpenseSummary expenses={expenses} />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-md w-full"
            >
              <ExpenseForm onSubmit={handleExpenseSubmit} onCancel={() => setIsModalOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ExpenseList 
        expenses={expenses}
        onDelete={handleExpenseDelete}
      />
    </div>
  );
};

export default App;