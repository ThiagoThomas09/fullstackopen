import { useEffect, useState } from 'react'
import nameService from './services/names'

const Filter = ({searchName, handleSearchName}) => {
  return (
    <div>
      filter shown with: <input value={searchName} onChange={handleSearchName} />
    </div>
  )
}

const PersonForm = ({newName, newNumber, handleNewName, handleNewNumber, addName}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName}
        onChange={handleNewName}/>
      </div>
      <div>
        number: <input value={newNumber}
        onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    nameService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  

  const addName = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = { 
      name: newName,
      number: newNumber
    }
    nameService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert('Error trying to add the new person', error);
      })
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)

    if (confirmDelete) {
      nameService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert('Error trying to delete the person', error)
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addName={addName}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App