import Header from './course/Header'
import Content from './course/Content'
import Total from './course/Total'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course