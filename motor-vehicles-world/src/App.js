import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Header from './components/Header';

function App() {
  return (
    <div>
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/sing-in" element={<SignIn/>} />
      <Route path="/sing-up" element={<SignUp/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/offers" element={<Offers/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
