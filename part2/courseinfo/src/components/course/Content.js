import Part from './Part'

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

export default Content