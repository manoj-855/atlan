import {React} from 'react';
import '../ModelCard.css';
import { useNavigate } from 'react-router-dom';

const ExploreModels = ({ model }) => {
  let navigate = useNavigate();

  const navigateToPage = () => {
    navigate(`/details/${model.title}`,{ state: { model:model} });
  };

  return (
    <div className="explore-model-container">
      <div className= "model-card proj-imgbx " onClick={navigateToPage}>
      <img src={model.imageUrl} alt={model.title} className="model-photo" />
      <div className="proj-txtx">
            <h4>Learn More</h4>
      </div>
      <div className="model-card-content">
        <div className="model-detail">
          <h3 className="model-title">{model.title}</h3>
          <p className="model-category">{model.category}</p>
        </div>
        
      </div>
    </div>
  </div>
    )
  
}

export default ExploreModels
