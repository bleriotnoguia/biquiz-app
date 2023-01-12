import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { bookSharp } from 'ionicons/icons';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchCategories } from '../../slices/categoriesSlice';
import { deleteChoices } from '../../slices/currentQuizSlice';

const Home: React.FC = () => {
  const categories = useAppSelector(state => state.categories)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  
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
        {categories.data.map((category, idx) => (
          <div className={styles.cardCategory} key={idx}>
            <IonIcon icon={bookSharp} slot="start" className={styles.iconCategory} /> 
            <Link to={`/page/quiz/category/${category?.id}`} onClick={() => dispatch(deleteChoices())} className={styles.linkStyle} >
              <div>
                <h1 style={{fontWeight: 'bold', fontSize: '1.5em'}}>{category?.name}</h1>
                <p>{category?.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
