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
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchCategories } from "../slices/categoriesSlice";
import { setIsDarkMode, setLanguage, setDisplaySource } from "../slices/settingSlice";
import "./Settings.css";

const Settings: React.FC = () => {
  const language = useAppSelector((state) => state.setting.language);
  const isDarkMode = useAppSelector((state) => state.setting.isDarkMode);
  const displaySource = useAppSelector((state) => state.setting.displaySource);
  const {t, i18n} = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{t('settings')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Choisir une langue"}
            buttons={[
              {
                text: t('french'),
                cssClass: "secondary",
                handler: () => {
                  i18n.changeLanguage('fr')
                  dispatch(setLanguage('fr'));
                  dispatch(fetchCategories());
                },
              },
              {
                text: t('english'),
                handler: () => {
                  i18n.changeLanguage('en')
                  dispatch(setLanguage('en'));
                  dispatch(fetchCategories());
                },
              },
            ]}
          />
          <IonItem>
          <IonLabel onClick={() => setShowAlert(true)}>
            <h2>{t('langOption')}</h2>
            <p>{language === 'fr' ? t('french') : t('english')}</p>
          </IonLabel>
        </IonItem>
          <IonItem>
            <IonLabel>{t('darkMode')}</IonLabel>
            <IonToggle
              slot="end"
              id="themeToggle"
              checked={isDarkMode}
              onIonChange={(e) => dispatch(setIsDarkMode(e.detail.checked))}
            ></IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>{t('displaySourceInQuiz')}</IonLabel>
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
