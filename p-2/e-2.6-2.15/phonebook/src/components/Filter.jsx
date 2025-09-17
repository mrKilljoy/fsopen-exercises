const Filter = ({filter, handleFilter}) => {
  return <div>
    <h2>Filter items</h2>
    by name: <input value={filter} onChange={handleFilter} />
  </div>
}

export default Filter;