import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import logo from "@/assets/svgs/logo.svg"

const Login = () => {
    return (
        <div className="bg-surface-100 h-screen flex justify-center items-center">
            <div className="w-[400px] bg-surface-50 shadow-2xl border border-border-200 px-3 py-7 rounded-md">
                <div className="flex justify-center">
                    <img src={logo} className="w-[150px]" alt="Logo" />
                </div>
                {/* <h1 className="heading-primary-lg-semibold mb-7">Login</h1> */}
                <div className="space-y-3.5">
                <Input 
                    label="Username"
                    placeholder="Enter your username"
                />
                <Input 
                    label="Password"
                    placeholder="Enter your password"
                />
                <Button 
                onClick={() => {
                    toast.error("This is message")
                    toast.success("This is error message")
                }}
                className="w-full">Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Login