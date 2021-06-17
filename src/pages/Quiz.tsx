import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { alertCircleSharp, checkboxSharp, chevronBackSharp, chevronForwardSharp, squareOutline, stopOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router'
import quizzes from '../data/quizzes.json'
import "./Quiz.css";
import {quizConfig, answerConfig} from './QuizInterface'

const Quiz: React.FC = () => {
  const [choiceId, setChoiceId] = useState<any>(null)
  const [help, setHelp] = useState(false);
  const [time, setTime] = useState(1)
  const [currentQuizzes, setCurrentQuizzes] = useState<quizConfig[]>([])
  const [currentQuizId, setCurrentQuizId] = useState(0)

  let history = useHistory()

  const { category_id } = useParams<{ category_id: string; }>();

  // const timer = () => {
  //   if(time >= 0.1){
  //     setTime(time - 0.1)
  //   }
  // }

  function handleSetChoice(choice: answerConfig){
    if(!choiceId){
      setChoiceId(choice.id)
      // Enregister le choix de l'utilisateur
      let newArray = JSON.parse(localStorage.getItem("currentChoices")??'[]');
      newArray?.push({quiz_id: currentQuizzes[currentQuizId].id, choice: choice})
      localStorage.setItem("currentChoices", JSON.stringify(newArray))
      setTimeout(() => {
        nextQuiz()
      }, 1500);
    }
  }

  function nextQuiz(){
    setChoiceId(null)
    var nextQuizId = currentQuizId + 1
    if(nextQuizId < currentQuizzes.length){
      setCurrentQuizId(nextQuizId)
    }else{
      history.push('/page/result')
      // Solution temporaire pour réinitialiser le state de ce composant
      window.location.reload()
    }
  }

  useEffect(() => {
    const quizList = quizzes.filter(item => item.category_id === parseInt(category_id))
    quizList.sort(() => Math.random() - 0.5).slice(0, 20)
    setCurrentQuizzes(quizList)
    localStorage.setItem('currentQuizzes', JSON.stringify(quizList))
    localStorage.setItem("currentChoices", JSON.stringify([]))
  }, [])

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
            <IonCardSubtitle className="text-white">{`Quiz ${(currentQuizId + 1) + '/' +currentQuizzes.length}`}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText className="text-white">
              <h2>
                {currentQuizzes[currentQuizId] ? currentQuizzes[currentQuizId].content : ''}
              </h2>
            </IonText>
            {(currentQuizzes[currentQuizId] && currentQuizzes[currentQuizId].hint) ? (
              <div className="ion-text-center">
              {help ? (
                <div className="ion-align-items-center text-white ion-justify-content-center ion-padding-top" style={{display: "flex"}}>
                  <IonIcon icon={chevronBackSharp} slot="start" />
                  <IonText>{currentQuizzes[currentQuizId].hint}</IonText>
                  <IonIcon icon={chevronForwardSharp} slot="end"/>
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
            </div>)
            : ''}
          </IonCardContent>
        </IonCard>
        {/* <IonItemDivider>
          <IonProgressBar value={0.5} color="primary"></IonProgressBar>
        </IonItemDivider> */}
        <IonList>
          {currentQuizzes[currentQuizId] ? currentQuizzes[currentQuizId].answers.map((answer, id) => (<IonItem key={id}>
            {!choiceId ? <IonCheckbox slot="start" onClick={() => handleSetChoice(answer)} /> : <IonIcon slot="start" icon={(answer.is_correct || (choiceId === answer.id) ) ? checkboxSharp : squareOutline} color={answer.is_correct ? "success" : (choiceId === answer.id) ? "danger" : ""} />}
            <IonLabel color={(choiceId && (answer.is_correct === true)) ? "success" : (choiceId && ((choiceId == answer.id) && answer.is_correct === false)) ? 'danger': ""}>
              {answer.content}  
            </IonLabel>
          </IonItem>)) : ''}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
