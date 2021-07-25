import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p> Hello {props.name}</p>
    </div>
  )
}
const App = () => (
  <div>
    <h1>Greeting</h1>
    <Hello name="George" />
    <Hello name="Daisy" />
    <Hello name="Carl" />
  </div>
)

export default App;
