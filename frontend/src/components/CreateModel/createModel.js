import { React, useState, useContext } from "react";
import "./createModel.css"; // Make sure to import the CSS file
import AddImage from "../../assets/img/add-image.jpeg";
import { useEffect } from "react";
import GitHubDataContext from "./../context/Datacontext";
import Topup from "./../TopupModal/Topup";
import Loading from "./../../utils/Loading";
import Error from "./../../utils/Error";
import { IoMdArrowRoundBack } from "react-icons/io";

const CreateModelCard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [needRerender, setNeedRerender] = useState(false);
  const [currentUseCase, setCurrentUseCase] = useState("");
  const { data, isLoading, error } = useContext(GitHubDataContext);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    category: "",
    provider: "",
    description: "",
    popularity: "7",
    input_type: "",
    use_cases: [],
    code_snippet: "..",
    imageUrl:
      "https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg",
  });
  useEffect(() => {
    if (needRerender) {
      setNeedRerender(false);
    }
    if (!data || data.length === 0) {
      return;
    }
    const getNextId = () => {
      if (!data.length) return 1;
      const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
      return maxId + 1;
    };

    const newId = getNextId(data);
    setFormData((formData) => ({ ...formData, id: newId }));
  }, [needRerender, data]);

  if (!data) {
    return <Loading />;
  }

  const showAlert = () => {
    setShowModal(false);
    alert("Some error occured, Please try again");
    setNeedRerender(true);
  };

  const handleUseCaseChange = (e) => {
    setCurrentUseCase(e.target.value);
  };
  const addUseCase = (e) => {
    if (!currentUseCase.trim()) return; // Ignore empty strings

    setFormData((prevFormData) => ({
      ...prevFormData,
      use_cases: [...prevFormData.use_cases, currentUseCase.trim()],
    }));

    setCurrentUseCase(""); // Reset input field
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxFileSize = 1 * 1024 * 1024;
      if (file.size > maxFileSize) {
        alert("File size should not exceed 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        setSelectedImage(dataURL);
        setFormData((formData) => ({ ...formData, imageUrl: dataURL }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        alert(`Please fill out the ${key} field.`);
        setShowModal(false);
        return;
      }
    }
    setShowModal(true);
    if (formData.use_cases.length === 0) {
      setShowModal(false);
      return alert(`Please fill out the testcases field.`);
    }
    const serverEndpoint = "http://localhost:3001/api/update-model";
    try {
      const response = await fetch(serverEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Update successful:", jsonResponse);
      } else {
        return showAlert();
      }
    } catch (error) {
      return showAlert();
    }
    setShowModal(false);
    setTimeout(() => {
      alert("Model created");
    }, 300);
  };

  if (isLoading) return <Loading />;
  if (error)
    return <Error message={"Error while fetching data, Please try again."} />;
  return (
    <div className="outer-card-create">
      {showModal && <Topup data="creating" />}
      <div className="topcreate">
      
          <a href="/explore">
            <IoMdArrowRoundBack style={{ fontSize: '3em' ,color: "#97b9fc"}} />
          </a>
        
        <h1 style={{ marginBottom: "30px",marginLeft:"25%", color: "white" }}>
          Create your own AI model
        </h1>
      </div>
      <div className="card-container-create">
        <div className="card-create">
          <h2 className="card-heading-create">Add Details</h2>
          <input
            type="text"
            placeholder="Model Name"
            name="title"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Model Category"
            name="category"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Provider"
            name="provider"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Input-Type"
            name="input_type"
            onChange={handleChange}
            required
          />
          <textarea
            rows={2}
            placeholder="Description"
            name="Description"
            onChange={handleChange}
            required
          ></textarea>
          <textarea
            rows={2}
            placeholder="Use Cases"
            name="use_cases"
            onChange={handleChange}
            required
            value={formData.use_cases.join(" , ")}
            readOnly
          ></textarea>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              style={{ maxWidth: "50%", marginRight: "20px" }}
              value={currentUseCase}
              onChange={handleUseCaseChange}
              placeholder="Enter use case"
              onKeyDown={(e) => e.key === "Enter" && addUseCase()}
            />
            <button className="add-usecase-btn" onClick={addUseCase}>
              Add Use Case
            </button>
          </div>
        </div>
        <div className="card-create">
          <h2 className="card-heading-create">Upload Image</h2>
          <div className="image-upload-container-create">
            <input
              //   key={inputKey}
              type="file"
              id="fileInput"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" className="image-upload-label-create">
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
        </div>
      </div>
      <div className="button-create-block">
        <button className="button-create" onClick={handleSubmit}>
          Create Model
        </button>
      </div>
    </div>
  );
};

export default CreateModelCard;
