const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href='https://github.com/yueshengw' target="_blank">yueshengw</a>
    </div>
  )
}

const App = () => {
  console.log("Hello from App component");
  const now = new Date();
  const a = 10;
  const b = 20;
  const name = 'Mr. Toliver';
  const age = 28;
  return (
    <>
      <h1>Greetings</h1>
      <p>It is {now.toString()}</p>
      <p>Math</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Hello name='Tyler' age={10 + 21} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}

export default App
