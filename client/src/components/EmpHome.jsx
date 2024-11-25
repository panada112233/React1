import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmpHome = () => {
    const [userName, setUserName] = useState("กำลังโหลด...");
    const [statistics, setStatistics] = useState({
        totalEmployees: 0,
        totalDocuments: 0,
        totalExperience: 0,
    });
    const [recentActivities, setRecentActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                var id = sessionStorage.getItem('userId');
                console.log(id)
                console.log("Fetching data from API...");
                const response = await axios.get("https://localhost:7039/api/Users/Getbyid/" + id);
                const response1 = await axios.get("https://localhost:7039/api/Users");
                
                if (response.status == 200) {
                    const data = response.data;
                    sessionStorage.setItem('usersobj', JSON.stringify(data));
                    console.log(data)
                    setUserName(`${data.firstName} ${data.lastName}` || "ไม่ทราบชื่อ");
                    if (response1.status == 200 ){
                        setStatistics({
                            totalEmployees: response1.data.length, // จำนวนพนักงาน
                            totalDocuments: 0, // Placeholder
                            totalExperience: 0, // Placeholder
                        });

                    }
                    
                    setRecentActivities([]); // กิจกรรมล่าสุดยังไม่มี
                } else {
                    console.warn("API ตอบกลับ แต่ไม่มีข้อมูล");
                    setUserName("ไม่มีข้อมูลพนักงานในระบบ");
                }
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูลจาก API:", error);
                setUserName("ไม่สามารถเชื่อมต่อกับระบบได้");
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <div className="min-h-screen bg-base-200">
            <div className="flex flex-col items-center">
                <div className="text-center mt-6">
                    <h2 className="text-2xl font-bold text-primary">ระบบจัดเก็บเอกสารพนักงาน</h2>
                    <h4 className="text-xl text-success mt-2">
                        ยินดีต้อนรับ, {isLoading ? "กำลังโหลด..." : userName}
                    </h4>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 w-10/12">
                    {/* ปุ่มเมนู */}
                    {[
                        { name: "ข้อมูลพนักงาน", to: "/EmpHome/Profile", color: "btn-info" },
                        { name: "จัดการเอกสาร", to: "/EmpHome/Document", color: "btn-primary" },
                        { name: "ประสบการณ์ทำงาน", to: "/EmpHome/My_experience", color: "btn-warning" },
                        { name: "การศึกษา", to: "/EmpHome/My_education", color: "btn-success" },
                        { name: "เปลี่ยนรหัสผ่าน", to: "/EmpHome/Change_password", color: "btn-secondary" },
                        { name: "ออกจากระบบ", to: "/EmpHome/Logout", color: "btn-error" },
                    ].map((menu, index) => (
                        <Link key={index} to={menu.to} className={`btn ${menu.color} w-full text-lg`}>
                            {menu.name}
                        </Link>
                    ))}
                </div>

                {/* สถิติระบบ และ กิจกรรมล่าสุด */}
                <div className="mt-8 flex gap-6 justify-center w-10/12">
                    {/* สถิติระบบ */}
                    <div className="card bg-base-100 shadow-lg w-1/2">
                        <div className="card-body">
                            <h3 className="card-title text-primary">สถิติระบบ</h3>
                            {isLoading ? (
                                <p>กำลังโหลด...</p>
                            ) : (
                                <>
                                    <p>พนักงานทั้งหมด: <strong>{statistics.totalEmployees}</strong> คน</p>
                                    <p>เอกสารทั้งหมด: <strong>{statistics.totalDocuments}</strong> ไฟล์</p>
                                    <p>ประสบการณ์ทำงานที่บันทึกไว้: <strong>{statistics.totalExperience}</strong> รายการ</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* กิจกรรมล่าสุด */}
                    <div className="card bg-base-100 shadow-lg w-1/2">
                        <div className="card-body">
                            <h3 className="card-title text-primary">กิจกรรมล่าสุด</h3>
                            {isLoading ? (
                                <p>กำลังโหลด...</p>
                            ) : (
                                <ul>
                                    {recentActivities.length > 0 ? (
                                        recentActivities.map((activity, index) => (
                                            <li key={index} className="my-2">
                                                <span>{activity.description}</span> -{" "}
                                                <span className="text-sm text-gray-500">{activity.timestamp}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li>ไม่มีข้อมูลกิจกรรมล่าสุด</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpHome;
