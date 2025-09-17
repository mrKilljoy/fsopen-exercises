const NumbersItem = ({ person, onDelete }) => {
    const personId = person.id;
    return (<>
        <li key={person.id}>{person.name} {person.phone ? `(${person.phone})` : ''}</li>
        <button onClick={() => onDelete(personId)}>Delete</button>
    </>)
}

export default NumbersItem;