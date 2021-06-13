import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { alertCircleSharp, chevronBack, chevronBackSharp, chevronForward, chevronForwardSharp } from "ionicons/icons";
import { useState } from "react";
import "./Quiz.css";

const Quiz: React.FC = () => {
  const [selected, setSelected] = useState<string>("r1");
  const [help, setHelp] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Quiz</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard style={{ background: "var(--ion-color-primary)" }}>
          <IonCardHeader>
            <IonCardSubtitle className="text-white">Quiz 5/20</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText className="text-white">
              <h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
                impedit?
              </h2>
            </IonText>
            <div className="ion-text-center">
              {help ? (
                <div className="ion-align-items-center text-dark ion-justify-content-center ion-padding-top" style={{display: "flex"}} color="dark">
                  <IonIcon icon={chevronBackSharp} slot="start" color="dark" />
                  <IonText>The help</IonText>
                  <IonIcon icon={chevronForwardSharp} slot="end" color="dark"/>
                </div>
              ) : (
                <IonButton color="medium" 
                onClick={() => setHelp(true)}>
                  <IonIcon
                    icon={alertCircleSharp}
                    slot="start"
                  />{" "}
                  Aide
                </IonButton>
              )}
            </div>
          </IonCardContent>
        </IonCard>
        <IonItemDivider>
          <IonProgressBar value={0.5} color="primary"></IonProgressBar>
        </IonItemDivider>
        <IonList>
          <IonRadioGroup
            value={selected}
            onIonChange={(e) => setSelected(e.detail.value)}
          >
            <IonListHeader>
              <IonLabel>Choisir la bonne réponse</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonRadio slot="start" value="r1" />
              <IonLabel>Lorem, ipsum.</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio slot="start" value="r2" />
              <IonLabel>Lorem, ipsum dolor.</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio slot="start" value="r3" />
              <IonLabel>Lorem, ipsum.</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio slot="start" value="r4" />
              <IonLabel>Lorem, ipsum dolor.</IonLabel>
            </IonItem>
          </IonRadioGroup>
        </IonList>
        <div className="ion-text-center">
          <IonButton routerLink='/page/result' color="primary">Next</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
