import Navbar from "./Components/Navbar/Navbar"
import Hero from "./Components/Hero/Hero"
import Input from "./Components/Input/Input"
// import Results from "./Components/Results/Results"

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <Hero />
      <Input />
      {/* <Results /> */}
    </div>
  )
}

export default App