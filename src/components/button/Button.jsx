export const Button = ({ children, onClick, type, icon, iconPosition = "end", styles }) => {
    const positionIcon = {
        start : "flex-row-reverse",
        end: "flex-row"
    };

    return (
        <button className={`bg-gray-600/50 text-gray-200 flex gap-1 items-center justify-center 
                rounded-full hover:bg-gray-600 transition duration-300 
                ${positionIcon[iconPosition]} ${styles}`}
                type={type} onClick={onClick}>
            { children }
            <span className='flex justify-center items-center empty:hidden'>{ icon }</span>
        </button>
    )
}