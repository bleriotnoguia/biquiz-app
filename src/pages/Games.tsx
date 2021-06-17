import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams, useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import gamesList from '../data/gamesList.json'
import './Page.css';

interface gameConfig{
  id: number;
  title: string;
  description: Text;
}

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
        {gamesList.map((game, idx) => (
          <IonItem key={idx} onClick={() => history.push("/page/game/"+game.id)}>
            <IonLabel>
              <h3>{game.title}</h3>
              <div>
                {game.description.replace(/<[^>]*>?/gm, '').slice(0,35)+'...'}
              </div>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Games;
