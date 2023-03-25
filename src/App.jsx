import Experience from './experience/Experience';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
    <Experience />
     <div className='bg-transparent absolute w-full z-50'>
      <NavBar />
     </div>
    </div>
  )
}

export default App;

// fonts
// name - Anton, Luckiest Guy, Bungee Shade