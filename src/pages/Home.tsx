import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonIcon, IonLabel, IonButton, IonRadio, IonRadioGroup, IonListHeader, IonItemDivider } from '@ionic/react';
import { bookSharp, play } from 'ionicons/icons';
import {useState} from 'react'
import categories from '../data/categories.json'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, selectCounter } from '../Reducer';

interface CategoryConfig{
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [category, setCategory] = useState<CategoryConfig>(categories[0]);

  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

  const handleCategorySelected = (category_id: number) => {
    var category_selected = categories.find((item) => item.id === category_id)
    setCategory(category_selected ?? {id: 1, name: 'hommes'})
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
          <IonItemDivider>{'Quiz biblique de categorie' + ' ' + category.name}</IonItemDivider>
        </IonList>
        <div className="ion-text-center">
          <IonButton routerLink={`/page/quiz/category/${category.id}`} color="primary"><IonIcon icon={play} slot="start" /> Commencer</IonButton>
        </div>
        <IonItem>
          Count : {counter?.count || 0}
          <IonButton slot="end" onClick={() => dispatch(increment())} > Increment</IonButton>
          <IonButton slot="end" color="danger" onClick={() => dispatch(decrement())} > Decrement</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
