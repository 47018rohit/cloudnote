import React from 'react'
import Notes from './Notes'


export default function Home() {
  

  return (
    <div className='container my-4'>
      <div class="mb-3">
        <h2>Add Notes</h2>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
      </div>
      <div class="mb-3">
        <Notes />
      </div>
    </div>
  )
}
