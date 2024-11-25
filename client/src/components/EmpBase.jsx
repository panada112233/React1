import React from "react";
import { Link, Outlet } from "react-router-dom";

const EmpBase = () => {
  const profileImage = "/path-to-user-image"; // เส้นทางรูปภาพโปรไฟล์

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[25vw] bg-primary text-white min-h-screen p-4 flex flex-col items-center">
        {/* รูปโปรไฟล์ */}
        <div className="avatar mb-4">
          <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
            <img src={profileImage} alt="โปรไฟล์พนักงาน" />
          </div>
        </div>
        {/* ปุ่มเปลี่ยนรูปภาพ */}
        <Link
          to="/EmpHome/Change_profile"
          className="btn btn-outline btn-accent btn-sm mb-8"
        >
          เปลี่ยนรูปภาพ
        </Link>

        {/* Sidebar Links */}
        <ul className="menu bg-base-100 text-black rounded-box shadow-lg w-full">
          <li>
            <Link to="/EmpHome" className="hover:bg-primary hover:text-white">
              แสดงข้อมูล
            </Link>
          </li>
          <li>
            <Link to="/EmpHome/Profile" className="hover:bg-primary hover:text-white">
              โปรไฟล์
            </Link>
          </li>
          <li>
            <Link to="/EmpHome/My_experience" className="hover:bg-primary hover:text-white">
              ประสบการณ์ทำงาน
            </Link>
          </li>
          <li>
            <Link to="/EmpHome/My_education" className="hover:bg-primary hover:text-white">
              การศึกษา
            </Link>
          </li>
          <li>
            <Link to="/EmpHome/Document" className="hover:bg-primary hover:text-white">
              จัดการเอกสาร
            </Link>
          </li>
          <li>
            <Link to="/EmpHome/Change_password" className="hover:bg-secondary hover:text-white">
              เปลี่ยนรหัสผ่าน
            </Link>
          </li>
          <li>
            <Link to="/EmpHome/Logout" className="hover:bg-error hover:text-white">
              ออกจากระบบ
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-[75vw] bg-gray-100 p-6">
        <h5
          className="text-center py-3 font-bold text-xl text-gray-800 border-t-2 border-b-2 border-green-500"
        >
          ระบบจัดเก็บเอกสารพนักงาน
        </h5>
        <div className="w-full bg-white rounded-lg shadow-md p-6 mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmpBase;
