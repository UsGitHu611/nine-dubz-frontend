
export const Input = ({ type, name, prefix, postfix, onChange }) => {

    return (
        <div className='relative flex items-center gap-2 bg-gray-600/50 p-3 rounded'>
            <span className='empty:hidden'>{prefix}</span>
            <input
                className='w-full outline-none rounded-md bg-transparent text-gray-200 selection:bg-transparent'
                autoComplete={type === "password" ? "off" : "on"}
                type={type}
                onChange={onChange}
                name={name}/>
            <span className='empty:hidden'>{postfix}</span>
        </div>
    )
}