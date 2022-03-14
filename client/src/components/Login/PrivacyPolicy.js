import "./PrivacyPolicy.css";
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import privacyPolicy from "../../resources/PrivacyPolicy.pdf";

const PrivacyPolicy = () => {
  const [pageNumber, setPageNumber] = useState(null);

  function onDocumentLoadSuccess() {
    setPageNumber(1);
  }

  return (
    <div>
      <Document
        className="doc"
        title="FresherFriend's Privacy Policy"
        language="EN-UK"
        file={privacyPolicy}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page key={pageNumber} pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PrivacyPolicy;
