import { IonAlert, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {useState} from 'react'
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing'

const About: React.FC = () => {

  const [showAlert, setShowAlert] = useState(false);

  const contactDev = () => {
    SocialSharing.shareViaEmail('Body', 'Utilisateur de biquiz', ['contact@bleriotnoguia.com']).then(() => {
      // Success!
    }).catch((e) => {
      // Error!
      throw new Error(e);
    });
  }

  const shareApp = () => {
    SocialSharing.share("J'ai utilisé cette application et je pense que toi aussi tu l'apprécieras", "Merci d'installer cette application", "", "biquiz.bleriotnoguia.com")
  }

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
          <IonLabel onClick={() => contactDev()}>
            <h3>Email au  programmeur</h3>
            <p color="gray">Envoyer un email au  programmeur</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel onClick={() => shareApp()}>
            <h3>Recommander</h3>
            <p color="gray">Partager l'application</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel onClick={() => window.open("https://www.bleriotnoguia.com")}>
            <h3>Noter</h3>
            <p color="gray">Noter l’application</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={'Coming soon'}
            message={'Ce contenu est en cours de rédaction.'}
            buttons={['OK']}
          />
          <IonLabel onClick={() => setShowAlert(true)}>
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
