import symptomData from "../data/symptoms.json" with { type: "json" };

export function detectSymptom(message) {
  message = message.toLowerCase();

  for (let key in symptomData) {
    if (message.includes(key)) {
      return key;
    }
  }
  return null;
}

export function getSymptomResponse(symptom) {
  if (!symptomData[symptom]) return null;

  return {
    mild: symptomData[symptom].mild,
    severe: symptomData[symptom].severe
  };
}
