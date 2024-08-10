import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaPlus } from 'react-icons/fa';

const WalletBalance = ({ balance, onIncomeAdd }) => {
  const [income, setIncome] = useState('');
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income && !isNaN(income)) {
      onIncomeAdd(income);
      setIncome('');
      setShowIncomeForm(false);
    }
  };

  return (
    <motion.div 
      className="bg-gray-800 p-6 rounded-xl shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        <FaWallet className="text-2xl text-green-400 mr-2" />
        <h2 className="text-2xl font-semibold">Wallet Balance</h2>
      </div>
      <p className="text-3xl font-bold text-green-400 mb-4">₹{balance.toFixed(2)}</p>
      <AnimatePresence mode="wait">
        {!showIncomeForm ? (
          <motion.button
            key="add-income-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowIncomeForm(true)}
            className="flex items-center justify-center w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
          >
            <FaPlus className="mr-2" /> Add Income
          </motion.button>
        ) : (
          <motion.form
            key="income-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="flex flex-col space-y-2"
          >
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter income amount"
              className="border border-gray-300 bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2">
              <button type="submit" className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out">
                Add
              </button>
              <button type="button" onClick={() => setShowIncomeForm(false)} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out">
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WalletBalance;