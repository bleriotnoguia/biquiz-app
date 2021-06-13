import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';

const GameDetails: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Autres jeux</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding-start ion-padding-end">
          <h3>{name}</h3>
          <div className="text-dimgray">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nobis!</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum placeat odio rerum explicabo, unde aut!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, libero?</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GameDetails;
