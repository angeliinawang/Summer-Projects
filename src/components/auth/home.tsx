import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/ui/button";

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/content");
    }

    return (
        <div id="home">
            <h2 className="mt-3 mb-3">Welcome back user!</h2>
            <Button className="bg-teal-600" onClick={handleClick}>Create New Summary</Button>
            <div id="summary-list">

            </div>
        </div>
    )
}

export default Home;