import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { isAuthenticated } from './features/auth/authSlice';
import { useSelector } from 'react-redux';

function App() {
  const loginUser = useSelector(isAuthenticated);
  return (
    <div>
      {/* <Header/> */}
      <main className='min-h-[calc(100vh)] bg-[#f7f7ff]'>
        <Outlet/>
      </main>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
