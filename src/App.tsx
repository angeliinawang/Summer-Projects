import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const title = "Expenses Summary";
  const [desc, setDesc] = useState<string>('');
  const [table, setTable] = useState(false);

  const expenseValues = ["Advertising", ""]

  const handleClick = () => {
    setDesc('Please enter the amount of expenses per category in $$$.');
    setTable(true);
  }

  return (
      <div className="App">
        <div className="content">
          <h1>{title}</h1>
          <h2>Enter your business name:</h2>
          <input type="text"/>
          <h2>Enter your year-end date:</h2>
          <input type="text"/>
          <br/>
          <button onClick={handleClick}>Submit</button>
      </div>
        <div className="expenses">
          <h2>{ desc }</h2>
          {table && (
              <table>
                <tr>
                  <th>Expense Name</th>
                  <th>Amount</th>
                </tr>
                <tr>
                  <td>Advertising</td>
                  <td><input id="advertising"/></td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </table>
          )

          }
        </div>
      </div>
  );
}

export default App;
