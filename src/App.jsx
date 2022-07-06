import logo from './logo.svg';
import './App.css';
import { Navbar, Main, Footer} from './components/index'

function App() {
  return (
    <div className='flex flex-col justify-between w-screen min-h-screen rainbow App' >
      <div className='flex flex-col justify-around'>
        <Navbar/>
        <Main/>
      </div>
      <div className='bg-emerald-400'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
