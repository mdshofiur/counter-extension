import React from "react"

function CounterApp() {
  const [count, setCount] = React.useState<number>(0)

  const updateCount = (value: number) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id
      chrome.storage.local.get(tabId.toString(), (result) => {
        const count = result[tabId.toString()] || 0
        chrome.storage.local.set({ [tabId]: count + value }, () => {
          setCount(count + value)
        })
      })
    })
  }

  React.useEffect(() => {
    updateCount(0)
  }, [])

  const increment = () => updateCount(1)
  const decrement = () => updateCount(-1)

  return (
    <div
      style={{
        width: "80px"
      }}>
      <h4>Counter: {count}</h4>
      <div
        style={{
          display: "flex",
          gap: "10px"
        }}>
        <button onClick={increment}>+</button>
        <button disabled={count <= 0} onClick={decrement}>
          -
        </button>
      </div>
    </div>
  )
}

export default CounterApp
