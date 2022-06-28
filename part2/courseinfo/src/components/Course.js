import React from 'react'

const Header = ({ course }) => <h2>{course.name}</h2>

const Part = ({ parts }) => 
  <p>
    {parts.name} {parts.exercises}
  </p>

const Content = ({ course }) => 
<>
 {course.parts.map(parts => <Part key = {parts.id} parts = {parts}/>)}
</>

const Total = ({ course }) => 
    <p>
       <b> total of {course.parts.reduce((s, p) => s + p.exercises, 0)} </b>
    </p>

const Course = ( {course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course}/>
        <Total course={course} />
      </div>
    )
  }

export default Course
//   <Content course = {course} />
//<Total course = {course} />