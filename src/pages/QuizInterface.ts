export interface quizConfig{
  id: number;
  content: string;
  answers: {
      id: number;
      content: string;
      is_correct: boolean;
  }[];
  hint: string;
  category_id: number;
}

export interface answerConfig{
  id: number;
  content: string;
  is_correct: boolean;
}