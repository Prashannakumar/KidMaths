// Generate random integer between min and max (inclusive)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateQuestion = (operation, difficulty, numberMode, customRange) => {
  let min = 1;
  let max = 9;

  switch (numberMode) {
    case 'single':
      min = 1; max = 9;
      break;
    case 'double':
      min = 10; max = 99;
      break;
    case 'custom':
      min = parseInt(customRange.min) || 1;
      max = parseInt(customRange.max) || 10;
      break;
    default:
      min = 1; max = 9;
  }

  // Ensure logical operation boundaries to avoid negatives (for kids) or too hard divisors
  let num1 = randomInt(min, max);
  let num2 = randomInt(min, max);
  
  // Choose operation if mixed
  const actualOperation = operation === 'mixed' 
    ? ['add', 'subtract', 'multiply', 'divide'][randomInt(0, 3)]
    : operation;

  let questionText = '';
  let correctAnswer = 0;
  
  // Make sure num1 is the larger one for subtraction to avoid negatives
  if (actualOperation === 'subtract' && num1 < num2) {
    let temp = num1;
    num1 = num2;
    num2 = temp;
  }
  
  // For division, ensure it's a whole number response by generating answer first, then num1 = answer * num2
  if (actualOperation === 'divide') {
    // division should be straightforward: num2 is the divisor, correctAnswer is the quotient
    // to keep it within bounds, we just use randomInt from an adjusted min/max
    const divisor = randomInt(1, Math.min(10, max)); // keep divisors relatively small for kids
    const quotient = randomInt(min, Math.max(min, Math.floor(max / divisor)));
    num1 = divisor * quotient;
    num2 = divisor;
  }
  
  switch(actualOperation) {
    case 'add':
      questionText = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
      break;
    case 'subtract':
      questionText = `${num1} - ${num2}`;
      correctAnswer = num1 - num2;
      break;
    case 'multiply':
      questionText = `${num1} × ${num2}`;
      correctAnswer = num1 * num2;
      break;
    case 'divide':
      questionText = `${num1} ÷ ${num2}`;
      correctAnswer = num1 / num2;
      break;
    default:
      questionText = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
  }

  // Generate Multiple Choice Options
  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    // Generate an offset of -3 to +3, excluding 0
    let offset = randomInt(-3, 3);
    if (offset === 0) offset = 4;
    
    let wrongAnswer = correctAnswer + offset;
    if (wrongAnswer < 0) wrongAnswer = correctAnswer + randomInt(1, 5); // Avoid negative options
    
    options.add(wrongAnswer);
  }

  // Shuffle options
  const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

  return {
    num1,
    num2,
    operation: actualOperation,
    questionText,
    correctAnswer,
    options: shuffledOptions
  };
};
