import { IonButton, IonButtons, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { eyeSharp, refreshSharp, starHalfSharp, starOutline, starSharp } from 'ionicons/icons';
import "./Result.css";
import { useAppSelector } from '../hooks';
import { Choice, deleteChoices } from '../slices/currentQuizSlice';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const Result: React.FC = () => {
  const choices = useAppSelector(state => state.currentQuiz.choices)
  const questions = useAppSelector(state => state.currentQuiz.questions)
  const dispatch = useDispatch()
  let history = useHistory()

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

  const checkIsCorrect = (item: Choice) => {
    let question = questions.find(q => q.id === item.question_id)
    let choice = question?.options.find(c => c.id === item.choice_id)
    return choice?.is_correct
  }

  const replay = () => {
    dispatch(deleteChoices())
    history.push(`/page/quiz/category/${questions.length ? questions[0].category_id : ''}`)
  }

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
            <h1>{choices.filter((item: Choice) => checkIsCorrect(item)).length}/{choices.length}</h1>
          </div>
        </div>
        <div className="star">
          {getStars((choices.filter((item: Choice) => checkIsCorrect(item)).length * 5) / choices.length)}
        </div>
        <div>
          <h2>Quiz terminé avec succès</h2>
          <p>Vous avez fait {choices.length} questions et à partir de cela {choices.filter((item: Choice) => checkIsCorrect(item)).length} réponse(s) sont correctes dans le quiz</p>
        </div>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonButton onClick={() => replay()} color="primary"><IonIcon icon={refreshSharp} slot="start" /> Rejouer</IonButton>
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
