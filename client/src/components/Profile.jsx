import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

function Profile() {
  const [employee, setEmployee] = useState({
    firstName: "ssss",
    lastName: "",
    department: "",
    designation: "",
    contact: "",
    email: "",
    jdate: "",
    gender: "None",
    createdAt: "",
    isActive: "",
    passwordHash: "",
    role: "",
    updatedAt: "",
    userID: "",

  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // สำหรับแสดงสถานะกำลังโหลดข้อมูล

  // ดึงข้อมูลโปรไฟล์เมื่อ Component ถูกโหลด
  useEffect(() => {
    var data = JSON.parse(sessionStorage.getItem("usersobj")); 
    console.log (data)
    setEmployee(data);
    console.log (employee)
    setLoading(false);
    // if (Object.keys(data).length != 0) {
    //   //  setEmployee(data)
    //   fetch("https://localhost:7039/api/Users/Profile", {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${token}`, // ส่ง Token เพื่อยืนยันตัวตน
    //     },
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         if (response.status === 401) {
    //           throw new Error("คุณไม่ได้เข้าสู่ระบบ");
    //         }
    //         throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       setEmployee(data); // ตั้งค่าข้อมูลพนักงาน
    //       setLoading(false); // หยุดสถานะการโหลด
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       setError(err.message);
    //       setLoading(false); // หยุดสถานะการโหลด
    //     });
    // } else {
    //   setError("กรุณาเข้าสู่ระบบก่อนใช้งาน");
    //   setLoading(false); // หยุดสถานะการโหลด
    // }
  }, []);

  // อัปเดตข้อมูลใน state เมื่อผู้ใช้แก้ไขฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // ส่งข้อมูลที่แก้ไขกลับไปอัปเดตในฐานข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token"); // ดึง Token จาก sessionStorage

    fetch("https://localhost:7039/api/Users/UpdateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ส่ง Token เพื่อยืนยันตัวตน
      },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("อัปเดตโปรไฟล์สำเร็จ");
          setEmployee(data.updatedEmployee); // อัปเดตข้อมูลที่ถูกส่งกลับ
        } else {
          alert("มีข้อผิดพลาดเกิดขึ้น โปรดลองอีกครั้ง");
        }
      })
      .catch((err) => {
        console.error("Error updating profile: ", err);
        alert("มีข้อผิดพลาดเกิดขึ้น โปรดลองอีกครั้ง");
      });
  };

  // สร้าง PDF จากข้อมูลพนักงาน
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(16);
    doc.text("โปรไฟล์พนักงาน", 10, 10);

    const content = `
      ชื่อ: ${employee.firstname}
      นามสกุล: ${employee.lastname}
      แผนกพนักงาน: ${employee.department}
      ตำแหน่งพนักงาน: ${employee.designation}
      การติดต่อ: ${employee.contact}
      อีเมล: ${employee.emailid}
      วันที่เข้าร่วม: ${employee.jdate}
      เพศ: ${employee.gender === "None" ? "ไม่ระบุ" : employee.gender}
    `;

    doc.setFontSize(12);
    doc.text(content, 10, 30);
    doc.save("employee_profile.pdf");
  };

  return (
    <div className="p-6 bg-base-200">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md relative">
        {/* แสดงสถานะการโหลดข้อมูล */}
        {loading ? (
          <div className="text-center py-6">กำลังโหลดข้อมูล...</div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : (
          <>
            {/* ปุ่ม Export PDF */}
            <button
              onClick={handleExportPDF}
              className="btn btn-secondary absolute top-4 right-4"
            >
              Export PDF
            </button>

            {/* ฟอร์มแสดงข้อมูล */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-primary">
                โปรไฟล์
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">ชื่อ</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="input input-bordered"
                      placeholder="กรอกชื่อจริง"
                      value={employee.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">นามสกุล</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="input input-bordered"
                      placeholder="กรอกนามสกุล"
                      value={employee.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">แผนกพนักงาน</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      className="input input-bordered"
                      placeholder="กรอกแผนกพนักงาน"
                      value={employee.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">ตำแหน่งพนักงาน</span>
                    </label>
                    <input
                      type="text"
                      name="designation"
                      className="input input-bordered"
                      placeholder="กรอกตำแหน่งพนักงาน"
                      value={employee.designation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">การติดต่อ</span>
                    </label>
                    <input
                      type="text"
                      name="contact"
                      className="input input-bordered"
                      placeholder="กรอกข้อมูลการติดต่อ"
                      value={employee.contact}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">อีเมล</span>
                    </label>
                    <input
                      type="email"
                      name="emailid"
                      className="input input-bordered"
                      placeholder="กรอกอีเมลของคุณ"
                      value={employee.emailid}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">วันที่เข้าร่วม</span>
                    </label>
                    <input
                      type="date"
                      name="jdate"
                      className="input input-bordered"
                      value={employee.jdate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">เพศ</span>
                    </label>
                    <select
                      name="gender"
                      className="select select-bordered"
                      value={employee.gender}
                      onChange={handleChange}
                    >
                      <option value="None">กรุณาเลือกเพศ</option>
                      <option value="Male">ชาย</option>
                      <option value="Female">หญิง</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  ยืนยัน
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
