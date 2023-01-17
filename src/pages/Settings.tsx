import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonLabel,
  IonToggle,
  IonAlert,
} from "@ionic/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks";
import { setIsDarkMode, setIsEasy, setDisplaySource } from "../slices/settingSlice";
import "./Settings.css";

const Settings: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.setting.isDarkMode);
  const displaySource = useAppSelector((state) => state.setting.displaySource);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

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
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Choisir un niveau"}
            message={"Le niveau difficile desactive l'aide"}
            buttons={[
              {
                text: "Difficile",
                cssClass: "secondary",
                handler: () => {
                  dispatch(setIsEasy(false));
                },
              },
              {
                text: "Facile",
                handler: () => {
                  dispatch(setIsEasy(true));
                },
              },
            ]}
          />
          {/* <IonItem>
          <IonLabel onClick={() => setShowAlert(true)}>
            <h3>Niveau</h3>
            <p>{isEasy ? 'Facile' : 'Difficile'}</p>
          </IonLabel>
        </IonItem> */}
          <IonItem>
            <IonLabel>Thème sombre</IonLabel>
            <IonToggle
              slot="end"
              id="themeToggle"
              checked={isDarkMode}
              onIonChange={(e) => dispatch(setIsDarkMode(e.detail.checked))}
            ></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>Montrer la source dans le quiz</IonLabel>
            <IonToggle
              slot="end"
              id="themeToggle"
              checked={displaySource}
              onIonChange={(e) => dispatch(setDisplaySource(e.detail.checked))}
            ></IonToggle>
          </IonItem>
          {/* <IonItem>
          <IonLabel>Effet</IonLabel>
          <IonToggle slot="end"></IonToggle>
        </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
