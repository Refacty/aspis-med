"use client"

import React, { useEffect } from "react";
import AppointmentTypeForm from "../_components/AppointmentTypeForm";

function Page({ params }: { params: Promise<{ id: string }> }) {

    return <AppointmentTypeForm obj={Number(React.use(params).id)} />;
}

export default Page;
