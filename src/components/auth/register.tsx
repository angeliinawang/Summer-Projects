import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

// firebase imports
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "src/firebaseConfig";

// shadcn imports
import {Label} from "src/components/ui/label";
import {Input} from "src/components/ui/input";
import {Button} from "src/components/ui/button";

const provider = new GoogleAuthProvider();
auth.languageCode = "it";

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useLocalStorage<string>("email", "");
    const [password, setPassword] = useLocalStorage<string>("password", "");
    const [fname, setFname] = useLocalStorage<string>("fname", "");
    const [lname, setLname] = useLocalStorage<string>("lname", "");

    const handleRegister = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            navigate("/home");
        } catch (error) {

        }
    }

    const handleClick = async () => {
        navigate("/home");
        await handleRegister(email, password);
    }

    return (
        <div id="register">
            <h2 className="mt-10 scroll-m-20 text-2xl font-semibold">Register for an Account</h2>
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
            <Label className="mt-5">First Name</Label>
            <Input
                className="text-slate-950"
                type="name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
            />
            <Label className="mt-5">Last Name</Label>
            <Input
                className="text-slate-950"
                type="name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
            />
            <Button className="bg-teal-600 mt-5" onClick={handleClick}>Enter</Button>
            <div className="google mt-10">
                <h2 className="mt-10 scroll-m-20 text-2xl font-semibold">Sign In with Google</h2>
                <Button className="bg-teal-500 mt-5" onClick={handleGoogleSignIn}>Enter</Button>
            </div>
        </div>
    )
}

export default Register;