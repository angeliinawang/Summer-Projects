import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "src/components/ui/button";

function Welcome() {
    const navigate = useNavigate();

    const switchPage = () => {
        navigate("/login");
    }

    return (
        <div className="text-center">
            <h1 className="text-center scroll-m-20 text-4xl font-extrabold lg:text-5xl mt-10">
                Welcome to the The Summary Platform.</h1>
            <h2 className="mt-20 scroll-m-20 text-2xl font-semibold">
                The ultimate platform for summarizing your business expenses.</h2>
            <Button className="bg-teal-600 mt-20" onClick={switchPage}>Enter</Button>
        </div>
    )
}

export default Welcome;