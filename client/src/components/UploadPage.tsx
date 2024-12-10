import React from "react";
import { useLocation, Location } from "react-router-dom";
import "./../index.css";

type VehicleData = {
  make: string;
  model: string;
  badge: string;
  fileContent: string;
};

const UploadPage: React.FC = () => {
  const location: Location = useLocation();
  const data = location.state as VehicleData;

  if (!data) {
    return (
      <div className="result-container">
        <h2>No Data Found</h2>
        <p>Please submit the form first!</p>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h2>Submission Successful!</h2>
      <p>
        <strong>Make:</strong> {data.make}
      </p>
      <p>
        <strong>Model:</strong> {data.model}
      </p>
      <p>
        <strong>Badge:</strong> {data.badge}
      </p>
      <p>
        <strong>Logbook Content:</strong>
      </p>
      <pre className="file-content">{data.fileContent}</pre>
    </div>
  );
};

export default UploadPage;
