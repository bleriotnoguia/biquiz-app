import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { eyeSharp, refreshSharp, starHalfSharp, starOutline, starSharp } from 'ionicons/icons';
import "./Result.css";

const Result: React.FC = () => {

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
            <h1>15/20</h1>
          </div>
        </div>
        <div className="star">
          <IonIcon icon={starSharp} />
          <IonIcon icon={starSharp} />
          <IonIcon icon={starSharp} />
          <IonIcon icon={starHalfSharp} />
          <IonIcon icon={starOutline} />
        </div>
        <div>
          <h2>Quiz terminé avec succès</h2>
          <p>Vous avez fait 20 questions et à partir de cela 15 réponses sont correctes dans le quiz</p>
        </div>
        <IonButton routerLink='/page/quiz' color="primary"><IonIcon icon={refreshSharp} slot="start" /> Rejouer</IonButton>
        <IonButton routerLink='/page/answers' color="primary"><IonIcon icon={eyeSharp} slot="start" /> Voir la corrections</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Result;
