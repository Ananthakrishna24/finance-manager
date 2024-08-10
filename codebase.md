# vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

# tailwind.config.js

```js
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [];
```

# postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

# package.json

```json
{
  "name": "finance-manager",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/forms": "^0.5.7",
    "autoprefixer": "^10.4.20",
    "framer-motion": "^11.3.24",
    "notistack": "^3.0.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-modal": "^3.16.1",
    "recharts": "^2.12.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.8.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^9.8.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "vite": "^5.4.0"
  }
}

```

# index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

# eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['dist'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

```

# README.md

```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```

# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# src/main.jsx

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

# src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# src/WalletBalance.jsx

```jsx
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
```

# src/ExpenseSummary.jsx

```jsx
import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const getRandomColor = () => {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
};

const ExpenseSummary = ({ expenses }) => {
  const summarizeExpenses = () => {
    const summary = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});
    return Object.entries(summary).map(([category, total]) => ({ category, total }));
  };

  const summarizeExpensesByDate = () => {
    const summary = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});
    return Object.entries(summary).map(([date, total]) => ({ date, total }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Expense Summary</h2>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-2">By Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={summarizeExpenses()}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {summarizeExpenses().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getRandomColor()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-2">Expense Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summarizeExpensesByDate()}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
```

# src/ExpenseList.jsx

```jsx
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
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
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
              className="bg-gray-800 p-4 rounded-lg mb-4 shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="bg-gray-700 p-3 rounded-full mr-4">
                  <Icon className="text-xl text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{expense.title}</h3>
                  <p className="text-gray-400">{expense.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold mr-4">₹{expense.amount}</span>
                <button
                  onClick={() => onDelete(expense)}
                  className="text-red-400 hover:text-red-600 transition duration-300"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseList;
```

# src/ExpenseForm.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const ExpenseForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add Expense</h2>
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <FaTimes size={24} />
        </button>
      </div>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Price"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Travel">Travel</option>
      </select>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-end space-x-2">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Expense
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ExpenseForm;
```

# src/App.jsx

```jsx
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
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
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Total Expenses</h2>
          <p className="text-3xl font-bold text-red-400">₹{totalExpenses.toFixed(2)}</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
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
```

# src/App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

# public/vite.svg

This is a file of the type: SVG Image

# src/assets/react.svg

This is a file of the type: SVG Image

