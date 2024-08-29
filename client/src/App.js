import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header/>
      <main className='min-h-[calc(100vh)] bg-[#f7f7ff]'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
