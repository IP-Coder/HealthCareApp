import * as React from 'react';

export default function DescriptionAlerts(props) {
    return (
        props.alert && <div className={`fixed-top mt-2 alert alert-${props.alert.type}`} role="alert">
            {props.alert.msg}
        </div>
    );
} 