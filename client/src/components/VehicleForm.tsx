import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../index.css";

type VehicleData = {
  make: string;
  model: string;
  badge: string;
  fileContent: string;
};

const VehicleForm: React.FC = () => {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [badge, setBadge] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type !== "text/plain") {
      alert("Only .txt files are allowed!");
      e.target.value = ""; // Reset file input
    } else {
      setFile(selectedFile || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!make || !model || !badge || !file) {
      alert("Please fill out all fields and upload a .txt file!");
      return;
    }

    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("badge", badge);
    formData.append("logbook", file);

    try {
      const res = await fetch("http://localhost:3000/submit", {
        method: "POST",
        body: formData,
      });

      const data: VehicleData = await res.json();
      navigate("/upload", { state: data });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Vehicle Selection Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Make</label>
        <select value={make} onChange={(e) => setMake(e.target.value)}>
          <option value="">Select Make</option>
          <option value="ford">Ford</option>
          <option value="bmw">BMW</option>
          <option value="tesla">Tesla</option>
        </select>

        <label>Model</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          disabled={!make}
        >
          <option value="">Select Model</option>
          <option value="Ranger">Ranger</option>
          <option value="Falcon">Falcon</option>
        </select>

        <label>Badge</label>
        <select
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          disabled={!model}
        >
          <option value="">Select Badge</option>
          <option value="Raptor">Raptor</option>
        </select>

        <label>Upload Logbook (Only .txt)</label>
        <input type="file" accept=".txt" onChange={handleFileChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VehicleForm;
