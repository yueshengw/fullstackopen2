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

export default Total