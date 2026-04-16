import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addChoice,
  Choice,
  fetchQuestions,
  QuestionOption,
} from "../../slices/currentQuizSlice";
import { setScore } from "../../slices/scoreSlice";
import { checkIsCorrect } from "../../utils";
import QuizLoading from "../home/QuizLoading";
import FeedBack from "./FeedBack";
import "./Quiz.css";

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const Quiz: React.FC = () => {
  const displaySource = useAppSelector((state) => state.setting.displaySource);
  const questions = useAppSelector((state) => state.currentQuiz.questions);
  const loading = useAppSelector((state) => state.currentQuiz.loading);
  const choices = useAppSelector((state) => state.currentQuiz.choices);
  const scores = useAppSelector((state) => state.scores.data);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choiceId, setChoiceId] = useState<undefined | number>(undefined);
  const [feedBackIsOpen, setFeedBackIsOpen] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [feedback, setFeedBack] = useState<{ goodAnswer: QuestionOption; success: boolean }>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { category_id = '' } = useParams<{ category_id: string }>();

  function handleSelectOption(optionId: number) {
    if (!questions || questions.length === 0 || !questions[questionIndex] || choiceId !== undefined) return;

    const newChoice = { question_id: questions[questionIndex].id, choice_id: optionId };
    setChoiceId(optionId);
    dispatch(addChoice(newChoice));

    const currentQuestion = questions.find(q => q.id === questions[questionIndex].id);
    const isGoodAnswer = currentQuestion?.options.find(opt => opt.id === optionId)?.is_correct ?? false;
    const goodAnswer = currentQuestion?.options.find(opt => opt.is_correct === true)!;

    setFeedBack({ goodAnswer, success: isGoodAnswer });
    setFeedBackIsOpen(true);
  }

  function nextQuiz() {
    const nextQuizIndex = questionIndex + 1;
    if (nextQuizIndex < questions.length) {
      setQuestionIndex(nextQuizIndex);
    } else {
      const stars_won = choices.length > 0
        ? (choices.filter((item: Choice) => checkIsCorrect(item, questions)).length * 5) / choices.length
        : 0;
      const category_score = scores.length ? scores.find(s => s.category_id === category_id) : undefined;
      if (!category_score || category_score.stars < stars_won) {
        dispatch(setScore({ category_id, stars: stars_won }));
      }
      setQuestionIndex(0);
      history.push('/page/result/' + category_id);
    }
    setFeedBackIsOpen(false);
    setChoiceId(undefined);
    setShowSource(false);
  }

  useEffect(() => {
    dispatch(fetchQuestions({ category_id }));
  }, [dispatch, category_id]);

  const currentQuestion = questions[questionIndex];

  const getOptionClass = (option: QuestionOption) => {
    if (choiceId === undefined) return 'quiz-option';
    if (option.is_correct) return 'quiz-option correct disabled';
    if (choiceId === option.id) return 'quiz-option wrong disabled';
    return 'quiz-option disabled';
  };

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
        {loading ? (
          <QuizLoading />
        ) : (
          <>
            {/* Progress bar */}
            <div className="quiz-progress-wrapper">
              <div className="quiz-progress-label">
                <span>Progression</span>
                <span>{questionIndex + 1} / {questions.length}</span>
              </div>
              <IonProgressBar value={questions.length > 0 ? questionIndex / questions.length : 0} />
            </div>

            {/* Question card */}
            <div className="quiz-question-card">
              <div className="quiz-question-counter">
                <span className="quiz-question-badge">Question {questionIndex + 1}</span>
              </div>
              <p className="quiz-question-text">
                {currentQuestion?.name ?? ''}
              </p>
              {displaySource && (
                <>
                  <IonButton
                    className="quiz-source-btn"
                    fill="outline"
                    size="small"
                    onClick={() => setShowSource(!showSource)}
                  >
                    {showSource ? 'Masquer' : t('displaySource')}
                  </IonButton>
                  {showSource && (
                    <p className="quiz-source-text">{currentQuestion?.source_text}</p>
                  )}
                </>
              )}
            </div>

            {/* Answer options */}
            <div className="quiz-options">
              {currentQuestion?.options.map((option, idx) => (
                <div
                  key={option.id}
                  className={getOptionClass(option)}
                  onClick={() => handleSelectOption(option.id)}
                >
                  <span className="quiz-option-letter">{LETTERS[idx]}</span>
                  <span className="quiz-option-text">{option.name}</span>
                  {choiceId !== undefined && option.is_correct && (
                    <IonIcon className="quiz-option-icon" color="success" icon={checkmarkCircle} />
                  )}
                  {choiceId !== undefined && choiceId === option.id && !option.is_correct && (
                    <IonIcon className="quiz-option-icon" color="danger" icon={closeCircle} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </IonContent>

      <FeedBack
        feedback={feedback}
        handleCloseModal={() => setFeedBackIsOpen(false)}
        isOpen={feedBackIsOpen}
        nextQuiz={nextQuiz}
      />
    </IonPage>
  );
};

export default Quiz;
