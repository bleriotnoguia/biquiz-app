import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';
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
import {useEffect} from 'react'

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
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/page/settings">
              <Settings />
            </Route>
            <Route path="/page/about">
              <About />
            </Route>
            <Route path="/page/quiz/category/:category_id">
              <Quiz />
            </Route>
            <Route path="/page/result">
              <Result />
            </Route>
            <Route path="/page/answers">
              <Answers />
            </Route>
            <Route path="/page/games">
              <Games />
            </Route>
            <Route path="/page/game/:id">
              <GameDetails />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
