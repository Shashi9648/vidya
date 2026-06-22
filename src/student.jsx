import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBook,
  FaGift,
  FaVenusMars,
  FaCity,
  FaAsterisk
} from "react-icons/fa";

function StudentForm() {
  const { referralCode } = useParams();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    mandalCity: "",
    state: "",
    higherEducation: "",
    courseInterested: "",
    referralCode: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (referralCode) {
      setFormData((prev) => ({
        ...prev,
        referralCode: referralCode
      }));
    }
  }, [referralCode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits and start with 6, 7, 8, or 9";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.mandalCity.trim()) {
      newErrors.mandalCity = "City / Mandal is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.higherEducation) {
      newErrors.higherEducation = "Please select higher education";
    }

    if (!formData.courseInterested) {
      newErrors.courseInterested = "Please select course";
    }

    setErrors(newErrors);

    if (
      newErrors.fullName ||
      newErrors.email ||
      newErrors.phone ||
      newErrors.gender
    ) {
      setStep(1);
    } else if (
      newErrors.address ||
      newErrors.mandalCity ||
      newErrors.state
    ) {
      setStep(2);
    } else if (
      newErrors.higherEducation ||
      newErrors.courseInterested
    ) {
      setStep(3);
    }

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Student Data:", formData);

    alert("Student form submitted successfully!");

    window.location.reload();
  };

  return (
    <div className="student-page">
      <form className="student-form" onSubmit={handleSubmit} noValidate>
        <div className="logo-box">
          <img
            src="https://vidhyapat.com/assets/images/logo/logo%20White.png"
            alt="Student Logo"
          />
          <h2>Student Registration Form</h2>
        </div>

        <div className="step-map">
          <div
            className={`step-item ${step > 1 ? "completed" : ""} ${
              step === 1 ? "active" : ""
            }`}
            onClick={() => setStep(1)}
          >
            <div className="step-circle">1</div>
            <span className="step-label">Student</span>
          </div>

          <div
            className={`step-item ${step > 2 ? "completed" : ""} ${
              step === 2 ? "active" : ""
            }`}
            onClick={() => setStep(2)}
          >
            <div className="step-circle">2</div>
            <span className="step-label">Address</span>
          </div>

          <div
            className={`step-item ${step === 3 ? "active" : ""}`}
            onClick={() => setStep(3)}
          >
            <div className="step-circle">3</div>
            <span className="step-label">Education</span>
          </div>
        </div>

        {step === 1 && (
          <>
            <h3>Student Details</h3>

            <div className="field">
              <label>
                <FaUser className="label-icon" />
                Full Name<FaAsterisk className="required-icon" />
              </label>
              <input
                className={errors.fullName ? "input-error" : ""}
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="error-text">{errors.fullName}</p>
              )}
            </div>

            <div className="row">
              <div className="field">
                <label>
                  <FaEnvelope className="label-icon" />
                  Email Address<FaAsterisk className="required-icon" />
                </label>
                <input
                  className={errors.email ? "input-error" : ""}
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="error-text">{errors.email}</p>
                )}
              </div>

              <div className="field">
                <label>
                  <FaPhone className="label-icon" />
                  Phone No<FaAsterisk className="required-icon" />
                </label>
                <input
                  className={errors.phone ? "input-error" : ""}
                  type="text"
                  name="phone"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                />
                {errors.phone && (
                  <p className="error-text">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>
                  <FaVenusMars className="label-icon" />
                  Gender<FaAsterisk className="required-icon" />
                </label>
                <select
                  className={errors.gender ? "input-error" : ""}
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="error-text">{errors.gender}</p>
                )}
              </div>

              <div className="field">
                <label>
                  <FaGift className="label-icon" />
                  Referral Code
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleChange}
                  disabled={!!referralCode}
                  placeholder="Optional referral code"
                />
              </div>
            </div>

            <div className="button-row">
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3>Address Details</h3>

            <div className="field">
              <label>
                <FaMapMarkerAlt className="label-icon" />
                Address<FaAsterisk className="required-icon" />
              </label>
              <input
                className={errors.address ? "input-error" : ""}
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="error-text">{errors.address}</p>
              )}
            </div>

            <div className="row">
              <div className="field">
                <label>
                  <FaCity className="label-icon" />
                  City / Mandal<FaAsterisk className="required-icon" />
                </label>
                <input
                  className={errors.mandalCity ? "input-error" : ""}
                  type="text"
                  name="mandalCity"
                  placeholder="Enter city or mandal"
                  value={formData.mandalCity}
                  onChange={handleChange}
                />
                {errors.mandalCity && (
                  <p className="error-text">{errors.mandalCity}</p>
                )}
              </div>

              <div className="field">
                <label>
                  <FaMapMarkerAlt className="label-icon" />
                  State<FaAsterisk className="required-icon" />
                </label>
                <input
                  className={errors.state ? "input-error" : ""}
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && (
                  <p className="error-text">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="button-row">
              <button type="button" onClick={prevStep}>
                Back
              </button>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3>Education Details</h3>

            <div className="row">
              <div className="field">
                <label>
                  <FaGraduationCap className="label-icon" />
                  Higher Education<FaAsterisk className="required-icon" />
                </label>
                <select
                  className={errors.higherEducation ? "input-error" : ""}
                  name="higherEducation"
                  value={formData.higherEducation}
                  onChange={handleChange}
                >
                  <option value="">Select Education</option>
                  <option value="10th">10th</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="diploma">Diploma</option>
                  <option value="degree">Degree</option>
                  <option value="btech">B.Tech</option>
                  <option value="masters">Masters</option>
                </select>
                {errors.higherEducation && (
                  <p className="error-text">
                    {errors.higherEducation}
                  </p>
                )}
              </div>

              <div className="field">
                <label>
                  <FaBook className="label-icon" />
                  Course Interested In<FaAsterisk className="required-icon" />
                </label>
                <select
                  className={errors.courseInterested ? "input-error" : ""}
                  name="courseInterested"
                  value={formData.courseInterested}
                  onChange={handleChange}
                >
                  <option value="">Select Course</option>
                  <option value="web-development">Web Development</option>
                  <option value="mern-stack">MERN Stack</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="data-science">Data Science</option>
                  <option value="digital-marketing">
                    Digital Marketing
                  </option>
                </select>
                {errors.courseInterested && (
                  <p className="error-text">
                    {errors.courseInterested}
                  </p>
                )}
              </div>
            </div>

            <div className="button-row">
              <button type="button" onClick={prevStep}>
                Back
              </button>
              <button type="submit">Submit Form</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default StudentForm;