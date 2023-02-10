import React from 'react'


const HPateint = () => {
    return (
        <>

            <section class=" ">
                <div class="bg-primary text-center">
                    <h1 class="fs-3 c-white">Patient</h1>
                </div>
                <div class="bg-white">

                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true"
                        class="scrollspy-example scroller" tabindex="0">
                        <ol class="list-group list-group-numbered">

                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                <a href="patientdetail.php?patient_id=' . $name . '" className="ms-2 me-auto">
                                    <div className="fw-bold">' . $name . '</div>
                                    <div className="">' . $email . '</div>
                                    <div className="">' . $phone . '</div>
                                </a>
                                <a href="#" className="mt-5 badge bg-primary rounded-pill">edit</a>
                            </li>



                        </ol>
                    </div>
                </div>
            </section>

        </>
    )
}

export default HPateint
