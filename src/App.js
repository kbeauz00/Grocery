import React, { useState } from 'react'
function App() {
  // add fruits Hooks
  const [item, setItem] = useState('')
  const [items, setItems] = useState([])
  //errors Hooks
  const [error, setError] = useState('')
  //Edits Hooks
  const [editing, setEditing] = useState(false)
  const [itemEditing, setItemEditing] = useState('')

  const [currentItem, setCurrentItem] = useState({})

  // target the input value
  function handleChange(e) {
    return setItem(e.target.value)
  }
  //target the edit input value

  function handleEditChange(e) {
    return setItemEditing(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    //what functionality do i want when i click on add fruits
    // 1- unique id generator 2- add item to the list of items
    //if item is empty then don't add it to the list
    const exists =
      items.filter((i) => {
        return i.text === item
      }).length > 0
    if (item && !exists) {
      setError('')
      const newItem = {
        id: new Date().getTime(), // unique time every time we run the function
        text: item,
        completed: false,
      }
      setItems([...items].concat(newItem))
    } else {
      setError('You must enter a fruit or Check if it already exist!')
    }

    setItem('') // to keep the input empty after adding an item
  }

  const deleteItem = (id) => {
    const updateItems = items.filter((item) => item.id !== id)
    setItems(updateItems)
  }
  const toggleComplete = (id) => {
    const updateItems = [...items].map((item) => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    })
    setItems(updateItems)
  }

  const editItem = (item) => {
    // const updateItems = [...items].map((i) => {
    //   if (i.id === item.id) {
    //     i.text = item.text
    //   }
    //   return i
    // })
    setCurrentItem(item)
    setItem(item.text)
    //setItems(updateItem)
  }
  function saveItem(txt) {
    const updateItems = [...items].map((i) => {
      if (i.id === currentItem.id) {
        i.text = txt
      }
      return i
    })
    setItems([...updateItems])
  }
  return (
    <section>
      <h1>My Groceries</h1>
      <form className='h2' onSubmit={handleSubmit}>
        <label htmlFor=''>Fruits: </label>
        <input
          type='text'
          onChange={handleChange}
          placeholder='Enter Fruit'
          value={item}
        />
        <p>{error}</p>
        <button type='submit'>Add Fruits</button>
        <button type='button' name='updateBtn' onClick={() => saveItem(item)}>
          Update
        </button>
      </form>
      <hr />
      <br />
      <ol>
        {items.map((item) => {
          return (
            <>
              <li key={item.id}>
                {item.completed ? (
                  <del>{item.text}</del>
                ) : (
                  <span>{item.text}</span>
                )}

                <input
                  type='checkBox'
                  name=''
                  id=''
                  onChange={() => toggleComplete(item.id)}
                  checked={item.completed}
                />

                <br />
                <button onClick={() => editItem(item)}>Edit Fruits</button>
                <button onClick={() => deleteItem(item.id)}>x</button>
              </li>
            </>
          )
        })}
      </ol>
    </section>
  )
}

export default App
