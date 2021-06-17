import {useEffect, useState} from 'react'
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { eyeSharp, refreshSharp, starHalfSharp, starOutline, starSharp } from 'ionicons/icons';
import {quizConfig, answerConfig} from './QuizInterface'
import "./Result.css";

const Result: React.FC = () => {
  const [currentChoices, setCurrentChoices] = useState<object[]>([])
  const [currentQuizzes, setCurrentQuizzes] = useState<quizConfig[]>([])

  function getStars(rating: number) {

    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];
    let count = 0;
  
    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
      output.push(<IonIcon icon={starSharp} key={++count} />);
  
    // If there is a half a star, append it
    if (i == .5) output.push(<IonIcon icon={starHalfSharp} key={++count} />);
  
    // Fill the empty stars
    for (let i = (5 - rating); i >= 1; i--)
      output.push(<IonIcon icon={starOutline} key={++count} />);
  
    return output;
  
  }

  useEffect(() => {
    setCurrentChoices(JSON.parse(localStorage.getItem('currentChoices')??'[]'))
    setCurrentQuizzes(JSON.parse(localStorage.getItem('currentQuizzes')??'[]'))
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Résultat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-text-center">
        <IonText>
          <h2>Score</h2>
        </IonText>
        <div className="score-container">
          <div className="score text-white">
            <h1>{currentChoices.filter((item: any) => item.choice.is_correct).length}/{currentChoices.length}</h1>
          </div>
        </div>
        <div className="star">
          {getStars((currentChoices.filter((item: any) => item.choice.is_correct).length * 5) / currentChoices.length)}
        </div>
        <div>
          <h2>Quiz terminé avec succès</h2>
          <p>Vous avez fait {currentChoices.length} questions et à partir de cela {currentChoices.filter((item: any) => item.choice.is_correct).length} réponse(s) sont correctes dans le quiz</p>
        </div>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonButton routerLink={`/page/quiz/category/${currentQuizzes.length ? currentQuizzes[0].category_id : ''}`} color="primary"><IonIcon icon={refreshSharp} slot="start" /> Rejouer</IonButton>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonButton routerLink='/page/answers' color="primary"><IonIcon icon={eyeSharp} slot="start" /> Voir la corrections</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Result;
