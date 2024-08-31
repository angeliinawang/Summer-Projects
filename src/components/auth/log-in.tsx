import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import {Label} from "src/components/ui/label";
import {Input} from "src/components/ui/input";
import {Button} from "src/components/ui/button";

function Login() {
    const navigate = useNavigate();

    const switchPage = () => {
        navigate("/register");
    }

    const LoggedIn = () => {
        navigate("/content");
    }

    const [email, setEmail] = useLocalStorage<string>("email", "");
    const [password, setPassword] = useLocalStorage<string>("password", "");

    return (
        <div className="login">
            <h2 className="mt-10 scroll-m-20 text-2xl font-semibold">Sign In with Email</h2>
                <Label className="mt-5">Email</Label>
                <Input
                    className="text-slate-950"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Label className="mt-5">Password</Label>
                <Input
                    className="text-slate-950"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            <h4>or</h4>
            <h2 className="mt-10 scroll-m-20 text-2xl font-semibold">Sign In with Google</h2>
            <Button className="bg-teal-600 mt-5" onClick={LoggedIn}>Enter</Button>
            <h4 className="text-white underline hover:text-teal-500 mt-1" onClick={switchPage}>Don't have an account? Register here.</h4>

        </div>
)
}

export default Login;