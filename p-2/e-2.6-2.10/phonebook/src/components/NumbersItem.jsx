const NumbersItem = ({ person }) => {
    return (<li key={person.id}>{person.name} {person.phone ? `(${person.phone})` : ''}</li>)
}

export default NumbersItem;