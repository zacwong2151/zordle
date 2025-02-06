import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState<string>("")

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center">
            <div className="w-full max-w-md p-6 relative">
                <button
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                    onClick={() => navigate("/")}
                >
                    <X className="h-8 w-8" />
                </button>
                <div className="flex flex-col items-center text-center">
                    <img
                        src="/zordle-icon-thick-border.png"
                        alt="Wordle Logo"
                        className="h-16 w-16 mt-8 mb-4"
                    />
                    <h2 className="text-2xl font-bold tracking-tight">Wordle</h2>
                    <p className="text-xl my-4">
                        Sign up to access the
                        <br />
                        premium features!
                    </p>

                    <div className="w-full text-left">
                        <Label
                            htmlFor="email"
                            className="text-base"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailRef}
                            className="mt-1"
                        />
                    </div>

                    <Button 
                        className="w-full text-base font-normal my-4 bg-black text-white hover:bg-gray-800" 
                        size="lg"
                        onClick={() => console.log('send the email to userService')}
                    >
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    )
}

