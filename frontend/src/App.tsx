import React from "react"
import useSwr from "swr"

import "./App.css"

const backendUrl = "http://localhost:3003"
const fetcher = (url) => fetch(url).then((r) => r.json())

function App() {
  const { data, error } = useSwr(backendUrl, fetcher)

  if (error) return <div className="App-header">failed to load</div>
  if (!data) return <div className="App-header">loading...</div>
  return (
    <div className="App">
      <header className="App-header">
        {data.map(({ id, priority, category, description }, i) => (
          <div className="Perf" key={i}>
            <div> Id: {id}</div>
            <div>Priority: {priority}</div>
            <div>Category: {category}</div>
            <div>Description: {description}</div>
          </div>
        ))}
      </header>
    </div>
  )
}

export default App
