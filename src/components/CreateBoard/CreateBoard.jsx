import React, { useContext, useState } from 'react'
import "./createboard.css"
import {v4 as uuid} from "uuid"


const initialBoardObject = {
  id: uuid(),
  title: "",
  date: new Date(),
  maxVotes: 10,
  column1: {
      name: "Good features",
      feedbacks: [{ textField: "comment 1",likes:5 }],
  },
  column2: { name: "Improvements", commentsList: [] },
  column3: { name: "Add Features", commentsList: [] },
};

// const 

export function CreateBoard({toggle}) {

  const [boardObject,setBoardObject] = useState(initialBoardObject) 

  const changeHandler = (e) => {
    setBoardObject(boardObj => ({...boardObj,[e.target.name]:e.target.value}))
  }

  const addBoard = () => {
    console.log(boardObject)
  }

  return (
    <div className="createboard-container" onClick={toggle}>
        <div className="createboard-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="createboard-title">Create Dashboard</div>
            <div className="createboard-input-wrapper">
              <label htmlFor="" className="createboard-input-label">Title</label>
              <input name="title" onChange={changeHandler} type="text" className="createboard-input" />
            </div>
            <div className="createboard-input-wrapper">
              <label htmlFor="" className="createboard-input-label">Max votes</label>
              <input name="maxVotes" onChange={changeHandler} type="number" className="createboard-input" />
            </div>
            <span className='createboard-input-label'>Review Columns</span>
            <div className="createboard-input-wrapper">
              <input name="column1" onChange={changeHandler} type="text" className="createboard-input" placeholder='Enter column name: (default: Good features)'/>
            </div>
            <div className="createboard-input-wrapper">
              <input name="column2" onChange={changeHandler} type="text" className="createboard-input" placeholder='Enter column name: (default: Improvements)'/>
            </div>
            <div className="createboard-input-wrapper">
              <input name="column3" onChange={changeHandler} type="text" className="createboard-input" placeholder='Enter column name: (default: Add features or Changes)'/>
            </div>
            <div className="createboard-cta">

            <button className="btn primary-btn-md" onClick={addBoard}>Add</button>
            <button onClick={toggle} className="btn primary-outline-btn-md">cancel</button>
            </div>
        </div>
    </div>
  )
}
