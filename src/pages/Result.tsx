import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { eyeSharp, refreshSharp } from 'ionicons/icons';
import './Result.css';
import { useAppSelector } from '../hooks';
import { Choice, deleteChoices } from '../slices/currentQuizSlice';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkIsCorrect, getStars } from '../utils';
import { useTranslation } from 'react-i18next';

const Result: React.FC = () => {
  const choices = useAppSelector(state => state.currentQuiz.choices);
  const questions = useAppSelector(state => state.currentQuiz.questions);
  const { category_id } = useParams<{ category_id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const correctCount = choices.filter((item: Choice) => checkIsCorrect(item, questions)).length;
  const total = choices.length;
  const stars = total > 0 ? (correctCount * 5) / total : 0;

  const replay = () => {
    dispatch(deleteChoices());
    history.push(`/page/quiz/category/${category_id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{t('result')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="result-content">
        {/* Hero section */}
        <div className="result-hero">
          <div className="result-score-circle">
            <span className="result-score-number">{correctCount}</span>
            <span className="result-score-total">/ {total}</span>
          </div>
          <div className="result-stars">{getStars(stars)}</div>
        </div>

        {/* Body */}
        <div className="result-body">
          <div className="result-message-card">
            <h2 className="result-message-title">{t('resultTitle')}</h2>
            <p className="result-message-desc">
              {t('resultDescription1')} <strong>{total}</strong> {t('resultDescription2')}{' '}
              <strong>{correctCount}</strong> {t('resultDescription3')}
            </p>
          </div>

          <div className="result-actions">
            <IonButton expand="block" className="result-btn" color="primary" onClick={replay}>
              <IonIcon icon={refreshSharp} slot="start" />
              {t('replay')}
            </IonButton>
            <IonButton expand="block" className="result-btn" fill="outline" color="primary" routerLink="/page/answers">
              <IonIcon icon={eyeSharp} slot="start" />
              {t('displayAnswers')}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Result;
