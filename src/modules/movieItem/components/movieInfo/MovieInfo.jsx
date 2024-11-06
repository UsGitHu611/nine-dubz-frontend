export const MovieInfo = ({ movieName, userName }) => {
    return (
        <div>
            <h2 title={movieName} className='text-gray-200 truncate ...'>{movieName}</h2>
            <p className='text-gray-200'>{userName}</p>
        </div>
    )
}