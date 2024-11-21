import "./App.css"
const App: React.FC = () => {
  console.log(
    "==http:NODE_ENV,",
    process.env.NODE_ENV,
    process.env.REACT_APP_BASEURL,
    process.env.REACT_APP_ENV
  )

  return <h2>你好， 1蒙面大婶11</h2>
}
export default App
