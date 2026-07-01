import { useState } from "react";
import "./SharePage.css";

function SharePage() {
  const [showPopup, setShowPopup] = useState(false);

  const referralCode = "test";

  const formLink = `https://vidhyavan.onrender.com/student-form/${referralCode}`;

  const message = `Please fill this student form: ${formLink}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(formLink);
    alert("Link copied successfully!");
  };

  return (
    <div className="share-page">
      <div className="share-card">
        <h1>Student Form Share Page</h1>
        <p>Click the button below to share the student form.</p>

        <button className="share-main-btn" onClick={() => setShowPopup(true)}>
          Share Form
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>

            <h2>Share Student Form</h2>

            <input
              className="link-input"
              type="text"
              value={formLink}
              readOnly
            />

            <button className="copy-btn" onClick={copyLink}>
              Copy Link
            </button>

            <div className="share-options">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noreferrer"
                className="whatsapp-btn"
              >
                WhatsApp
              </a>

              <a
                href={`mailto:?subject=Student Form&body=${encodeURIComponent(
                  message
                )}`}
                className="email-btn"
              >
                Email
              </a>

              <a
                href={`sms:?body=${encodeURIComponent(message)}`}
                className="sms-btn"
              >
                SMS
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SharePage;