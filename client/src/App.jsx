import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';  // ใช้ useState
import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Emp_login from './components/Emp_login';
import Admin_login from './components/Admin_login';
import Navbars from './components/Navbars';

import EmpHome from './components/EmpHome';
import EmpBase from './components/EmpBase';
import Profile from './components/Profile'; // เปลี่ยนชื่อเป็น Profile
import ChangePassword from './components/Change_password'; // เปลี่ยนชื่อเป็น ChangePassword
import Document from './components/Document'; // เปลี่ยนชื่อเป็น Document
import Logout from './components/Logout'; // เปลี่ยนชื่อเป็น Logout
import MyEducation from './components/My_education'; // เปลี่ยนชื่อเป็น MyEducation
import MyExperience from './components/My_experience'; // เปลี่ยนชื่อเป็น MyExperience


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // สถานะล็อกอิน
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* ส่ง isLoggedIn ไปยัง Navbars */}
        <Navbars isLoggedIn={isLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Emp_login" element={<Emp_login />} />
            <Route path="/Admin_login" element={<Admin_login />} />
            <Route path="/EmpHome" element={<EmpHome/>} />
            
            {/* Route for EmpHome with nested routes inside EmpBase */}
            <Route path="/EmpHome" element={<EmpBase />}>
              <Route path="Profile" element={<Profile />} />
              <Route path="Change_password" element={<ChangePassword />} />
              <Route path="Document" element={<Document />} />
              <Route path="Logout" element={<Logout />} />
              
              <Route path="My_education" element={<MyEducation />} />
              <Route path="My_experience" element={<MyExperience />} />
            </Route>

          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4">
          <div className="flex justify-between items-center">
            <div className="text-left">
              &copy; The Expertise Co,Ltd.<br />
              300/10 หมู่บ้านพรไพลิน ซอย ลาดพร้าว 35/1 ถนนลาดพร้าว
              <br />แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900<br />
              ☎ 02-001-4429
            </div>

            <div className="mt-4 mr-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1369.8752682235247!2d100.58138637736934!3d13.80342968453509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d2be715021b%3A0x8eb3e12d0332412d!2sThe%20Xpertise!5e0!3m2!1sth!2sth!4v1731605471194!5m2!1sth!2sth"
                width="700"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
