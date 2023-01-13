import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addChoice, Choice, fetchQuestions } from "../../slices/currentQuizSlice";
import { setScore } from "../../slices/scoreSlice";
import { checkIsCorrect } from "../../utils";
import FeedBack from "./FeedBack";
import "./Quiz.css";

const Quiz: React.FC = () => {
  const questions = useAppSelector((state) => state.currentQuiz.questions);
  const choices = useAppSelector(state => state.currentQuiz.choices)
  const scores = useAppSelector(state => state.scores.data)
  const [questionId, setQuestionId] = useState(0);
  const [choiceId, setChoiceId] = useState<undefined | number>(undefined);
  const [feedBackIsOpen, setFeedBackIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    setFeedBackIsOpen(true);
  };

  const handleCloseModal = () => {
    setFeedBackIsOpen(false);
  };

  let history = useHistory();

  const { category_id } = useParams<{ category_id: string }>();

  function handleSetChoiceId(choiceId: number) {
    // Save the user choice
    const newChoice = {
      question_id: questions[questionId].id,
      choice_id: choiceId,
    };
    setChoiceId(choiceId);
    dispatch(addChoice(newChoice));
    handleOpenModal();
  }

  function nextQuiz() {
    var nextQuizId = questionId + 1;
    if (nextQuizId < questions.length) {
      setQuestionId(nextQuizId);
    } else {
      let stars_won = (choices.filter((item: Choice) => checkIsCorrect(item, questions)).length*5)/choices.length
      let category_score = scores.find(score => score.category_id === category_id)
      if(!category_score || (category_score && category_score.stars < stars_won)){
        dispatch(setScore({category_id, stars: stars_won}))
      }

      history.push("/page/result/"+category_id);
      setQuestionId(0);
    }
    handleCloseModal();
    setChoiceId(undefined);
  }

  useEffect(() => {
    dispatch(fetchQuestions({ category_id }));
  }, [dispatch, category_id]);

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
        <div
          style={{
            padding: "1em 1em 0px 1em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IonProgressBar
            style={{ height: "0.5em" }}
            value={questionId / questions.length}
          ></IonProgressBar>
        </div>
        <IonText
          style={{
            padding: "0px 1em 0px 1em",
            textAlign: "center",
            color: "#303030",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>
            {questions[questionId] ? questions[questionId].name : ""}
          </h3>
        </IonText>
        <IonList>
          <IonRadioGroup value={choiceId}>
            {questions[questionId] &&
              questions[questionId].options.map((option, id) => (
                <IonItem key={id}>
                  <IonRadio
                    slot="start"
                    value={option.id}
                    onClick={() => handleSetChoiceId(option.id)}
                  />{" "}
                  <IonLabel
                    color={
                      choiceId && option.is_correct === true
                        ? "success"
                        : choiceId &&
                          choiceId == option.id &&
                          option.is_correct === false
                        ? "danger"
                        : ""
                    }
                  >
                    {option.name}
                  </IonLabel>{" "}
                  {choiceId && option.is_correct === true && (
                    <IonIcon
                      slot="end"
                      color="success"
                      icon={checkmarkCircle}
                    />
                  )}{" "}
                  {choiceId &&
                    choiceId == option.id &&
                    option.is_correct === false && (
                      <IonIcon slot="end" color="danger" icon={closeCircle} />
                    )}
                </IonItem>
              ))}
          </IonRadioGroup>
        </IonList>
        <IonText style={{ textAlign: "center" }}>
          <h5
            style={{
              fontWeight: "bold",
              backgroundColor: "lightgray",
              padding: "0.5em 0",
            }}
          >
            Question {questionId+1}/{questions.length}
          </h5>
        </IonText>
      </IonContent>
      <FeedBack
        handleCloseModal={handleCloseModal}
        isOpen={feedBackIsOpen}
        nextQuiz={nextQuiz}
      />
    </IonPage>
  );
};

export default Quiz;
