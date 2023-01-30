import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Settings from './pages/Settings';
import About from './pages/About';
import Quiz from './pages/quiz/Quiz';
import Home from './pages/home/Home';
import Result from './pages/Result';
import Answers from './pages/Answers';

import { useIonRouter } from '@ionic/react';
import { App as MyApp } from '@capacitor/app';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import {useEffect} from 'react';
import { homeSharp, informationCircle, settingsSharp } from 'ionicons/icons';

setupIonicReact();

const App: React.FC = () => {

const ionRouter = useIonRouter();

useEffect(() => {
  // MyApp.addListener('backButton', () => {
  //   if (!ionRouter.canGoBack()) {
  //     MyApp.exitApp();
  //   }
  // });
}, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/:tab(settings)" component={Settings} />
            <Route path="/:tab(about)" component={About}  />
            <Route path="/" component={Home} exact={true} />
            <Route path="/page/quiz/category/:category_id" component={Quiz} />
            <Route path="/page/result/:category_id" component={Result} />
            <Route path="/page/answers" component={Answers} />
            <Route path="/:tab(games)" component={Games} />
            <Route path="/page/game/:id" component={GameDetails} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href='/'>
              <IonIcon icon={homeSharp} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="settings" href='/settings'>
              <IonIcon icon={settingsSharp} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>

            <IonTabButton tab="about" href='/about'>
              <IonIcon icon={informationCircle} />
              <IonLabel>About</IonLabel>
            </IonTabButton>

            {/* <IonTabButton tab="games" href='/games'>
              <IonIcon icon={informationCircle} />
              <IonLabel>Games</IonLabel>
            </IonTabButton> */}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
