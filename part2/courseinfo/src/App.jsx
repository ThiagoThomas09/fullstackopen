const Header = ({ course }) => {
  return (
    <div>
      <h2>{course}</h2>
    </div>
  );
};

const Total = ({ parts }) => {
    const total = 
      parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <strong>total of {total} exercises</strong>
  )
}

const Part = ({ parts }) => {
  return(
    <p>
      {parts.name} {parts.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  console.log(parts);
  
  const courseParts = parts.map(x => {
    return <Part key={x.id} parts={x} />
  })  
  
  return (
    <div>
      {courseParts}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App