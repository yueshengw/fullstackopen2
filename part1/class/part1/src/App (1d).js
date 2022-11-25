import { useState } from 'react';

const Display = ({value}) => <p>{value}</p>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const History = ( props ) => {
    // console.log(props, props)
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }
    else {
        return (
            <div>
                button press history: {props.allClicks.join(' ')}
            </div>
        )
    }
}

const App = () => {
    const [value, setValue] = useState(10)
    const [allClicks, setAll] = useState([])
    const [clicks, setClicks]= useState({
        left: 0, right: 0
    })

    // const [left, setLeft] = useState(0)
    // const [right, setRight] = useState(0)

    const setToValue = (newValue) => {
        console.log('Value now', newValue)
        setValue(newValue)
    }

    // const setToValue = (newValue) => () => {
    //     console.log('Value now', newValue)
    //     setValue(newValue)
    // }

    const hello = (who) => () => console.log('Hello', who)

    // const hello = (who) => {
    //     return () => {
    //         console.log('Hello', who)
    //     }
    // }

    // const hello = (who) => {
    //     const handler = () => {
    //         console.log('Hello', who)
    //     }
    //     return handler
    // }

    const handleClick1 = () => {
        console.log('Clicked the button')
    }

    const handleClick2 = () => {
        console.log('Clicked the button')
        setValue(0)
    }

    const handleLeftClick = () => {
        setClicks({ ...clicks, left: clicks.left + 1 })
        setAll(allClicks.concat('L'))
    }

    const handleRightClick = () => {
        setClicks({ ...clicks, right: clicks.right + 1 })
        setAll(allClicks.concat('R'))
    }

    // debugger

    // const handleLeftClick = () => {
    //     const newClicks = {
    //         left: clicks.left + 1,
    //         right: clicks.right
    //     }
    //     setClicks(newClicks)
    // }

    // const handleRightClick = () => {
    //     const newClicks = {
    //         left: clicks.left,
    //         right: clicks.right + 1
    //     }
    //     setClicks(newClicks)
    // }

    return (
        <div>
            <h1>Event Handler 1</h1>
            <>
                {clicks.left}
                <Button handleClick={handleLeftClick} text='Left' />
                <Button handleClick={handleRightClick} text='Right' />
                {clicks.right}
                <History allClicks={allClicks} />
            </>
            <h1>Event Handler 2</h1>
            <>
                <Display value={value} />
                <Button handleClick={()=> setValue(0)} text='Zero' />
                <Button handleClick={handleClick1} text='Console Log' />
                <Button handleClick={handleClick2} text='Button' />
            </>
            <h1>Event Handler 3</h1>
            <>
                <Button handleClick={hello('World')} text='Hello World' />
                <Button handleClick={hello('React')} text='Hello React' />
                <Button handleClick={hello('Function')} text='Hello Function' />
            </>
            <h1>Event Handler 4</h1>
            <>
                <Display value={value} />
                <Button handleClick={() => setToValue(value + 1)} text='Increment' />
                <Button handleClick={() => setToValue(value - 1)} text='Decrement' />
                <Button handleClick={() => setToValue(0)} text='Zero' />
                <Button handleClick={() => setToValue(1000)} text='Thousand' />
            </>
        </div>
    )
}

export default App