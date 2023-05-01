import React, { useState } from 'react';
import Papa from 'papaparse';

function FileUploader() {
    const [jsonData, setJsonData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            if (file.type === 'application/json') {
                const parsedData = JSON.parse(fileContent);
                console.log(jsonData)

                setJsonData(parsedData);
            } else if (file.type === 'text/csv') {
                const parsedData = Papa.parse(fileContent, { header: true });
                const jsonData = parsedData.data;
                console.log(jsonData.slice(0, 100))
                setJsonData(jsonData);
            } else {
                alert('Unsupported file format!');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div style={{ background: "#1a2b3a", color: "#fff", padding: "1em" }}>
            <input type="file" accept=".csv,.json" onChange={handleFileUpload} /><br /><br />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {jsonData && jsonData.slice(0, 150).map((elem, index) => {
                    return (
                        <div key={index} style={{ flex: "1 0 250px", margin: "0.3em", borderRadius: "4px", padding: "0.2em", backgroundColor: "#fff", color: "#000", border: "1px solid #000" }}>
                            {elem.sentiment && <p style={{ padding: "0.2em", background: (elem.sentiment === '1') ? "green" : "red", borderRadius: "4px", fontWeight: "bold", color: "#fff" }}>{elem.sentiment}</p>}
                            <br />
                            <p style={{ textAlign: "justify" }}>{elem.Review || elem.lexicons}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default FileUploader;
