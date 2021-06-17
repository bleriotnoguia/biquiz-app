import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { alertCircleSharp, alertCircleOutline, settingsOutline, settingsSharp, sparklesOutline, sparklesSharp, shareOutline, shareSharp, powerOutline, powerSharp, shareSocialOutline, shareSocialSharp, homeOutline, homeSharp } from 'ionicons/icons';
import './Menu.css';
import {SocialSharing} from '@ionic-native/social-sharing'
import { App } from '@capacitor/app';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const shareApp = () => {
  SocialSharing.share("J'ai utilisé cette application et je pense que toi aussi tu l'apprécieras", "Merci d'installer cette application", "", "biquiz.bleriotnoguia.com")
}

const appPages: AppPage[] = [
  {
    title: 'Accueil',
    url: '/',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'À propos',
    url: '/page/About',
    iosIcon: alertCircleOutline,
    mdIcon: alertCircleSharp
  },
  {
    title: 'Paramètres',
    url: '/page/settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  },
  {
    title: 'Autres jeux',
    url: '/page/Games',
    iosIcon: sparklesOutline,
    mdIcon: sparklesSharp
  }
];

const Menu: React.FC = () => {

  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Biquiz</IonListHeader>
          <IonNote>Quiz biblique</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname === '/page/Share' ? 'selected' : ''} onClick={() => shareApp()} routerDirection="none" lines="none" detail={false}>
              <IonIcon slot="start" ios={shareSocialOutline} md={shareSocialSharp} />
              <IonLabel>Partager</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname === '/page/Quit' ? 'selected' : ''} onClick={() => App.exitApp()} routerDirection="none" lines="none" detail={false}>
              <IonIcon slot="start" ios={powerOutline} md={powerSharp} />
              <IonLabel>Quitter</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
