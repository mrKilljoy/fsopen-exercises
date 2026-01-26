import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // ...

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    if (response?.status === 201) {
      const newItem = response.data;
      setResources(resources.concat(newItem));
    } else {
      console.log(`failed to create new resource (${response?.status})`)
    }
  };

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    if (response?.status === 200) {
      setResources(response.data);
    } else {
      console.error('Failed to fetch resources', `$url = '${baseUrl}'`);
    }
  };

  const service = {
    create,
    getAll
  };

  useEffect(() => {
    getAll().then((result) => {
      console.log('effected')
    });
  }, []);

  return [
    resources, service
  ];
};

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (event) => {
    console.log('new note form event')
    event.preventDefault();
    noteService.create({ content: content.value });
  };
 
  const handlePersonSubmit = (event) => {
    console.log('new person form event')
    event.preventDefault();
    personService.create({ name: name.value, number: number.value});
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  );
};

export default App;