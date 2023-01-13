import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { bookSharp, starOutline, star, lockClosed } from 'ionicons/icons';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchCategories } from '../../slices/categoriesSlice';
import { deleteChoices } from '../../slices/currentQuizSlice';
import { getStars } from '../../utils';

const Home: React.FC = () => {
  const categories = useAppSelector(state => state.categories)
  const scores = useAppSelector(state => state.scores.data)
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
        <h3 style={{padding: '0px 0.7em', textAlign: "center"}}>Selectionner une categories</h3>
        {categories.data.map((category, idx) => {
          let category_score = scores.find(score => parseInt(score.category_id) === category?.id)
          return (
            <div className={styles.cardCategory} key={idx}>
              <IonIcon icon={bookSharp} slot="start" className={styles.iconCategory} /> 
              <Link to={`/page/quiz/category/${category?.id}`} onClick={() => dispatch(deleteChoices())} className={styles.linkStyle} >
                <div>
                  <div className={styles.cardCategoryHeader}>
                    <h1 className={styles.cardCategoryTitle}>{category?.name}</h1>
                    <IonIcon style={{fontSize: "1.2em"}} icon={lockClosed} />
                  </div>
                  {/* <p>{category?.description}</p> */}
                  <p style={{marginTop: "0"}}>Testez votre connaissance des écritures</p>
                  <div style={{fontSize: "1.5em"}}>
                    {getStars(category_score?.stars ?? 0)}
                  </div>
                </div>
              </Link>
            </div>
          )
        }
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
