function UpdateProfile() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Department: "",
    Designation: "",
    Contact: "",
    Email: "",
    Gender: "None",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    fetch("https://localhost:7039/api/ProfileUpdates/UpdateProfile", {
      method: "PUT", // เปลี่ยนเป็น PUT ให้ตรงกับ C#
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("เกิดข้อผิดพลาด");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || "อัปเดตข้อมูลสำเร็จ");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("อัปเดตข้อมูลไม่สำเร็จ");
      });
  };

  return (
    <div className="p-6 bg-base-200">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">อัปเดตข้อมูลโปรไฟล์</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "ชื่อ", name: "FirstName" },
            { label: "นามสกุล", name: "LastName" },
            { label: "แผนก", name: "Department" },
            { label: "ตำแหน่ง", name: "Designation" },
            { label: "การติดต่อ", name: "Contact" },
            { label: "อีเมล", name: "Email", type: "email" },
          ].map(({ label, name, type = "text" }) => (
            <div className="form-control" key={name}>
              <label>{label}:</label>
              <input
                type={type}
                name={name}
                className="input input-bordered"
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="form-control">
            <label>เพศ:</label>
            <select
              name="Gender"
              className="select select-bordered"
              value={formData.Gender}
              onChange={handleChange}
            >
              <option value="None">เลือกเพศ</option>
              <option value="Male">ชาย</option>
              <option value="Female">หญิง</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4 w-full">บันทึก</button>
      </form>
    </div>
  );
}

export default UpdateProfile;
