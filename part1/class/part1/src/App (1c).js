import { useState } from 'react'
const Hello = ({ name, age }) => {
    // Called destructuring 
    // const { name, age } = props
    // same as
    // const name = props.name
    // const age = props.age

    const bornYear = () => new Date().getFullYear() - age
    // same as 
    // const bornYear = () => {
    // return new Date().getFullYear() - age
    // }
    return (
        <div>
            <p>
                Hello {name}, you are {age} years old
            </p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

// const Button = ({ onClick, text }) => (
//         <button onClick={onClick}>
//             {text}
//         </button>
// )

const Display = ({ counter }) => <div>{counter}</div>

const App = () => {
    const name = 'Peter'
    const age = 18
    // const {counter} = props
    const [ counter, setCounter ] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)

    const decreaseByOne = () => setCounter(counter - 1)

    const setToZero = () => setCounter(0)

    // const handleClick = () => {
    //     console.log('Plus clicked')
    //     setCounter(counter + 1)
    // }

    // setTimeout(
    //     () => setCounter(counter + 1),
    //     2000
    // )
    // console.log('rendering ... ', counter)

    // <button onClick={handleClick}>Plus</button>
    // <button onClick={() => {console.log('Minus clicked'); setCounter(counter - 1)}}>Minus</button>
    // <button onClick={() => setCounter(0)}>Reset</button>

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name='Nas' age={30 + 19} />
            <Hello name={name} age={age} />
            <h1>Counter</h1>
            <Display counter={counter} />
            <Button 
                onClick={increaseByOne}
                text='Plus'
            />
            <Button 
                onClick={decreaseByOne}
                text='Minus'
            />
            <Button 
                onClick={setToZero}
                text='Reset'
            />
        </div>
    )
}

export default App