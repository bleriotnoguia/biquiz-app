import { IonButton, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { eyeSharp, refreshSharp } from 'ionicons/icons';
import "./Result.css";
import { useAppSelector } from '../hooks';
import { Choice, deleteChoices } from '../slices/currentQuizSlice';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { checkIsCorrect, getStars } from '../utils';
import { useTranslation } from 'react-i18next';

const Result: React.FC = () => {
  const choices = useAppSelector(state => state.currentQuiz.choices)
  const questions = useAppSelector(state => state.currentQuiz.questions)
  const { category_id } = useParams<{ category_id: string }>();
  const {t} = useTranslation();
  const dispatch = useDispatch()
  let history = useHistory()

  const replay = () => {
    dispatch(deleteChoices())
    history.push(`/page/quiz/category/${category_id }`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{t('result')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-text-center">
        <IonText>
          <h2>Score</h2>
        </IonText>
        <div className="score-container">
          <div className="score text-white">
            <h1>{choices.filter((item: Choice) => checkIsCorrect(item, questions)).length}/{choices.length}</h1>
          </div>
        </div>
        <div className="star">
          {getStars((choices.filter((item: Choice) => checkIsCorrect(item, questions)).length * 5) / choices.length)}
        </div>
        <div>
          <h2>{t('resultTitle')}</h2>
          <p>{t('resultDescription1')} {choices.length} {t('resultDescription2')} {choices.filter((item: Choice) => checkIsCorrect(item, questions)).length} {t('resultDescription3')}</p>
        </div>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonButton onClick={() => replay()} color="primary"><IonIcon icon={refreshSharp} slot="start" />{t('replay')}</IonButton>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonButton routerLink='/page/answers' color="primary"><IonIcon icon={eyeSharp} slot="start" /> {t('displayAnswers')}</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Result;
