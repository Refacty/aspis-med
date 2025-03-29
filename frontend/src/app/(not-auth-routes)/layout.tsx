// (not-auth-routes)/layout.tsx
import React, { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

export default function NotAuthLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Toaster />
            <main>{children}</main>
        </div>
    )
}
