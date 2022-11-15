import React from 'react';
import {
  IonModal,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { flag, checkmarkCircle } from "ionicons/icons";

import './FeedBack.css';

interface Props {
  handleCloseModal: () => void; 
  nextQuiz: () => void; 
  isOpen: boolean;
}

const FeedBack : React.FC<Props> = (props) =>  {
  return (
    <IonModal backdropDismiss={false} isOpen={props.isOpen} id="feedback-modal" >
      <div className="wrapper">
        <div className='feeback-header'>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <IonIcon icon={checkmarkCircle} />
            <h2>Bonne réponse !</h2>
          </div>
          <div>
            <IonIcon icon={flag} />
          </div>
        </div>
        <div style={{textAlign: 'center'}}>
          <IonButton size='default' style={{width: '90%', fontWeight: 'bold'}} onClick={props.nextQuiz}>Continuer</IonButton>
        </div>
      </div>
    </IonModal>
  );
}

export default FeedBack;