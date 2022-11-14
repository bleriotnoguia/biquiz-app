import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonIcon, IonLabel, IonButton, IonRadio, IonRadioGroup, IonListHeader, IonItemDivider } from '@ionic/react';
import { bookSharp, play } from 'ionicons/icons';
import categories from '../data/categories.json'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, selectCounter } from '../Reducer';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

interface CategoryConfig{
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

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
        <h3 style={{padding: '0px 0.7em'}}>Selectionner une categories</h3>
        {categories.map((category: CategoryConfig, idx) => (
          <div className={styles.cardCategory}>
            <IonIcon icon={bookSharp} slot="start" className={styles.iconCategory} /> 
            <Link to={`/page/quiz/category/${category.id}`} className={styles.linkStyle} >
              <div>
                <h1 style={{fontWeight: 'bold', fontSize: '1.5em'}}>{category.name}</h1>
                <p>Testez votre connaissance des personnages de la bible</p>
              </div>
            </Link>
          </div>
        ))}
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
