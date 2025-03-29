// app/entrar/page.tsx
"use client"

import LoginForm from "./components/LoginForm"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-4 border rounded">
                <h1 className="text-2xl mb-4 text-center">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}
