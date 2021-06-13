import { IonBackButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { checkmarkSharp, closeSharp } from 'ionicons/icons';
import { useParams } from 'react-router';
import './Page.css';

const Answers: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Résultat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding-start">
          <IonText color="primary" >
            <h4>Corrections</h4>
          </IonText>
        </div>
          <IonItemDivider>
            <p className="m-0">Score : 15 / 20</p>
          </IonItemDivider>
        <IonList>
          <IonItem>
            <IonIcon icon={checkmarkSharp} slot="end" color="success" />
            <div>
              <h3>Quiz 1</h3>
              <p className="text-dimgray">Lorem ipsum dolor sit amet, consectetur 
adipiscing elit, sed do eiusmod tempor.</p>
            </div>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" color="primary" />
            <IonLabel>
              Choix 1  
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" color="success" checked={true}/>
            <IonLabel color="success">
              Choix 2  
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" color="danger" checked={true} />
            <IonLabel color="danger">
              Choix 3  
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" color="primary" />
            <IonLabel>
              Choix 4  
            </IonLabel>
          </IonItem>
          <IonItemDivider>
            Source: 1 Lorem 3 : 25 
          </IonItemDivider>
          <IonItem>
            <IonIcon icon={closeSharp} color="danger" slot="end" />
            <div>
              <h3>Quiz 2</h3>
              <p className="text-dimgray">Lorem ipsum dolor sit amet, consectetur 
adipiscing elit, sed do eiusmod tempor.</p>
            </div>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" color="primary" />
            <IonLabel>
              Choix 1  
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" color="success" checked={true}/>
            <IonLabel color="success">
              Choix 2  
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" color="danger" checked={true} />
            <IonLabel color="danger">
              Choix 3  
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start" color="primary" />
            <IonLabel>
              Choix 4  
            </IonLabel>
          </IonItem>
          <IonItemDivider>
            Source: 1 Lorem 3 : 25 
          </IonItemDivider>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Answers;
