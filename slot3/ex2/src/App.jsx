import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/Navbar'
import ListOrchid from './ListOrchid'

function App() {
  return(
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
      <NavBar/>
      <ListOrchid/>
    </div>
  )
}

export default App
