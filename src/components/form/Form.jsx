import React from "react";


const Form = ({ onSubmit, children, styles }) => {
    return (
        <form className={`gap-4 flex flex-col ${styles}`} onSubmit={onSubmit}>
            {children}
        </form>
    )
}


const Item = ({ label, name, children, styles, required=false }) => {

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
            <span className={`self-start relative after:content-['‼'] after:absolute after:-right-3 after:opacity-0 ${required ? 'after:opacity-100' : ''} `}>
                { label } :
            </span>
            {addPropsToInputs(children)}
        </label>
    )
}


const FormComponent = {
    Form, Item
}

export default FormComponent






