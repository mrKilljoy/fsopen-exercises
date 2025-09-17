import NumbersItem from './NumbersItem';

const Numbers = ({persons, onDelete}) => {
    return (
        <>
            {persons ?
                <ul>
                    {persons.map(x => <NumbersItem key={x.id} person={x} onDelete={onDelete} />)}
                </ul> :
                '...'}
        </>
    );
}

export default Numbers;