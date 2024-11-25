import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function MyEducation() {
  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState({
    level: "",
    institute: "",
    fieldOfStudy: "",
    year: "",
    gpa: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const levelLabels = {
    Primary: "ประถมศึกษา",
    Secondary: "มัธยมศึกษา",
    Voc: "ประกาศนียบัตรวิชาชีพ(ปวช.)",
    Dip: "ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)",
    Bachelor: "ปริญญาตรี",
    Master: "ปริญญาโท",
    Doctorate: "ปริญญาเอก",
  };

  // Fetch educations from the API on component mount
  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await axios.get("https://localhost:7039/api/Educations");
        setEducations(response.data);
      } catch (error) {
        console.error("Error fetching educations:", error);
      }
    };
    fetchEducations();
  }, []);

  const handleAddOrEditEducation = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedEducations = educations.map((edu, index) =>
        index === editIndex ? newEducation : edu
      );
      setEducations(updatedEducations);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      try {
        await axios.post("https://localhost:7039/api/Educations", newEducation);
        setEducations([...educations, newEducation]);
      } catch (error) {
        console.error("Error adding education:", error);
      }
    }

    setNewEducation({
      level: "",
      institute: "",
      fieldOfStudy: "",
      year: "",
      gpa: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleEditEducation = (index) => {
    setNewEducation(educations[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteEducation = async (index) => {
    try {
      // Assuming there's a delete endpoint
      await axios.delete(
        `https://localhost:7039/api/Educations/${educations[index].educationID}`
      );

      const updatedEducations = educations.filter((_, i) => i !== index);
      setEducations(updatedEducations);
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(16);
    doc.text("การศึกษา", 10, 10);

    educations.forEach((edu, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. ระดับ: ${levelLabels[edu.level]} | สถาบัน: ${edu.institute} | สาขา: ${edu.fieldOfStudy} | ปี: ${edu.year} | GPA: ${edu.gpa}`,
        10,
        20 + index * 10
      );
    });

    doc.save("การศึกษา.pdf");
  };

  return (
    <div className="p-6 bg-base-200">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 relative">
        <button
          className="btn btn-accent absolute top-4 right-4"
          onClick={handleExportPDF}
        >
          Export PDF
        </button>
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          การศึกษา
        </h2>
        <form onSubmit={handleAddOrEditEducation} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">ระดับการศึกษา</span>
              </label>
              <select
                name="level"
                className="select select-bordered"
                value={newEducation.level}
                onChange={handleChange}
                required
              >
                <option value="">กรุณาเลือกระดับการศึกษา</option>
                {Object.entries(levelLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">ชื่อสถาบัน</span>
              </label>
              <input
                type="text"
                name="institute"
                className="input input-bordered"
                placeholder="กรอกชื่อสถาบัน"
                value={newEducation.institute}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">สาขาวิชา</span>
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                className="input input-bordered"
                placeholder="กรอกสาขาวิชา"
                value={newEducation.fieldOfStudy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">ปีที่ศึกษา</span>
              </label>
              <input
                type="number"
                name="year"
                className="input input-bordered"
                placeholder="กรอกปีที่ศึกษา"
                value={newEducation.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">เกรดเฉลี่ยสะสม</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="gpa"
                className="input input-bordered"
                placeholder="กรอกเกรดเฉลี่ยสะสม"
                value={newEducation.gpa}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {isEditing ? "บันทึกการแก้ไข" : "เพิ่มการศึกษา"}
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">การศึกษาที่บันทึกไว้</h3>
          {educations.length === 0 ? (
            <p className="text-gray-500">ไม่มีข้อมูลการศึกษา</p>
          ) : (
            <ul className="space-y-4">
              {educations.map((edu, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>สถาบัน:</strong> {edu.institute}
                    </p>
                    <p>
                      <strong>สาขา:</strong> {edu.fieldOfStudy}
                    </p>
                    <p>
                      <strong>ระดับ:</strong> {levelLabels[edu.level]}
                    </p>
                    <p>
                      <strong>ปี:</strong> {edu.year}
                    </p>
                    <p>
                      <strong>GPA:</strong> {edu.gpa}
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleEditEducation(index)}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteEducation(index)}
                    >
                      ลบ
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyEducation;
