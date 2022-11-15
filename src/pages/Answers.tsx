import {useState, useEffect} from 'react'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { checkboxSharp, checkmarkSharp, closeSharp, stopOutline } from 'ionicons/icons';
import { Choice, Question, QuestionOption } from '../slices/currentQuizSlice';
import { useAppSelector } from '../hooks';
import '../App.css';

const Answers: React.FC = () => {
  const questions = useAppSelector(state => state.currentQuiz.questions)
  const choices = useAppSelector(state => state.currentQuiz.choices)

  const checkIsCorrect = (item: Choice) => {
    let question = questions.find(q => q.id === item.question_id)
    let choice = question?.options.find(c => c.id === item.choice_id)
    return choice?.is_correct
  }

  const checkQuestionValidated = (question_id: number) => {
    let question = questions.find(q => q.id === question_id)
    let choice = choices.find(c => c.question_id === question_id)
    let questionOption = question?.options.find(c => c.id === choice?.choice_id)
    return questionOption?.is_correct
  }

  const getChoiceByQuestion = (question_id: number) => {
    let choice = choices.find(c => c.question_id === question_id)
    return choice
  }

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
            <p className="m-0">Score : {choices.filter((item: Choice) => checkIsCorrect(item)).length}/{choices.length}</p>
          </IonItemDivider>
        <IonList>
          {questions.map((item, idx) => (
            <div key={idx}>
              <IonItem>
              <IonIcon icon={checkQuestionValidated(item.id) ? checkmarkSharp : closeSharp} slot="end" color={checkQuestionValidated(item.id) ? "success" : "danger"} />
              <div>
                <h4>Question {idx+1}</h4>
                <p className="text-dimgray">{item.name}</p>
              </div>
            </IonItem>
            {item.options.map((option: QuestionOption, index:number) => (<IonItem key={index}>
              <IonIcon slot="start" icon={(option.is_correct || (getChoiceByQuestion(item.id)?.choice_id === option.id) ) ? checkboxSharp : stopOutline} color={option.is_correct ? "success" : (getChoiceByQuestion(item.id)?.choice_id === option.id) ? "danger" : ""} />
              <IonLabel color={option.is_correct ? "success" : (getChoiceByQuestion(item.id)?.choice_id === option.id) ? "danger" : ""}>
                {option.name}  
              </IonLabel>
            </IonItem>))}
            <IonItemDivider>
              Source: <a href="https://www.jw.org" style={{textDecoration: 'none', marginLeft: '5px'}}>Voir la référence</a> 
            </IonItemDivider>
            </div>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Answers;
