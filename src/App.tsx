import React from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from 'react';
import 'src/App.css';
import Summary from 'src/Summary';

interface Item {
  category: string;
  amount: number;
}

function App() {
  const title = "Expenses Summary";
  const [name, setName] = useLocalStorage<string>("name", "");
  const [date, setDate] = useLocalStorage<string>("date", "");
  const [displayString, setDisplayString] = useLocalStorage<string>("displayString", "");
  const [desc, setDesc] = useLocalStorage<string>("description", "");
  const [entry, setEntry] = useLocalStorage("entry",false);
  const [category, setCategory] = useLocalStorage("category", "");
  const [amount, setAmount] = useLocalStorage("amount", 0);

  //store entries in map database
  const [categoryList, setCategoryList] = useLocalStorage<Item[]>("categoryList", []);

  const [summary, setSummary] = useLocalStorage("summary", false);

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
