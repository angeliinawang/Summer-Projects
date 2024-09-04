import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { auth } from "src/firebaseConfig";
import {Label} from "src/components/ui/label";
import {Input} from "src/components/ui/input";
import {Button} from "src/components/ui/button";

function Login() {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    auth.languageCode = "it";

    const handleLogin = async () => {
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.length > 0) {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/content");
            } else {
                console.log("not registered.")
                navigate("/register");
            }
        } catch (error) {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/content");
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            navigate("/home");
        } catch (error) {

        }
    }

    const switchPage = () => {
        navigate("/register");
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
            <Button className="bg-teal-600 mt-5" onClick={handleLogin}>Enter</Button>
            <h4>or</h4>
            <h2 className="mt-10 scroll-m-20 text-2xl font-semibold">Sign In with Google</h2>
            <Button className="bg-teal-600 mt-5" onClick={handleGoogleLogin}>Sign In</Button>

            <h4 className="text-white underline hover:text-teal-500 mt-1" onClick={switchPage}>Don't have an account? Register here.</h4>

        </div>
)
}

export default Login;