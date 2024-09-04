import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "src/components/ui/table";

interface Summary {
    name: string;
    date: string;
    summary: string;
}

function Home() {
    const navigate = useNavigate();
    const [summaries, setSummaries] = useLocalStorage<Summary[]>("containers", []);

    useEffect(() => {
        const storedSummaries = JSON.parse(localStorage.getItem("containers") || "[]");
        setSummaries(storedSummaries);
    }, []);

    const handleClick = () => {
        navigate("/content");
    }

    const viewSummary = (summary: Summary) => {
        localStorage.setItem("currentSummary", JSON.stringify(summary));
        navigate("/content");
    }

    return (
        <div id="home">
            <h2 className="mt-3 mb-3">Welcome back user!</h2>
            <Button className="bg-teal-600" onClick={handleClick}>Create New Summary</Button>
            <div id="summary-list">
                <h2 className="text-xl mt-5">Your Summaries</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Business Name</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {summaries.map((summary) => (
                            <TableRow onClick={() => {
                                viewSummary(summary);
                            }}>
                                <TableCell>{summary.name}</TableCell>
                                <TableCell>{summary.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Home;