import React from 'react';

const Header = ({ course }) => (
    <h2>{course}</h2>
  );
  
  
  const Content = ({ parts }) => {
    return (
      <ul>
        {parts.map((item) =>
          <li key={item.id}>{item.name} {item.exercises} </li>
        )}
      </ul>
    )
  };
  
  const Total = ({ parts }) => (
    <p>Number of exercises {parts.reduce((acc, curr) => acc + curr.exercises, 0)}</p>
  );
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  };

export default Course;