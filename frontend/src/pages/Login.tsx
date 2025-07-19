import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const Login = () => {
    return (
        <div className="bg-surface-100 h-screen flex justify-center items-center">
            <div className="w-[400px] bg-surface-50 shadow px-3 py-7 rounded-md">
                <h1 className="heading-primary-lg-semibold mb-7">Login</h1>
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
                    toast("sdffd", {
                        description: 'adsdaasd'
                    })
                }}
                className="w-full">Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Login