import NumbersItem from './NumbersItem';

const Numbers = ({persons}) => {
    return (
        <>
            {persons ?
                <ul>
                    {persons.map(x => <NumbersItem key={x.id} person={x} />)}
                </ul> :
                '...'}
        </>
    );
}

export default Numbers;