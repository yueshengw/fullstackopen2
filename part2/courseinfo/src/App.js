const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Header = ({ course }) => {
  return (
    <h3>{course.name}</h3>
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
  /**
   * Needs initial value because acc's initial value will be an object,
   * the first element of parts, which will not result in an integer sum.
   */

  const total = parts.reduce((acc, cur) => {
    console.log('acc', acc, cur.exercises )

    return (
      acc + cur.exercises
    )
  }, 0)

  return (
    <p style={{fontWeight:'bold'}}>Number of exercise {total}</p>
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
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((course, index) => <Course key={index} course={course} />)}
    </>
  )
}

export default App