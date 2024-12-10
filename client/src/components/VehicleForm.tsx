import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../index.css";

const MODELS: Record<string, Record<string, string[]>> = {
  ford: {
    Ranger: ["Raptor", "Raptor X", "Wildtrak"],
    Falcon: ["XR6", "XR6 Turbo", "XR8"],
    "Falcon Ute": ["XR6", "XR6 Turbo"],
  },
  bmw: {
    "130d": ["xDrive 26d", "xDrive 30d"],
    "240i": ["xDrive 30d", "xDrive 50d"],
    "320e": ["xDrive 75d", "xDrive 80d", "xDrive 85d"],
  },
  tesla: {
    "Model 3": ["Performance", "Long Range", "Dual Motor"],
  },
};

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
      e.target.value = "";
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

  const handleQuickSelect = (
    selectedMake: string,
    selectedModel: string,
    selectedBadge: string
  ) => {
    setMake(selectedMake);
    setModel(selectedModel);
    setBadge(selectedBadge);
  };

  return (
    <div className="form-container">
      <h2>Vehicle Selection Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Make</label>
        <select
          value={make}
          onChange={(e) => {
            setMake(e.target.value);
            setModel("");
            setBadge("");
          }}
        >
          <option value="">Select Make</option>
          {Object.keys(MODELS).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>

        {make && (
          <>
            <label>Model</label>
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setBadge("");
              }}
            >
              <option value="">Select Model</option>
              {Object.keys(MODELS[make]).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </>
        )}

        {model && (
          <>
            <label>Badge</label>
            <select value={badge} onChange={(e) => setBadge(e.target.value)}>
              <option value="">Select Badge</option>
              {MODELS[make][model].map((badge) => (
                <option key={badge} value={badge}>
                  {badge}
                </option>
              ))}
            </select>
          </>
        )}

        {badge && (
          <>
            <label>Upload Logbook (Only .txt)</label>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            <button type="submit">Submit</button>
          </>
        )}
      </form>

      <div className="quick-select-buttons">
        <h3>Quick Select Options</h3>
        <button onClick={() => handleQuickSelect("ford", "Ranger", "Raptor")}>
          Ford Ranger Raptor
        </button>
        <button
          onClick={() => handleQuickSelect("tesla", "Model 3", "Performance")}
        >
          Tesla Model 3 Performance
        </button>
      </div>
    </div>
  );
};

export default VehicleForm;
