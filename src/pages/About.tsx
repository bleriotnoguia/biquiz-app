import { IonAlert, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {useState} from 'react'
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing'
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {

  const [showAlert, setShowAlert] = useState(false);
  const {t} = useTranslation();

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
          <IonTitle>{t('about')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonList>
        <IonItem>
          <IonLabel onClick={() => contactDev()}>
            <h3>{t('contactDev')}</h3>
            <p color="gray">{t('emailDev')}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel onClick={() => shareApp()}>
            <h3>{t('share')}</h3>
            <p color="gray">{'shareApp'}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel onClick={() => window.open("https://www.bleriotnoguia.com")}>
            <h3>{t('rate')}</h3>
            <p color="gray">{t('rateApp')}</p>
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
            <h3>{t('privacyRule')}</h3>
            <p color="gray">{t('clickForMoreInfo')}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h3>{t('versionApp')}</h3>
            <p color="gray">1.0</p>
          </IonLabel>
        </IonItem>
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
