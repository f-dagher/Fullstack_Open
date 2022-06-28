import React from 'react'

const Total = ({ course }) => 
    <p>
       <b> total of {course.parts.reduce((s, p) => s + p.exercises, 0)} </b>
    </p>

export default Total