import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App (1c)'

// let counter = 1

// const refresh = () => {
//     ReactDOM.createRoot(document.getElementById('root')).render(
//         <App counter={counter} />
//     )
// }

// refresh()
// setInterval(() => {
//     refresh()
//     counter += 1
// }, 1000)

ReactDOM.createRoot(document.getElementById('root')).render(<App />)