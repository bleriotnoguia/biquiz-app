import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const About: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>À propos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Email au  programmeur</h3>
            <p color="gray">Envoyer un email au  programmeur</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>Recommander</h3>
            <p color="gray">Partager l'application</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>Noter</h3>
            <p color="gray">Noter l’application</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>Règle de confidentialité et condition  d’utilisation</h3>
            <p color="gray">Appuyer pour plus d’informations</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>Version de l'application</h3>
            <p color="gray">1.0</p>
          </IonLabel>
        </IonItem>
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
