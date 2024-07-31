import React from 'react';
import { useState } from 'react';
import './App.css';
import Summary from './Summary';

interface Item {
  category: string;
  amount: number;
}

function App() {
  const title = "Expenses Summary";
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [displayString, setDisplayString] = useState<string>("");
  const [desc, setDesc] = useState<string>('');
  const [entry, setEntry] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [categoryList, setCategoryList] = useState<Item[]>([]);

  const [summary, setSummary] = useState(false);

  const handleClick = () => {
    setName("");
    setDisplayString(`Expense Summary for ${name} as of ${date}`);

    setDesc('Please enter the amount of expenses per category in $$$.');
    setEntry(true);
    setSummary(true);
  }

  const createRow = () => {
    setCategoryList([...categoryList, {category, amount} ]);
    setCategory("");
    setAmount(0);
  }

  return (
      <div className="App">
        <div className="content">
          <h1>{title}</h1>
          <h2>Enter your business name:</h2>
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}/>
          <h2>Enter your year-end date:</h2>
          <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}/>
          <br/>
          <button onClick={handleClick}>Submit</button>
        </div>
        <div className="name-display">
          <h1>{displayString}</h1>
        </div>
        <div className="expenses">
          <h2>{desc}</h2>
          {entry && (
              <>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Expense Category"/>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Amount Spent in USD$"/>
                <button onClick={createRow}>Add Entry
                </button>

                <h1 id="transaction-title">Transaction Details</h1>
                <table className="expenses-table">
                  <thead>
                  <tr>
                    <td>Expense Category</td>
                    <td>Expense Amount</td>
                  </tr>
                  </thead>
                  <tbody>
                  {categoryList.map(item => (
                      <tr>
                        <td>{item.category}</td>
                        <td>${item.amount}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </>
          )}
        </div>

        <div>{summary && <Summary></Summary>}</div>
      </div>
  );
}

export default App;
