import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

const Error = (props) => {

    const navigate = useNavigate();

    const navigateToHome = () => {
      navigate('/');
    }

  return (
    <div className="not-found">
      <h1 style={{color:"red"}}>Error</h1>
      <p>Sorry, the page ran into an error.</p>
    
      <button  onClick={navigateToHome}>
        <ArrowLeftCircle size={25} style={{ marginRight: '8px' }} /> Return to HomePage
      </button>
    </div>
  );
};

export default Error;
