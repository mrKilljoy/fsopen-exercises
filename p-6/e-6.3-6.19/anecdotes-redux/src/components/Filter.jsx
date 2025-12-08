import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux';

const Filter = () => {
    const dispatch = useDispatch();
    const componentStyle = {
        marginBottom: 10
    };

    const filterAnecdotes = (e) => {
        const filterValue = e.target.value;
        console.log('filter', filterValue)
        dispatch(setFilter(filterValue));
    };

    return (
        <div style={componentStyle}>
            <span>Filter</span>
            <input type="text" name="filterr" onChange={filterAnecdotes} />
        </div>
    );
};

export default Filter;