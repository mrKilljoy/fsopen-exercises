const NewPersonForm = ({ newName, handleNewName, newPhone, handleNewPhone, handleAdd }) => {
    return (
        <form>
            <h2>Add a new item</h2>
            <div>
                name: <input value={newName} onChange={handleNewName} />
            </div>
            <div>
                phone: <input value={newPhone} type='tel' onChange={handleNewPhone} />
            </div>
            <div>
                <button type="submit" onClick={handleAdd}>add</button>
            </div>
        </form>
    )
}

export default NewPersonForm;