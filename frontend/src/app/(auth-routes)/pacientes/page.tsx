"use client"

import PatientForm from "./_components/PatientForm";

function page({ params }: {params: {id:any}} ) {
    const { id } = params;

    return ( 
        <PatientForm/>
     );
}

export default page;