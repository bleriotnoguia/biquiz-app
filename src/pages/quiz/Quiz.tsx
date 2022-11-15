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
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { useAppSelector } from "../../hooks";
import { addChoice, fetchQuestions } from "../../slices/currentQuizSlice";
import FeedBack from "./FeedBack";
import "./Quiz.css";

const Quiz: React.FC = () => {
  const questions = useAppSelector((state) => state.currentQuiz.questions);
  const [questionId, setQuestionId] = useState(0);
  const [choiceId, setChoiceId] = useState<undefined | number>(undefined);
  const [feedBackIsOpen, setFeedBackIsOpen] = useState(false);
  const dispatch = useDispatch();

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
      history.push("/page/result");
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
                  {choiceId && option.is_correct === false && (
                    <IonIcon slot="end" color="danger" icon={closeCircle} />
                  )}
                </IonItem>
              ))}
          </IonRadioGroup>
        </IonList>
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
