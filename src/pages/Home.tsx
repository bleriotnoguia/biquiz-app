import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonList, IonItem, IonIcon, IonLabel, IonButton, IonRadio, IonRadioGroup, IonListHeader, IonItemDivider, IonGrid, IonRow, IonCol } from '@ionic/react';
import { bookSharp, personSharp, play, readerSharp } from 'ionicons/icons';
import {useState} from 'react'
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Home: React.FC = () => {
  const [selected, setSelected] = useState<string>('characters');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Accueil</IonTitle>
        </IonToolbar>
      </IonHeader>
    
      <IonContent fullscreen>
        <IonList>
          <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
            <IonListHeader>
              <IonLabel>Selectionner une categories</IonLabel>
              </IonListHeader>
            <IonItem>
              <IonIcon icon={personSharp} slot="start" />
              <IonLabel>Personnages</IonLabel>
              <IonRadio slot="end" value="characters" />
            </IonItem>
            <IonItem>
              <IonIcon icon={readerSharp} slot="start" />
              <IonLabel>Versets</IonLabel>
              <IonRadio slot="end" value="verses" />
            </IonItem>
            <IonItem>
              <IonIcon icon={bookSharp} slot="start" />
              <IonLabel>Livres</IonLabel>
              <IonRadio slot="end" value="books" />
            </IonItem>
          </IonRadioGroup>
          <IonItemDivider>Quiz sur les </IonItemDivider>
          <IonItem>{selected ?? '(none selected'}</IonItem>
        </IonList>
        <div className="ion-text-center">
          <IonButton routerLink='/page/quiz' color="primary"><IonIcon icon={play} slot="start" /> Commencer</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
