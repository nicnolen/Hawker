import React from 'react';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';


import imagesData from './imagesData.json';

function Homepage() {
  return (
    <div className="itemContainer">
      {imagesData.map((image, i) => (
        <CCard  loading="lazy" key={i}>
          <CCardImage orientation="top" {...imagesData[i]} alt={imagesData[i].alt} width="100%" />
          <CCardBody>
            <CCardTitle>{imagesData[i].alt}</CCardTitle>
            <CCardText>
              {imagesData[i].category}
            </CCardText>
            <CCardText>
            {imagesData[i].description}
            </CCardText>
            
            <CButton href="#">Purchase</CButton>
          </CCardBody>
        </CCard>
      ))}
    </div>
  );
}

export default Homepage;
