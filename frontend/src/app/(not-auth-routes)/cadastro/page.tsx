"use client"
import RegisterForm from "./components/RegisterForm";

function page() {

    if (typeof window === 'undefined') return null

    return ( 
        <RegisterForm/>
    );
}

export default page;