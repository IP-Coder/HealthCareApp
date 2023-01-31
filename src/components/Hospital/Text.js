import React, { useState } from 'react';

const Text = () => {
    const [checkboxes, setCheckboxes] = useState({});

    const handleCheckboxChange = (event) => {
        setCheckboxes({
            ...checkboxes,
            [event.target.name]: event.target.checked
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Send an HTTP request to the backend to save the data
        fetch('http://localhost:4000/api/patient/save-checkboxes', {
            method: 'POST',
            body: JSON.stringify(checkboxes)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="checkbox" name="checkbox1" onChange={handleCheckboxChange} />
            <input type="checkbox" name="checkbox2" onChange={handleCheckboxChange} />
            <input type="checkbox" name="checkbox3" onChange={handleCheckboxChange} />
            <button type="submit">Save</button>
        </form>
    );
}

export default Text;






