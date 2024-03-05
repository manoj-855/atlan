import React from 'react'

const Topup = (props) => {
  return (
    <div className="modal d-block" tabindex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', marginTop:"80px "}}>
           <div className="modal-dialog" role="document">
             <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title">Model is {props.data}.....</h5>
              </div>
             <div className="modal-body text-center">
                <div className="spinner-border text-primary" role="status">
               </div>
                 <p>Your awesome page will load within few seconds!!!</p>
             </div>
           </div>
          </div>
     </div>
  )
}

export default Topup;
