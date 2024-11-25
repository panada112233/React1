import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangeProfile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการเลือกไฟล์รูปโปรไฟล์
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // ฟังก์ชันบันทึกรูปโปรไฟล์
  const handleSave = async (e) => {
    e.preventDefault();

    if (profilePicture) {
      const formData = new FormData();
      formData.append("file", profilePicture);

      try {
        const response = await axios.post(
          "http://localhost:7039/api/Files/Uploadprofile", // URL ของ API ที่ใช้ในการอัปโหลดไฟล์
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          alert("รูปโปรไฟล์ของคุณถูกอัปโหลดเรียบร้อยแล้ว");
          navigate("/EmpHome");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปโปรไฟล์");
      }
    } else {
      alert("กรุณาเลือกไฟล์รูปภาพ");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card bg-white shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-center text-orange-500">เปลี่ยนรูปโปรไฟล์</h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">เลือกรูปโปรไฟล์</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              {profilePicture && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile Preview"
                    className="rounded-lg w-40 h-40 object-cover mx-auto"
                  />
                </div>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                อัปโหลดรูปโปรไฟล์
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfile;
