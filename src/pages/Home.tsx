import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonList, IonItem, IonIcon, IonLabel, IonButton, IonRadio, IonRadioGroup, IonListHeader, IonItemDivider, IonGrid, IonRow, IonCol } from '@ionic/react';
import { bookSharp, personSharp, play, readerSharp } from 'ionicons/icons';
import {useState} from 'react'
import categories from '../data/categories.json'
import './Page.css';

interface CategoryConfig{
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [category, setCategory] = useState<CategoryConfig>(categories[0]);

  const handleCategorySelected = (category_id: number) => {
    var category_selected = categories.find((item) => item.id == category_id)
    setCategory(category_selected ?? {id: 1, name: 'homme'})
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Accueil</IonTitle>
        </IonToolbar>
      </IonHeader>
    
      <IonContent fullscreen>
        <IonList>
          <IonRadioGroup value={category.id ?? 1} onIonChange={e => handleCategorySelected(e.detail.value)}>
            <IonListHeader>
              <IonLabel>Selectionner une categories</IonLabel>
            </IonListHeader>
            {categories.map((category: CategoryConfig, idx) => (<IonItem key={idx}>
              <IonIcon icon={bookSharp} slot="start" />
              <IonLabel className="ion-text-capitalize">{category.name}</IonLabel>
              <IonRadio slot="end" value={category.id} />
            </IonItem>))}
          </IonRadioGroup>
          <IonItemDivider>Quiz sur les </IonItemDivider>
          <IonItem>{category.name ?? '(none selected'}</IonItem>
        </IonList>
        <div className="ion-text-center">
          <IonButton routerLink={`/page/quiz/category/${category.id}`} color="primary"><IonIcon icon={play} slot="start" /> Commencer</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
