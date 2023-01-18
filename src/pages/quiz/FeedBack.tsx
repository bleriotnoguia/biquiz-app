import React from 'react';
import {
  IonModal,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { checkmarkCircle, closeCircleSharp } from "ionicons/icons";

import './FeedBack.css';
import { QuestionOption } from '../../slices/currentQuizSlice';

interface Props {
  handleCloseModal: () => void; 
  nextQuiz: () => void; 
  isOpen: boolean;
  feedback: {goodAnswer: QuestionOption, success: boolean} | undefined;
}

const FeedBack : React.FC<Props> = (props) =>  {
  return (
    <IonModal backdropDismiss={false} isOpen={props.isOpen} id="feedback-modal" >
      <div className="wrapper">
        <div className='feeback-header'>
          <div style={{display: 'flex', alignItems: 'center'}}>
            {props.feedback?.success ? <>
              <IonIcon color={'success'} icon={checkmarkCircle} />
              <h2>Bonne réponse !</h2> 
            </> : <>
              <IonIcon color={'danger'} icon={closeCircleSharp} />
              <h4>{ "La bonne réponse est : " + props.feedback?.goodAnswer.name }</h4>
            </>}
          </div>
          {/* <div>
            <IonIcon icon={flag} />
          </div> */}
        </div>
        <div style={{textAlign: 'center'}}>
          <IonButton color={props.feedback?.success ? 'success':'danger'} size='default' style={{width: '90%', fontWeight: 'bold', color: 'black', fontSize: '1.1em'}} onClick={props.nextQuiz}>Continuer</IonButton>
        </div>
      </div>
    </IonModal>
  );
}

export default FeedBack;