"use client"

import React, { useEffect } from "react";
import PatientForm from "../_components/PatientForm";

function Page({ params }: { params: Promise<{ id: string }> }) {

    return <PatientForm id={Number(React.use(params).id)} />;
}

export default Page;
