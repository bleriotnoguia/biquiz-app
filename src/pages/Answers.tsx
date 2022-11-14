import {useState, useEffect} from 'react'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { checkboxSharp, checkmarkSharp, closeSharp, stopOutline } from 'ionicons/icons';
import {answerConfig} from './QuizInterface'
import '../App.css';

const Answers: React.FC = () => {
  const [currentQuizzes, setCurrentQuizzes] = useState<any[]>([])

  useEffect(() => {
    let current = JSON.parse(localStorage.getItem('currentQuizzes')??'[]')
    let newCurrent = current.map((quiz: any) => {
      quiz.choice = JSON.parse(localStorage.getItem('currentChoices')??'[]').find((elt:any) => elt.quiz_id === quiz.id).choice
      return quiz
    })
    setCurrentQuizzes(newCurrent)
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Résultat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding-start">
          <IonText color="primary" >
            <h4>Corrections</h4>
          </IonText>
        </div>
          <IonItemDivider>
            <p className="m-0">Score : {currentQuizzes.filter((item: any) => item.choice.is_correct).length}/{currentQuizzes.length}</p>
          </IonItemDivider>
        <IonList>
          {currentQuizzes.map((item, idx) => (
            <div key={idx}>
              <IonItem>
              <IonIcon icon={item.choice.is_correct ? checkmarkSharp : closeSharp} slot="end" color={item.choice.is_correct ? "success" : "danger"} />
              <div>
                <h4>Quiz {idx+1}</h4>
                <p className="text-dimgray">{item.content}</p>
              </div>
            </IonItem>
            {item.answers.map((answer: answerConfig, index:number) => (<IonItem key={index}>
              <IonIcon slot="start" icon={(answer.is_correct || (item.choice.id === answer.id) ) ? checkboxSharp : stopOutline} color={answer.is_correct ? "success" : (item.choice.id === answer.id) ? "danger" : ""} />
              <IonLabel color={answer.is_correct ? "success" : (item.choice.id === answer.id) ? "danger" : ""}>
                {answer.content}  
              </IonLabel>
            </IonItem>))}
            <IonItemDivider>
              Source: {item.hint} 
            </IonItemDivider>
            </div>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Answers;
