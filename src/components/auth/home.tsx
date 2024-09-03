import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";

function Home() {
    const navigate = useNavigate();
    const [containers, setContainers] = useLocalStorage<string[]>("containers", []);

    const handleClick = () => {
        navigate("/content");
    }

    const addContainer = () => {
        setContainers([...containers, "Summary for business name - date"]);
    }

    return (
        <div id="home">
            <h2 className="mt-3 mb-3">Welcome back user!</h2>
            <Button className="bg-teal-600" onClick={handleClick}>Create New Summary</Button>
            <Button className="bg-teal-600" onClick={addContainer}>Test</Button>
            <div id="summary-list">
                {containers.map((container, index) => (
                    <div key={index} className="bg-slate-700">{container}</div>
                ))}
            </div>
        </div>
    )
}

export default Home;