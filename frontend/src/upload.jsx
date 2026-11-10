import React, { useState } from "react";
import './styles/upload.css';
import Nav from './components/nav';

function UploadFile() {
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fileName || !file) {
            setMessage("Please enter a file name and select a file.");
            return;
        }

        const formData = new FormData();

        formData.append("fileName", fileName);
        formData.append("file", file);

        try {
            setLoading(true);
            setMessage("");

            const response = await fetch("http://localhost:3000/files/upload", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Upload failed");
            }

            setMessage(data.message);

            setFileName("");
            setFile(null);

            e.target.reset();

        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <div className="uploadFormSection">

                <h2>Upload Geospatial File</h2>

                <form onSubmit={handleSubmit}>

                    <div className="inputGroup">
                        <label>File Name</label>
                        <input
                            type="text"
                            placeholder="Enter file name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Select File</label>
                        <input
                            type="file"
                            accept=".geojson,.json,.tif,.tiff"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                    </div>

                    {file && (
                        <p className="selected-file">
                            Selected: {file.name}
                        </p>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Uploading..." : "Upload File"}
                    </button>

                    {message && (
                        <p className="upload-message">{message}</p>
                    )}

                </form>
            </div>
        </>
    );
}

export default UploadFile;
