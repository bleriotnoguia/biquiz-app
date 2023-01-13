
import { Choice, Question } from "../slices/currentQuizSlice"
import { starHalfSharp, starOutline, starSharp } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';


export const checkIsCorrect = (item: Choice, questions: Question[]) => {
  let question = questions.find(q => q.id === item.question_id)
  let choice = question?.options.find(c => c.id === item.choice_id)
  return choice?.is_correct
}

export const getStars = (rating: number) => {
  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];
  let count = 0;

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--)
    output.push(<IonIcon icon={starSharp} key={++count} />);

  // If there is a half a star, append it
  if (i == .5) output.push(<IonIcon icon={starHalfSharp} key={++count} />);

  // Fill the empty stars
  for (let i = (5 - rating); i >= 1; i--)
    output.push(<IonIcon icon={starOutline} key={++count} />);

  return output;
}