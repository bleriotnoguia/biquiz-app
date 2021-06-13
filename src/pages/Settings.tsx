import { IonBackButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonInput, IonToggle, IonText } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import {useState, useEffect} from 'react'
import './Settings.css';

const Settings: React.FC = () => {

  const [isDarkMode, setIsDarkMode] = useState(false)
  
  useEffect(() => {
    // Query for the toggle that is used to change between themes
    const toggle = document.getElementById('themeToggle');

    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    toggle?.addEventListener('ionChange', (ev: any) => {
      document.body.classList.toggle('dark', ev.detail.checked);
      localStorage.isDarkMode = ev.detail.checked
    });
    if(("isDarkMode" in localStorage) && JSON.parse(localStorage.isDarkMode)){
      setIsDarkMode(true)
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Paramètres</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>Niveau</h3>
            <p>Facile</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Thème sombre</IonLabel>
          <IonToggle slot="end" id="themeToggle" checked={isDarkMode} onIonChange={e => setIsDarkMode(e.detail.checked)}></IonToggle>
        </IonItem>
        <IonItem>
          <IonLabel>Musique</IonLabel>
          <IonToggle slot="end"></IonToggle>
        </IonItem>
        <IonItem>
          <IonLabel>Effet</IonLabel>
          <IonToggle slot="end"></IonToggle>
        </IonItem>
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
