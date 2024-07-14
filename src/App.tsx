import React from 'react';
import './App.css';

function App() {
  const title = "Expenses Summary";
  return (
    <div className="App">
      <div className="content"></div>
        <h1>{ title }</h1>
        <h2>Enter your business name:</h2>
        <input type="text"/>
        <h2>Enter your year-end date:</h2>
        <input type="text"/>
        <br/>
        <button>Submit</button>
    </div>
  );
}

export default App;
