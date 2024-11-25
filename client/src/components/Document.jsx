import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Document() {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({
    category: '',
    file: null,
    description: '',
    uploadDate: new Date().toLocaleDateString(),
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  // Mapping หมวดหมู่ภาษาอังกฤษเป็นภาษาไทย
  const categoryMapping = {
    Identification: 'บัตรประจำตัว',
    WorkContract: 'ใบลางาน',
    Certificate: 'ใบรับรองแพทย์',
    Others: 'อื่นๆ',
  };

  // Fetch documents from API on initial load
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('https://localhost:7039/api/Files');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  const handleAddDocument = async (e) => {
    e.preventDefault();

    if (newDocument.file) {
      const formData = new FormData();
      formData.append('file', newDocument.file);
      formData.append('category', newDocument.category);
      formData.append('description', newDocument.description);
      formData.append('uploadDate', newDocument.uploadDate);

      try {
        await axios.post('https://localhost:7039/api/Files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Fetch the updated list after adding a new document
        const response = await axios.get('https://localhost:7039/api/Files');
        setDocuments(response.data);

        // Reset the form
        setNewDocument({
          category: '',
          file: null,
          description: '',
          uploadDate: new Date().toLocaleDateString(),
        });
      } catch (error) {
        console.error('Error uploading document:', error);
      }
    } else {
      alert('กรุณาเลือกไฟล์เอกสารก่อน');
    }
  };

  const handleSearch = () => {
    const results = documents.filter(
      (doc) =>
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocuments(results);
  };

  const handleDeleteDocument = async (id) => {
    try {
      await axios.delete(`https://localhost:7039/api/Files/${id}`);
      // Fetch the updated list after deleting a document
      const response = await axios.get('https://localhost:7039/api/Files');
      setDocuments(response.data);
      setFilteredDocuments(response.data);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleFileChange = (e) => {
    setNewDocument({ ...newDocument, file: e.target.files[0] });
  };

  return (
    <div className="p-6 bg-base-200">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          <i className="fas fa-file-alt mr-2"></i>จัดการเอกสารพนักงาน
        </h2>

        {/* Form อัปโหลดเอกสาร */}
        <form
          onSubmit={handleAddDocument}
          className="space-y-4 mb-8 bg-base-100 p-4 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">หมวดหมู่เอกสาร</span>
              </label>
              <select
                className="select select-bordered"
                value={newDocument.category}
                onChange={(e) =>
                  setNewDocument({ ...newDocument, category: e.target.value })
                }
              >
                <option value="">กรุณาเลือกหมวดหมู่เอกสาร</option>
                <option value="Identification">บัตรประจำตัว</option>
                <option value="WorkContract">ใบลางาน</option>
                <option value="Certificate">ใบรับรองแพทย์</option>
                <option value="Others">อื่นๆ</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">รายละเอียดเอกสาร</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="กรอกรายละเอียด"
                value={newDocument.description}
                onChange={(e) =>
                  setNewDocument({ ...newDocument, description: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">ไฟล์เอกสาร</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <button className="btn btn-primary mt-4 w-full">อัปโหลดเอกสาร</button>
        </form>

        {/* ค้นหาเอกสาร */}
        <div className="bg-base-100 p-4 rounded-lg shadow mb-8">
          <h3 className="text-xl font-bold text-secondary">ค้นหาเอกสาร</h3>
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              className="input input-bordered flex-grow"
              placeholder="ค้นหาเอกสาร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={handleSearch}>
              ค้นหา
            </button>
          </div>
        </div>

        {/* แสดงรายการเอกสาร */}
        <div className="bg-base-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold text-secondary mb-4">รายการเอกสาร</h3>
          <ul className="space-y-4">
            {(filteredDocuments.length > 0 ? filteredDocuments : documents).map(
              (doc) => (
                <li
                  key={doc.id}
                  className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold">
                      {categoryMapping[doc.category] || doc.category}
                    </h4>
                    <p className="text-sm text-gray-600">
                      รายละเอียด: {doc.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      วันที่อัปโหลด: {doc.uploadDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-info"
                      onClick={() => alert('ดูไฟล์: ' + doc.file.name)}
                    >
                      ดูไฟล์
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => alert('ดาวน์โหลดไฟล์: ' + doc.file.name)}
                    >
                      ดาวน์โหลด
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => alert('แก้ไขไฟล์: ' + doc.file.name)}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      ลบ
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Document;
