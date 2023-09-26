// import logo from './logo.svg';
import './App.css';
import LoginForm from './login/login';
import RegistrationForm from './register/register';
import TaskManagement from './dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<TaskManagement />} />

      </Routes>
    </Router>
  );
}

export default App;
