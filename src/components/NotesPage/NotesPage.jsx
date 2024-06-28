import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import ButtonAppBar from "../ButtonAppBar/ButtonAppBar.jsx";
import { useEffect, useState } from 'react';



function NotesPage() {
    
    const dispatch = useDispatch();
    const noteItems = useSelector((store)=>store.notesReducer)
    const [note, setNote] = useState('');
    const userId = useSelector(state => state.user.id); 

  
  useEffect(()=> {
    if (userId) {
        dispatch({ type: 'FETCH_NOTE', payload: { userId } })
    }
  }, []);
  
  
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission 
    
    dispatch({ type: 'ADD_NOTE', payload: {openpos_id: userId, note } })
  
    // Clear input
    setNote('');
  }
  
  
    return (
      <div className="container">
        <h2>Notes:</h2>
  
        <form onSubmit={handleSubmit}> 
          <input 
            type='text'
            placeholder='Add Note'
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
  

  
          <button type='submit'>Submit</button>
        </form>
        <p>All of the available notes can be seen here.</p>
        
          {noteItems.map((item)=>(
            <li key={item.id}>{item.note}<button type="edit">Edit</button><button type="delete">Delete</button></li>
            
          )
          )}
  
        
  
      </div>
    );
  }

export default NotesPage;