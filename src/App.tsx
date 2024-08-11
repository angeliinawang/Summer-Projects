import React from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";
import 'src/index.css';

// shadcn imports
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { Button } from "src/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import { Toaster } from "src/components/ui/toaster";
import { useToast } from "src/components/ui/use-toast";

interface Item {
  category: string;
  amount: string;
}

function App() {
  const title = "Expenses Summary";
  const [companyName, setName] = useLocalStorage<string>("name", "");
  const [date, setDate] = useLocalStorage<string>("date", "");
  const [displayString, setDisplayString] = useLocalStorage<string>("displayString", "");
  const [desc, setDesc] = useLocalStorage<string>("description", "");
  const [entry, setEntry] = useLocalStorage("entry",false);
  const [category, setCategory] = useLocalStorage("category", "");
  const [amount, setAmount] = useLocalStorage("amount", "");

  //store entries in map database
  const [categoryList, setCategoryList] = useLocalStorage<Item[]>("categoryList", []);
  const [summary, setSummary] = useLocalStorage("summary", false);
  const [showEntry, setShowEntry] = useLocalStorage("setEntry", true);
  let [itemTotal, setItemTotal] = useLocalStorage("itemTotal", 0);

  const handleClick = () => {
    setName("");
    setDisplayString(`Expense Summary for ${companyName} as of ${date}`);

    setDesc('Please enter the amount of expenses per category in $$$.');
    setEntry(true);
    setSummary(true);
    setShowEntry(false);
  }

  const { toast } = useToast();

  const createRow = () => {
    if (category === "" || amount === "") {
      console.log("toasties")
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please ensure you enter both a valid category and alert.",
        className: "bg-gray-800"
      });
    } else {
      setCategoryList([...categoryList, {category, amount}]);
      setCategory("");
      setAmount("");

      itemTotal += Number(amount);
      setItemTotal(itemTotal)
    }
  }

  const removeRow = (index: number) => {
    const updatedList = categoryList.filter((_, i) => i !== index);
    setCategoryList(updatedList);

    const amountRemoved = Number(categoryList[index].amount);
    setItemTotal(itemTotal - amountRemoved);
  }

  const clearEntries = () => {
    setCategoryList([]);
    setItemTotal(0);
  }

  return (
      <div className="App">
        <div className="content">
          <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-10">
            {title}
          </h1>
          {showEntry && (
              <div className="text-center grid w-full max-w-sm mx-auto gap-1.5 items-center justify-items-center">
                <Label className="mt-5" htmlFor="email">Enter your business name:</Label>
                <Input
                    className="text-slate-950"
                    type="text"
                    value={companyName}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label className="mt-5" htmlFor="email">Enter your year-end date:</Label>
                <Input
                    className="text-slate-950"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Button className="bg-teal-600" onClick={handleClick}>Submit</Button>
              </div>
          )}

          <br/>

          {entry && (
              <div className="flex flex-col justify-center items-center mx-auto">

                <Label className="mt-5 mb-2">{desc}</Label>
                <form className="form flex align-items-center">
                  <Input
                      className="text-slate-950"
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Expense Category"/>
                  <Input
                      className="text-slate-950 ml-2"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount Spent in USD$"/>
                  <Button className="ml-2 bg-teal-600" type="button" onClick={createRow}>Add Entry
                  </Button>
                </form>

                <div className="mt-20 scroll-m-20 text-2xl font-semibold tracking-tight">
                  <h4>{displayString}</h4>
                </div>

                <h1 className="mt-5 scroll-m-20 text-xl font-semibold tracking-tight">Transaction Details</h1>

              </div>
          )}

          <div className="flex justify-center mx-auto">
            {summary && (
                <div>
                  <Table className="w-full min-w-80 max-w-2xl">
                    <TableCaption>Right-click to remove a row.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryList.map((item, index) => (
                          <TableRow key={index} onContextMenu={(e) => {
                            e.preventDefault(); removeRow(index);}}>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="text-right">${item.amount}</TableCell>
                          </TableRow>
                      ))}
                      <TableRow className="bg-zinc-800">
                        <TableCell className="text-teal-500">Total</TableCell>
                        <TableCell className="text-right text-teal-500">${itemTotal}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                <div className="flex justify-center mt-5">
                  <Button className="bg-teal-600" onClick={clearEntries}>Clear All Entries</Button>
                </div>
              </div>
            )}
          </div>

          <Toaster />

        </div>
      </div>
  );
}

export default App;
