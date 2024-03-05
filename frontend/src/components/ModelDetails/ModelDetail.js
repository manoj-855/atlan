import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ModelDetail.css";
import Topup from ".././TopupModal/Topup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AddImage from "../../assets/img/add-image.jpeg";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaShareNodes } from "react-icons/fa6";
import { Modal } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const ModelDetail = () => {
  const location = useLocation();
  const model = location.state?.model;
  const [output, setOutput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [textValue, setTextValue] = useState("");
  const [type, setType] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [valueData, setValueData] = useState("");
  const [needRerender, setNeedRerender] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1);
  };

  useEffect(() => {
    if (needRerender) {
      setNeedRerender(false);
    }
    if (model.input_type === "Image") {
      setType(false);
    }
    if (model.title === "YOLO") {
      setValueData("objectt");
    } else if (model.title === "OCR - Text Extractor") {
      setValueData("image");
    } else {
      setValueData("text");
    }
  }, [model.input_type, model.title, needRerender, selectedImage]);
  const showAlert = () => {
    setShowModal(false);
    alert("Error for now,soon business logic will be implemented");
    setNeedRerender(true);
  };

  const handleChange = (e) => {
    if (type) {
      setTextValue(e.target.value);
    } else {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const dataURL = reader.result;
        setSelectedImage(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleTryModelClick = () => {
    setIsVisible(false);
  };

  const handleReset = () => {
    setTextValue("");
    setSelectedImage(null);
    setOutput("");
  };

  const GPT_Text = async (data) => {
    try {
      console.log(valueData);
      const response = await axios.post("http://localhost:3001/api/model", {
        data,
        valueData,
      });
      return response;
    } catch (error) {
      return showAlert();
    }
  };

  const tryModel = async () => {
    if (textValue === "" && selectedImage === null) {
      alert("Please enter the input data");
    }
    setShowModal(true);
    try {
      const data = type ? textValue : selectedImage;
      const response = await GPT_Text(data);
      console.log(response.data);
      const Finalresult =
        valueData === "image"
          ? response.data.text
          : valueData === "object"
          ? response.data.results.map((result) => result.label).join(",")
          : response.data.result;
      setOutput(Finalresult);
    } catch (error) {
      return showAlert();
    } finally {
      setShowModal(false);
      setIsVisible(true);
    }
  };

  const tryShare = async () => {
    alert("Sharing Model link feature will come soon");
  };
  const tryRate = async () => {
    alert("Rating feature will come soon");
  };
  return (
    <>
      <Helmet>
        <title>{model.title}</title>
        <meta name="description" content="Model Page " />
      </Helmet>
      <div className="card model-container">
        <div className="top">
          <div className="back">
            <a href="/explore">
              <IoMdArrowRoundBack
                style={{ fontSize: "4em", color: "#007bff" }}
              />
            </a>
          </div>
          <div className="titletop">
            <h1 className="model-title-detail">
              {model.title} - {model.category}
            </h1>
          </div>
          <div className="top-left">
            <div className="rate-btn">
              <Button onClick={() => setOpenModal(true)}>Give rating</Button>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Rate the Model</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <div>
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <FaStar
                            key={index}
                            size={20}
                            color={rating >= index + 1 ? "gold" : "gray"}
                            onClick={() => handleClick(index)}
                          />
                        ))}
                    </div>
                  </div>
                  <input placeholder="Provide your valuable feedback" className="textarea" />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setOpenModal(false)}>Submit</Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="share">
              <Button onClick={tryRate} className="btn-share">
                <FaShareNodes
                  style={{
                    fontSize: "1.5em",
                    color: "#97b9fc",
                    fontWeight: "bold",
                  }}
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="description">
          <div className="card-body">
            <p>
              <strong>Description:</strong> {model.description}
            </p>
            <p>
              <strong>Provider:</strong> {model.provider}
            </p>
          </div>
        </div>
        {showModal && <Topup data="building" />}
        <div className="card-content">
          <div className="details-section">
            <div className="model-section card use-case-card">
              <div className="card-body">
                <h4>Use Cases</h4>
                <ul>
                  {model.use_cases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="output">
              <h4>Output</h4>
              <p>{output}</p>
            </div>
          </div>
          <div className="execution-section">
            <div className="model-section card">
              <div className="card-body">
                <div className="code-snippet">
                  <h4>Demo Code</h4>
                  <div className="code-frame">
                    <pre>
                      <code>{model.code_snippet}</code>
                    </pre>
                  </div>
                </div>
                <div>
                  <div style={{ display: `${isVisible ? "block" : "none"}` }}>
                    <button
                      onClick={handleTryModelClick}
                      className="try-model-btn"
                    >
                      Run Code
                    </button>
                  </div>
                  <div
                    style={{
                      display: `${isVisible ? "none" : "block"}`,
                      width: "100%",
                    }}
                  >
                    <div className="text-area-detail">
                      {type ? (
                        <textarea
                          value={textValue}
                          rows="3"
                          onChange={handleChange}
                          placeholder="Enter Text"
                        ></textarea>
                      ) : (
                        <div className="image-upload-container-details">
                          <input
                            type="file"
                            id="fileInput"
                            onChange={handleChange}
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor="fileInput"
                            className="image-upload-label-create"
                          >
                            {selectedImage ? (
                              <img
                                src={selectedImage}
                                alt="Uploaded"
                                className="uploaded-image-create"
                              />
                            ) : (
                              <img
                                src={AddImage}
                                alt="Add-Gallery"
                                className="add-image-modal"
                                loading="lazy"
                              />
                            )}
                          </label>
                        </div>
                      )}
                    </div>
                    <div
                      className="submit-button"
                      style={{ textAlign: "left" }}
                    >
                      <Button className="sub" type="submit" onClick={tryModel}>
                        Submit
                      </Button>
                      <Button
                        className="sub"
                        onClick={handleReset}
                        type="reset"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelDetail;
