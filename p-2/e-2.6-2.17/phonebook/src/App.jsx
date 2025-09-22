import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import NewPersonForm from './components/NewPersonForm';
import Numbers from './components/Numbers';
import Notification from './components/Notification';
import personsManager from './services/personsManager';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Bames Jond', phone: '007-123456' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
      const updated = { name: newName, phone: newPhone };
      personsManager.addPerson(updated)
        .then(r => {
          setPersons(persons.concat(r));
          console.log('person added to server');
          showMessage('person added to server')
        })
        .catch(err => {
          console.error("couldn't add person to server", err);
          showError("couldn't add person to server");
        });
    } else {
      const upd = confirm('Do you want to update phone number for this person?');
      if (!upd)
        return;

      const target = persons.find(x => x.name === newName);
      personsManager.updatePerson(target.id, { ...target, phone: newPhone })
        .then(() => {
          console.log('person updated on server');
          showMessage('person updated on server');
        });
      setPersons(persons.map(x => x.id !== target.id ? x : { ...x, phone: newPhone }));
    }

    setNewName('');
    setNewPhone('');
  }

  const initializePersons = () => {
    personsManager.getAll()
      .then(r => {
        setPersons(r);
        console.log('list of persons initialized');
      })
      .catch(err => {
        console.error("couldn't get persons from server", err);
        showError("couldn't get persons from server");
      });
  }

  const handleDelete = (id) => {
    if (!id)
      return;

    const del = window.confirm("Are you sure you want to delete this person?");
    if (!del)
      return;

    personsManager.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(x => x.id !== id));
      })
      .catch(err => {
        console.log("couldn't delete person from server", err);
        showError("couldn't delete person from server");
      });
  }

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }
  
  const showError = (err) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  useEffect(initializePersons, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Notification message={error} isError={true} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <NewPersonForm
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
        handleAdd={handleAdd}
      />
      <h2>Numbers</h2>
      <Numbers persons={personsFiltered} onDelete={handleDelete} />
    </div>
  )
}

export default App


