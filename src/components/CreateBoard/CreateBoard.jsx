import React from 'react'
import "./createboard.css"

export function CreateBoard({toggle}) {
  return (
    <div className="createboard-container" onClick={toggle}>
        <div className="createboard-modal" onClick={(e)=>e.stopPropagation()}>
            <div className="createboard-title">Create Dashboard</div>
            <div className="createboard-input-wrapper">
              <label htmlFor="" className="createboard-input-label">Title</label>
              <input type="text" className="createboard-input" />
            </div>
            <div className="createboard-input-wrapper">
              <label htmlFor="" className="createboard-input-label">Max votes</label>
              <input type="number" className="createboard-input" />
            </div>
            <span className='createboard-input-label'>Review Columns</span>
            <div className="createboard-input-wrapper">
              <input type="text" className="createboard-input" placeholder='Enter column name: (default: Good features)'/>
            </div>
            <div className="createboard-input-wrapper">
              <input type="text" className="createboard-input" placeholder='Enter column name: (default: Improvements)'/>
            </div>
            <div className="createboard-input-wrapper">
              <input type="text" className="createboard-input" placeholder='Enter column name: (default: Add features or Changes)'/>
            </div>
            <div className="createboard-cta">

            <button className="btn primary-btn-md">Add</button>
            <button onClick={toggle} className="btn primary-outline-btn-md">cancel</button>
            </div>
        </div>
    </div>
  )
}
