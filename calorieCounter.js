/*Abdulrahman ashraf work ♥*/

/*acknowledgement : this file is for learning purposes 
    it was a learning project on freecodecamp.org*/

/* this file contains  six  functions  in total .*/


/* this file is extensively commented for communication purposes*/

/////////////////////////////////////////////////////////

const calorieCounter = document.getElementById('calorie-counter'); /*→ form element*/

const budgetNumberInput = document.getElementById('budget')
;  /*numberInput*/


const entryDropdown = document.getElementById('entry-dropdown');


const addEntryButton = document.getElementById('add-entry');


const clearButton = document.getElementById('clear');


const output = document.getElementById('output');
/*it is hidden 
in the html and Css , will show up when the form is 
submitted */


let isError = false; /* it will be  changed later , so use -let-*/


/* First function */

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');

}  /*even if the user enters +,-,or space,it will not be  considered
 and be replace with empty string ,i.e,it will be removed
it will be nothing */

/*Second function*/
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
} /* if ,for example ,1e1 is entered in the Entry 1 
calories or at any numberInput , the browser 
will throw massege in your face that says → invalid input:1e1 */


/*Third function */
function addEntry() {
  /*the targetInputContainer appears after you click add Entry 
dont forget that it is inside some fieldset in the html element
*/
 
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);

  /* this variable has 5 probabilities ,only one of thim at a time ,this is a single value,it is not array , nor its array-like element
    it only access one div element in one fieldset element
   remember that this div element contains  many (pairs) of inputs as you want,each
  pair consists of  two inputs , one is text input 
   the seond is a numberInupt */

/* the (#) is used because each fieldset
has id and the #${entryDropdown.value} becuse the id(s) are not the same
each fieldset has different id ,.input-container is hidden unless you press 
the button add Entry */

  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

/*the minimum length of targetInputContainer.querySelectorAll('input[type="text"]') is 0
that +1 that you see is only for not to render something like  (Entry 0 Name) 
  we don't prefer that , but if you incest , you can remove the +1 and you will 
  get the  (Entry 0 Name) */
   
/* ↓in  the following line,
 because there  could me more than one (pair) of inputs
 we put the entryNumber 
in the id 
of the 
input*/

  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>

  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />

  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);/*if you don't add this line 
 none of the (pairs) will be rendered*/
}




function calculateCalories(e) { /*Remaining Calories*/
  e.preventDefault();

/*→ By default, when you submit a form, 
the browser refreshes the page, clearing the inputs and results. 
Without e.preventDefault(), 
your calculations wouldn’t display, and everything would reset.*/

  isError = false;

   /* ↓claculate the calories is intuitevly depending on the numbers entered 
   so  we simply get the numberInputs of each fieldset, given that each field set 
   may have more than one  numberInput , so use querySelectorAll */

  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {      /* the getCaloriesFromInputs may change this value if the input(s) passed 
                      has/have error(s)*/
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

   /*this is very simple easy to understand formula, its logical , not for memorizing */

  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide'); /*because the output is hidden in the html file
   ,we need this line ,in order for the output to showup only when the calculate remainig 
 calories button is pressed */
}





function getCaloriesFromInputs(list) {         /*→ interestingly , we said 
                                                 getCaloriesFromInputs
                                                 instead of getCaloriesFromInput  , 
                                                 because there me no pairs  of inputs  
                                                 at all on the fieldset selected , 
                                                 or there may be more than one pair 
                                                 as many as you want */
  let calories = 0; /* we will add all 
                    calories to this variable*/ 
                                

  for (const item of list) {                              /*→→ loop through the list of 
                                                           number inputs */

     const currVal = cleanInputString(item.value);  /* →get red of +,-, and whitespaces*/


    const invalidInputMatch = isInvalidInput(currVal);/*for example ,1e1 is not valid*/


    if (invalidInputMatch) {                          /*→ by default , the isError 
                                                          is false  */
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);  /* →change input from string to 
                                   acutal number, its parser*/
  }
  return calories;
}

function clearForm() {                   /*clearning the form intuitively means 
                                         to reload the page 
                                         to not see any in inputs in any 
                                        .input-container div   
                                         in any fieldset */

  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';         /* must be done , because 
                                           the previous for loop 
                                           don't affect them*/
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click",clearForm);