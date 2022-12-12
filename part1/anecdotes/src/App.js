import { useState } from 'react'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}
const AnecdoteWithMostVotesDisplay = ({anecdotes, points}) => {
    const max = Math.max(...points)
    const indexOfMax = [...points].indexOf(max);
    return (
        <div>
            <h2>Anecdote With Most Votes</h2>
            <div>{anecdotes[indexOfMax]}</div>
            <div>Has {max} {max > 0 ? 'votes': 'vote'}</div>
        </div>
    )
}

const AnecdoteOfTheDayDisplay = ({ selected, anecdotes, points, vote, generateRandom}) => {
    return (
    <div>
        <h2>Anecdote of The Day</h2>
        <div>{anecdotes[selected]}</div><br/>
        <div>Has {points[selected]} {points[selected] > 0 ? 'votes': 'vote'}</div>
        <Button handleClick={() => vote(selected)} text='Vote' />
        <Button handleClick={generateRandom} text='Next Anecdote' />
    </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

    const generateRandom = (index) => {
        let randomNum = Math.floor(anecdotes.length * Math.random())
        // Prevent displaying the same anecdote
        while (randomNum === index) {
            randomNum = Math.floor(anecdotes.length * Math.random())
        }
        setSelected(randomNum)
    }

    const vote = (index) => {
        const copyPoints = [...points]
        copyPoints[index] += 1
        setPoints(copyPoints)
    }

    return (
        
        <div>
            <AnecdoteOfTheDayDisplay 
                selected={selected} 
                anecdotes={anecdotes} 
                points={points}
                vote={vote}
                generateRandom={generateRandom}
            />
            <AnecdoteWithMostVotesDisplay 
                anecdotes={anecdotes}
                points={points}
            />
        </div>
    )
}

export default App