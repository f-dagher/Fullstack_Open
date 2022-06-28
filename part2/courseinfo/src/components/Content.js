import React from 'react'
import Part from './Part'

const Content = ({ course }) => 
<>
 {course.parts.map(parts => <Part key = {parts.id} parts = {parts}/>)}
</>

export default Content