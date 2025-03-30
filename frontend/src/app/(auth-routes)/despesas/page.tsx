"use client"
import ExpenseForm from "./components/ExpenseForm";

function page({ params }: {params: {id:any}} ) {
    const { id } = params;

    return ( 
        <ExpenseForm/>
     );
}

export default page;