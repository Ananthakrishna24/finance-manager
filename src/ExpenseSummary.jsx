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