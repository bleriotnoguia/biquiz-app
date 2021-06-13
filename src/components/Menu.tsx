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

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
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
    title: 'Partager',
    url: '/page/Share',
    iosIcon: shareSocialOutline,
    mdIcon: shareSocialSharp
  },
  {
    title: 'Autres jeux',
    url: '/page/Games',
    iosIcon: sparklesOutline,
    mdIcon: sparklesSharp
  },
  {
    title: 'Quitter',
    url: '/page/Quit',
    iosIcon: powerOutline,
    mdIcon: powerSharp
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
            //navigator["app"].exitApp()
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
