import React from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'src/index.css';

import Welcome from "src/components/auth/welcome";
import Login from "src/components/auth/log-in";
import Register from "src/components/auth/register";
import Home from "src/components/auth/home";
import Content from "src/components/auth/content";

// shadcn imports
import { Button } from "src/components/ui/button";
import { useToast } from "src/components/ui/use-toast";

interface Item {
  category: string;
  amount: string;
}


function addCommas(num : Number) {
  const numString = String(num);
  let empty = "";
  let count = 0;
  for (let i = numString.length - 1; i >= 0; i--) {
    empty = numString[i] + empty;
    count++;
    if (numString[i] === '.' || numString[i - 1] === '.' || numString[i - 2] === '.') {
      count = 0;
    }
    if (count === 3 && i !== 0) {
      empty = ',' + empty;
      count = 0;
    }
  }

  return empty;
}

function App() {
  const title = "Expenses Summary";
  return(
    <Router>
      <div className="App">
        <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10">
          {title}
        </h1>
        <div className="log-in text-center grid w-full max-w-sm mx-auto gap-1.5 items-center justify-items-center">
          <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/content" element={<Content />}/>
          </Routes>
        </div>

      </div>
      </Router>
  );
}

export default App;
