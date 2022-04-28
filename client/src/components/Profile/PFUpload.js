import React from "react";
import Axios from "axios";

function PFUpload() {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault()
    var formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
	console.log("hi");
	console.log(formData);
	await Axios({
	    method: "post",
	    url: "https://fresher-friend.bham.team:5001/profile",
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
    <form onSubmit={handleSubmit}>
      <input type="file" name="data" onChange={handleFileSelect} encType="multipart/form-data"/>
      <input type="submit" value="Upload File" />
    </form>
  )
}

export default PFUpload;
