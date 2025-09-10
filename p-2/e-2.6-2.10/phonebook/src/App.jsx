import { useState } from 'react'
import Filter from './components/Filter';
import NewPersonForm from './components/NewPersonForm';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Bames Jond', phone: '007-123456' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const personsFiltered = filter ?
    persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())) :
    persons;

  const handleNewName = (e) => {
    setNewName(e.target.value);
  }

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value);
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  const handleAdd = (e) => {
    e.preventDefault();

    if (!persons.find(x => x.name === newName)) {
      setPersons(persons.concat({ id: persons.length + 1, name: newName, phone: newPhone }));
    } else {
      alert('This name already exists in the phonebook');
    }

    setNewName('');
    setNewPhone('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <NewPersonForm
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
        handleAdd={handleAdd}
      />
      <h2>Numbers</h2>
      <Numbers persons={personsFiltered} />
    </div>
  )
}

export default App


