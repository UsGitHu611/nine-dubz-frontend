import React from "react";


const Form = ({ onSubmit, children, styles }) => {
    return (
        <form className={`gap-4 flex flex-col ${styles}`} onSubmit={onSubmit}>
            {children}
        </form>
    )
}


const Item = ({ label, name, children, styles }) => {

    const addPropsToInputs = (children) => {

        return React.Children.map(children, child => {

            if (React.isValidElement(child) ) {
                return React.cloneElement(child, { name });
            }
            return child;
        })
    }

    return (
        <label className={`flex flex-col gap-1 text-gray-200 ${styles}`} htmlFor={label} name={name}>
            <span>{ label }</span>
            {addPropsToInputs(children)}
        </label>
    )
}


const FormComponent = {
    Form, Item
}

export default FormComponent






