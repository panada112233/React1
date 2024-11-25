import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Emp_login.css';
import imgPath from '../assets/2.png';

const Emp_login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ตรวจสอบรูปแบบอีเมลเบื้องต้น
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('รูปแบบอีเมลไม่ถูกต้อง');
      setIsLoading(false);
      return;
    }

    // กำหนดข้อมูลและ config สำหรับการร้องขอ API
    const data = JSON.stringify({
      email: email,
      passwordHash: password,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7039/api/Users/Login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      // หากเข้าสู่ระบบสำเร็จ
      if (response.status === 200) {
        setError(''); // เคลียร์ข้อความผิดพลาด
        alert('เข้าสู่ระบบสำเร็จ');
        setIsLoggedIn(true); // ตั้งค่าการเข้าสู่ระบบเป็น true

        const userId = response.data.userid; // รับ User ID
        const token = response.data.token; // รับ Token จาก API

        // เก็บข้อมูลใน SessionStorage
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('token', token); // บันทึก Token

        navigate('/EmpHome'); // ไปที่หน้าหลักของพนักงาน
      }
    } catch (err) {
      // จัดการข้อผิดพลาดจาก API
      if (err.response && err.response.status === 401) {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      } else if (err.response && err.response.status === 500) {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      } else {
        setError('กรุณาลองใหม่อีกครั้ง');
      }
      console.error('Login failed:', err.response || err.message);
    } finally {
      setIsLoading(false); // สิ้นสุดการโหลด
    }
  };

  return (
    <div className="emp_login-container">
      <div className="card w-96 bg-base-100 shadow-xl rounded-3xl">
        <div className="flex justify-center items-center">
          <img
            src={imgPath}
            width="100"
            height="100"
            className="rounded-full my-3 border-2 border-black"
            alt="User Avatar"
          />
        </div>
        <div className="card-body">
          <h5 className="text-center text-xl font-bold text-black mb-4">
            เข้าสู่ระบบพนักงาน
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                อีเมลที่ใช้สมัคร
              </label>
              <input
                type="email"
                className="input input-bordered w-full py-4"
                placeholder="กรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <input
                type="password"
                className="input input-bordered w-full py-4"
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="btn btn-success px-5"
                disabled={isLoading}
              >
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>
              <a href="/" className="text-sm text-blue-500 mt-2">
                ย้อนกลับไปหน้าแรก
              </a>
            </div>
          </form>
          <a href="/ForgotPassword" className="text-sm text-blue-500 mt-2">
            ลืมรหัสผ่าน?
          </a>

          {error && (
            <div className="text-red-500 mt-2 text-center">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emp_login;
