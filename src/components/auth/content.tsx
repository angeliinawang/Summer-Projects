import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

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

function Content() {
    const [companyName, setName] = useLocalStorage<string>("name", "");
    const [date, setDate] = useLocalStorage<string>("date", "");
    const [displayString, setDisplayString] = useLocalStorage<string>("displayString", "");
    const [desc, setDesc] = useLocalStorage<string>("description", "");
    const [entry, setEntry] = useLocalStorage("entry",false);
    const [category, setCategory] = useLocalStorage("category", "");
    let [amount, setAmount] = useLocalStorage("amount", "");

    //store entries in map database
    const [categoryList, setCategoryList] = useLocalStorage<Item[]>("categoryList", []);
    const [summary, setSummary] = useLocalStorage("summary", false);
    const [showEntry, setShowEntry] = useLocalStorage("showEntry", true);
    let [itemTotal, setItemTotal] = useLocalStorage("itemTotal", 0);

    const navigate = useNavigate();

    const handleClick = () => {
        // connect to home screen
        const newSummary = `Summary for ${companyName} on ${date}`;
        const existingSummaries = JSON.parse(localStorage.getItem("summaries") || "[]");
        const updatedSummaries = [...existingSummaries, {name: companyName, date, summary: newSummary}];
        localStorage.setItem("summaries", JSON.stringify(updatedSummaries));

        setName("");
        setDisplayString(`Expense Summary for ${companyName} as of ${date}`);
        setDesc('Please enter the amount of expenses per category in $$$.');
        setEntry(true);
        setSummary(true);
        setShowEntry(false);
    }

    useEffect(() => {
        const currentSummary = JSON.parse(localStorage.getItem("currentSummary") || "{}");
        if (currentSummary.name) {
            setName(currentSummary.name);
            setDate(currentSummary.date);
            setDisplayString(currentSummary.summary);
            setSummary(true);
            setEntry(true);
            // setShowEntry(false);
        }
    }, []);

    const { toast } = useToast();

    const createRow = () => {
        if (category === "" || amount === "") {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "Please ensure you enter both a valid category and alert.",
                className: "bg-gray-800"
            });
        } else {
            const roundedAmount = Math.round(Number(amount) * 100) / 100;
            amount = String(roundedAmount);

            setCategoryList([...categoryList, {category, amount}]);
            setCategory("");
            setAmount("");

            itemTotal += Number(amount);
            setItemTotal(itemTotal);
        }
    }

    const removeRow = (index: number) => {
        const updatedList = categoryList.filter((_, i) => i !== index);
        setCategoryList(updatedList);

        const amountRemoved = Number(categoryList[index].amount);

        itemTotal -= amountRemoved;
        setItemTotal(itemTotal);
    }

    const clearEntries = () => {
        setCategoryList([]);
        setItemTotal(0);
    }

    const greater_than_1000 = (num: number) => {
        if (num > 1000) {
            return addCommas(num);
        }
        return num;
    }

    const goHome = () => {
        navigate("/home");
    }

    return (
        <div className="content">
            <Button className="bg-teal-600 mt-3" onClick={goHome}>Back to Home</Button>
            {showEntry && (
                <div className="text-center grid w-full max-w-sm mx-auto gap-1.5 items-center justify-items-center">
                    <Label className="mt-5">Enter your business name:</Label>
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
                                        e.preventDefault();
                                        removeRow(index);
                                    }}>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell
                                            className="text-right">${greater_than_1000(Number(item.amount))}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="bg-zinc-800">
                                    <TableCell className="text-teal-500">Total</TableCell>
                                    <TableCell
                                        className="text-right text-teal-500">${greater_than_1000(itemTotal)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <div className="flex justify-center mt-5">
                            <Button className="bg-teal-600" onClick={clearEntries}>Clear All Entries</Button>
                        </div>
                    </div>
                )}
            </div>

            <Toaster/>

        </div>
    )

}

export default Content;