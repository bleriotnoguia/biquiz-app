import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams, useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Games: React.FC = () => {

  let history = useHistory()

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
      <IonItemDivider>
        <p>Collections de petits jeux bibliques</p>
      </IonItemDivider>
      <IonList>
        <IonItem onClick={() => history.push("/page/gamedetails/emoji")}>
          <IonLabel>
            <h3>Serie emoji</h3>
            <p>Lorem ipsum dolor sit.</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>Noms biblique</h3>
            <p>Lorem ipsum dolor ipsum sit.</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>Quiz suis je ?</h3>
            <p>Lorem ipsum dolor ipsum sit.</p>
          </IonLabel>
        </IonItem>
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Games;
