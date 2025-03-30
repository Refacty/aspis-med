"use client"

import AppointmentTypeForm from "./_components/AppointmentTypeForm";

function page({ params }: {params: {id:any}} ) {
    const { id } = params;

    return ( 
        <AppointmentTypeForm/>
     );
}

export default page;