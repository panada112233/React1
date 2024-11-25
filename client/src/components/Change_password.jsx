import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword1 !== newPassword2) {
      setMessages([{ tags: 'error', text: 'รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน!' }]);
      return;
    }

    // Prepare the data to send to the backend
    const resetData = {
      oldPassword: oldPassword,
      newPassword: newPassword1,
    };

    try {
      // Send POST request to the backend
      const response = await axios.post('https://localhost:7039/api/PasswordResets', resetData);

      if (response.status === 201) {
        setMessages([{ tags: 'success', text: 'เปลี่ยนรหัสผ่านสำเร็จ!' }]);
        setOldPassword('');
        setNewPassword1('');
        setNewPassword2('');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessages([{ tags: 'error', text: 'ไม่สามารถเปลี่ยนรหัสผ่านได้. กรุณาลองใหม่!' }]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-primary mb-4">เปลี่ยนรหัสผ่าน</h2>
        <form onSubmit={handleSubmit}>
          {messages.length > 0 &&
            messages.map((message, index) => (
              <div key={index} className={`alert alert-${message.tags} mb-4`}>
                {message.text}
              </div>
            ))}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">รหัสผ่านเก่า</span>
            </label>
            <input
              type="password"
              name="old_password"
              className="input input-bordered input-primary"
              placeholder="รหัสผ่านเก่า"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">รหัสผ่านใหม่</span>
            </label>
            <input
              type="password"
              name="new_password1"
              className="input input-bordered input-primary"
              placeholder="รหัสผ่านใหม่"
              value={newPassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">ยืนยันรหัสผ่าน</span>
            </label>
            <input
              type="password"
              name="new_password2"
              className="input input-bordered input-primary"
              placeholder="ยืนยันรหัสผ่าน"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              ยืนยัน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
