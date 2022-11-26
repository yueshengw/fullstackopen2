const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ parts }) => {
  console.log(parts)

  return (
    <div>
      {parts.map(part => {
        console.log(part)
        return (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )
      }
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  let sum = 0
  parts.forEach(part => sum += part.exercises)

  return (
    <p style={{fontWeight:'bold'}}>Number of exercise {sum}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }

  return (
    <Course course={course} />
  )
}

export default App