import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import InternetErrorImg from '../.././assets/img/internetError.jpg';

const Internetconnection = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
      navigate('/');
    }
  
    const buttonStyle = {
      fontWeight: 700,
      letterSpacing: '0.8px',
      padding: '8px 8px',
      marginTop:'10px',
      background: '#88a7e3',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      fontSize: '18px',
      marginBottom: '12px',
      display: 'inline-block'
    };
  
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <img src={InternetErrorImg} alt="Internet Error" style={{width:"20%"}}/>
        <h3>No internet connection. Please check your connection. </h3>
        <button style={buttonStyle} onClick={navigateToHome}>
          <ArrowLeftCircle size={25} style={{ marginRight: '8px' }} /> Return to HomePage
        </button>
      </div>
    );
  }
  
export default Internetconnection
