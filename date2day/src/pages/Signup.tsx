import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    GoogleAuthProvider,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { auth } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const provider = new GoogleAuthProvider();
    const [emailSignup, setEmailSignup] = useState<string>("");
    const [passwordSignUp, setPasswordSignup] = useState<string>("");
    const [confirmPasswordSignup, setConfirmPasswordSignup] =
        useState<string>("");

    const nav = useNavigate();

    const handleLoginGoogle = async () => {
        try {
            // await setPersistence(auth, browserLocalPersistence); // 👈 force localStorage

            const result = await signInWithPopup(auth, provider);

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            console.log("User logged in:", user);
            nav("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Signup for an account</CardTitle>
                    <CardDescription>
                        Enter your email below to sign up for an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) =>
                                        setEmailSignup(e.currentTarget.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={(e) =>
                                        setPasswordSignup(e.currentTarget.value)
                                    }
                                    required
                                />
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        Repeat Password
                                    </Label>
                                </div>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    onChange={(e) =>
                                        setConfirmPasswordSignup(
                                            e.currentTarget.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        type="submit"
                        className="w-full bg-white text-black"
                    >
                        Signup
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleLoginGoogle}
                    >
                        <FcGoogle size={24} /> Signup with Google
                    </Button>
                    <div id="signUpIdError" className="text-red-400"></div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;
