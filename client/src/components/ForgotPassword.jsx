import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('รูปแบบอีเมลไม่ถูกต้อง');
      setIsLoading(false);
      return;
    }

    // จำลองการส่งอีเมล
    setTimeout(() => {
      setMessage('ลิงก์สำหรับรีเซ็ตรหัสผ่านถูกส่งไปที่อีเมลของคุณแล้ว');
      setIsLoading(false);
      setTimeout(() => navigate('/Emp_login'), 3000);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="card w-96 bg-white shadow-2xl rounded-lg">
        <div className="card-body p-6">
          <h5 className="text-center text-2xl font-bold text-primary mb-6">
            <i className="fas fa-lock text-3xl mb-2"></i>
            <br />
            ลืมรหัสผ่าน
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                อีเมลที่ใช้สมัคร
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="กรอกอีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'กำลังส่งลิงก์...' : 'ส่งลิงก์รีเซ็ตรหัสผ่าน'}
              </button>
            </div>
          </form>
          {message && (
            <div className="mt-4 text-center">
              <span
                className={`text-sm ${
                  message.includes('สำเร็จ') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
