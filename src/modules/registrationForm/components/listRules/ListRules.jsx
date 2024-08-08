export const ListRules = ({ listRiles, field }) => {
    return (
        <div className='flex flex-col'>
            <p>{ field } может содержать: </p>
            <ul>
                {listRiles.map(rule => (
                    <li key={rule}>✔ {rule}</li>
                ))}
            </ul>
        </div>
    );
}

