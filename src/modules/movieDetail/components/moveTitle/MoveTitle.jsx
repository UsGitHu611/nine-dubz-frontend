export const MoveTitle = ({ name }) => {
    return (
        <h2
            title={name}
            className='text-gray-200 font-medium text-3xl md-mobile:text-2xl truncate ...'>
            {name}
        </h2>
    )
}