import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaUtensils, FaFilm, FaPlane } from 'react-icons/fa';

const categoryIcons = {
  Food: FaUtensils,
  Entertainment: FaFilm,
  Travel: FaPlane,
};

const ExpenseList = ({ expenses, onDelete }) => {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Transactions</h2>
      <AnimatePresence>
        {expenses.map((expense) => {
          const Icon = categoryIcons[expense.category] || FaUtensils;
          return (
            <motion.div
              key={expense.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <Icon className="text-xl text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{expense.title}</h3>
                  <p className="text-gray-600">{expense.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold mr-4 text-gray-800">₹{expense.amount}</span>
                <button
                  onClick={() => onDelete(expense)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {expenses.length === 0 && (
        <p className="text-gray-600 text-center">No recent transactions.</p>
      )}
    </div>
  );
};

export default ExpenseList;