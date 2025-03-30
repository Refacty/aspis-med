"use client"

import React, { useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";

function Page({ params }: { params: Promise<{ id: string }> }) {

    return <ExpenseForm id={Number(React.use(params).id)} />;
}

export default Page;
