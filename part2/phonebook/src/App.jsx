import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {id: 1, name: 'Arto Hellas', number: '43-432434'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))

    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.id}>{person.name} {person.number}</p>
        ))}
      </div>
    </div>
  )
}

export default App