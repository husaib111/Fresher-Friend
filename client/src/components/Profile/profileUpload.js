import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./profileUpload.css";

function ProfileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault()
    var formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
	console.log("hi");
	console.log(formData);
	// window.location.href = "/myAccount";
	await Axios({
	    method: "post",
	    url: "https://www.fresher-friend.bham.team/profile",
	    data: formData,
	    withCredentials: true,
	    headers: { "Content-Type": "multipart/form-data" }
	}
	);
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

    return (
	<div className="profileUpload">
	    <h1>Profile Upload</h1>
	    <form onSubmit={handleSubmit}>
		<input type="file" name="data" onChange={handleFileSelect} encType="multipart/form-data"/>
		<input type="submit" value="Upload File" />
	    </form>
	    </div>
  )
}

export default ProfileUpload;
