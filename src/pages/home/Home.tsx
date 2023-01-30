import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonAlert,
} from "@ionic/react";
import {
  bookSharp,
  lockClosed,
  shareSocialOutline,
  shareSocialSharp,
  starSharp,
  statsChart,
} from "ionicons/icons";
import styles from "./Home.module.css";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { CategoryConfig, fetchCategories } from "../../slices/categoriesSlice";
import { deleteChoices } from "../../slices/currentQuizSlice";
import { getStars } from "../../utils";
import { useTranslation } from "react-i18next";
import CategoriesLoading from "./CategoriesLoading";
import { NetworkError } from "./NetworkError";
import {SocialSharing} from '@awesome-cordova-plugins/social-sharing'

const Home: React.FC = () => {
  const { t } = useTranslation()
  const [showAlert, setShowAlert] = useState(false);
  const [starsRequired, setStarsRequired] = useState(0)
  const categories = useAppSelector((state) => state.categories);
  const scores = useAppSelector((state) => state.scores.data);
  const dispatch = useAppDispatch();
  const totalStars = scores.length ? scores.map((a) => a.stars).reduce((p, n) => p + n) : 0
  let history = useHistory()

  function startQuiz(isLock: boolean, category: CategoryConfig){
    dispatch(deleteChoices())
    if(isLock){
      setStarsRequired((category.level-1)*5)
      setShowAlert(true)
    }else{
      history.push(`/page/quiz/category/${category.id}`)
    }
  }

  const shareApp = () => {
    SocialSharing.share("J'ai utilisé cette application et je pense que toi aussi tu l'apprécieras", "Merci d'installer cette application", "", "biquiz.bleriotnoguia.com")
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle><b>{"Biquiz"}</b></IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <b style={{ marginRight: "3px", fontSize: "1.15em" }}>
                {totalStars}
              </b>
              <IonIcon icon={starSharp} />
            </IonButton>
            <IonButton onClick={() => shareApp()}>
              <IonIcon slot="start" ios={shareSocialOutline} md={shareSocialSharp} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen>
      {
        categories.loading ? 
        <CategoriesLoading />
          : categories.error ? <NetworkError /> :
        <>
        <h3 className={styles.titleStyle}>
          {t('homeTitle')}
        </h3>
        {[...categories.data].sort((a, b) => a.level - b.level).map((category, idx) => {
          let isLock = totalStars < (category.level-1)*5
          let category_score = scores.length ? scores.find(
            (score) => parseInt(score.category_id) === category?.id
          ) : undefined;
          return (
            <div className={styles.cardCategory} key={idx}>
              <IonIcon
                icon={bookSharp}
                slot="start"
                className={styles.iconCategory}
              />
              <div
                onClick={() => startQuiz(isLock, category)}
                className={styles.linkStyle}
              >
                <div>
                  <div className={styles.cardCategoryHeader}>
                    <h1 className={styles.cardCategoryTitle}>
                      {category?.name}
                    </h1>
                    {isLock && <IonIcon style={{ fontSize: "1.2em" }} icon={lockClosed} />}
                  </div>
                  {/* <p>{category?.description}</p> */}
                  <p className={styles.iconCategoryContent}>
                    {t('categoryDescription')}
                  </p>
                  <div className={styles.iconCategoryFooter}>
                    <div style={{ fontSize: "1.5em" }}>
                      {getStars(category_score?.stars ?? 0)}
                    </div>
                    <span><b>{category.level} </b><IonIcon icon={statsChart} /></span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
      }

      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={starsRequired+" stars required !"}
        message={"You need "+starsRequired+" stars to unluck this level !"}
        buttons={['OK']}
      />
    </IonPage>
  );
};

export default Home;
