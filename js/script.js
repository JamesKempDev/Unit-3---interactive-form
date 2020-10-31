// Initial focus on name input field

document.getElementById("name").focus();

// Hide job role box initially
const jobOther = document.getElementById('other-title');
jobOther.style.display='none';

// Event listener to control display of Other job option in the title area

const title = document.querySelector('#title');

title.addEventListener('change', (e) =>{
    if(e.target.value === 'other'){
        jobOther.style.display='';
    } else {
        jobOther.style.display='none';
    }
})


// Control initial value of 'color' field
// select entire menu
let colorMenu = document.getElementById('color');

// add the 'please select' option to the list

let pleaseSelect = document.createElement('option');
pleaseSelect.textContent='Please select a T-shirt theme';
colorMenu.appendChild(pleaseSelect);

// add DOM element for cost total;

let activities = document.querySelector('.activities');
let costTotal = document.createElement('text')
costTotal.textContent='';
activities.appendChild(costTotal);
costTotal.style.display='none';

// Hide all dropdown options function
function hideAllColors(){
    for (let i = 0; i<colorMenu.length; i++){
        colorMenu[i].style.display='none';
    }
}

// Initialise the page and force dropdown selection

hideAllColors();
colorMenu[6].style.display='';
colorMenu[6].selected='true';

// select the design menu

const designDD = document.querySelector('#design');

// Add a 'change' listener on design dropdown

designDD.addEventListener('change', (e) =>{
    if (e.target.value==='js puns'){
        let items = [0,1,2];
        displayColorOptions(items);
    } else if (e.target.value==='heart js'){
        let items = [3,4,5];
        displayColorOptions(items);
    } else{
        let items = [6];
        displayColorOptions(items);
    }
})

/* activities event listener
Check each checkbox to see if it's clicked or not, then add / remove price and show / hide conflicting dates
*/

let costTotalValue = 0;
let dateTime = ''; 
allCheckBoxes = document.querySelectorAll('.activities input[type=checkbox]');

activities.addEventListener('click', (e) =>{
    if (e.target.type == 'checkbox'){
        costTotal.style.display='';
        if (e.target.checked){
            costTotalValue += parseInt(e.target.getAttribute('data-cost'));
            dateTime = e.target.getAttribute('data-day-and-time');

            // loop over all check boxes for a conflict, excluding the box we just checked

            for (let i=0; i<allCheckBoxes.length; i++){
               let currentLoopCheckbox = allCheckBoxes[i].getAttribute('data-day-and-time');
    
                if (currentLoopCheckbox === dateTime && e.target != allCheckBoxes[i]) {
                    allCheckBoxes[i].disabled='true';
                    allCheckBoxes[i].parentNode.style.color='grey';
                }
            }

        } else {
            costTotalValue -= parseInt(e.target.getAttribute('data-cost'));
            dateTime = e.target.getAttribute('data-day-and-time');
            for (let i=0; i<allCheckBoxes.length; i++){
                let currentLoopCheckbox = allCheckBoxes[i].getAttribute('data-day-and-time');
     
                 if (currentLoopCheckbox === dateTime && e.target != allCheckBoxes[i]) {
                     allCheckBoxes[i].disabled='';
                     allCheckBoxes[i].parentNode.style.color='';
                 }
             } 
        }
        costTotal.textContent = `Total: \$${costTotalValue}`;
    }
})

// function to display color items passed to it

function displayColorOptions(items){
    hideAllColors();
    for (let i=0; i<items.length; i++){
        colorMenu[items[i]].style.display='';
    }
    colorMenu[items[0]].selected='true';
}

/*

Handling the payment options

*/

const paymentOptions = document.querySelector('#payment');

// Hide the 'select payment option' and make credit card default

const creditcardSection = document.querySelector('#credit-card');
const paypalSection = document.querySelector('#paypal');
const bitcontSection = document.querySelector('#bitcoin');

paymentOptions[1].selected='true';
paymentOptions[0].disabled='none';
paypalSection.style.display='none';
bitcontSection.style.display='none';


// add an event listener to the payment options

paymentOptions.addEventListener('change', (e) =>{
    let selection = e.target.value;
    if(selection === ('credit card')){
        creditcardSection.style.display='';
        paypalSection.style.display='none';
        bitcontSection.style.display='none';

    } else if (selection === ('bitcoin')) {
        bitcontSection.style.display='';
        creditcardSection.style.display='none'
        paypalSection.style.display='none'
    } else {
        paypalSection.style.display='';
        bitcontSection.style.display='none';
        creditcardSection.style.display='none';
    }
})

/*

Form field verification

*/

allErrors = document.querySelectorAll('#error-text');

const submit=document.querySelector('button');

const name=document.querySelector('#name');
const email=document.querySelector('#mail');

const cardNo=document.querySelector('#cc-num');
const zip=document.querySelector('#zip');
const cvv=document.querySelector('#cvv');

function validateName(input){
    if (input ===''){
        name.style.borderColor='red';
        return false
    } else {
        name.style.borderColor='rgb(111, 157, 220)';
        return true
    }
}

function validateEmail(input){
    const emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegx.test(input)){
        email.style.borderColor='rgb(111, 157, 220)';
        return true;
    } else {
        email.style.borderColor='red';
        return false
    }
}

function validateActivity(){
    for (let i=0; i<allCheckBoxes.length; i++){
        if (allCheckBoxes[i].checked){
            return true
        }
        }
        return false
    };

function validateCreditCard(cardNo, zip, cvv){
    const cardNoRegx = /\b\d{13,16}\b/;
    const zipRegx = /^\d{5}$/;
    const cvvRegx = /^\d{3}$/;
    let result = false;

    for (let i=0; i<allErrors.length; i++){
        allErrors[i].remove();
    }

    if (cardNoRegx.test(cardNo.value)){
        result = true;
        cardNo.style.borderColor='rgb(111, 157, 220)';
    } else{
        cardNo.style.borderColor='red';
        appendError(cardNo, "Card number should be 13-16 characters long");
        result = false;
    }

    if (zipRegx.test(zip.value)){
        zip.style.borderColor='rgb(111, 157, 220)';
        result = true;
    } else{
        zip.style.borderColor='red';
        appendError(zip, "Zip should be 5 numbers");
        result = false;
    }

    if (cvvRegx.test(cvv.value)){
        cvv.style.borderColor='rgb(111, 157, 220)';
        result=true;
    } else {
        cvv.style.borderColor='red';
        appendError(cvv, "CVV should be 3 numbers");
        result = false;
    }
    allErrors = document.querySelectorAll('#error-text');
return result;
}

function appendError(target, text){

    let errorObject = document.createElement('span');
    errorObject.innerText = text;
    errorObject.id='error-text';
    errorObject.style.color='red';
    target.parentNode.append(errorObject);

}

function checkSubmission(){
    let result = false;
    let totalCorrect = 0;
    
    // Clear any previous errors

    for (let i=0; i<allErrors.length; i++){
        allErrors[i].remove();
    }

    name.style.borderColor='rgb(111, 157, 220)';
    email.style.borderColor='rgb(111, 157, 220)';
    cardNo.style.borderColor='rgb(111, 157, 220)';
    zip.style.borderColor='rgb(111, 157, 220)';
    cvv.style.borderColor='rgb(111, 157, 220)';
    


    if(validateName(name.value)){
        result = true
        totalCorrect += 1;
    } else {
        result = false
    }
    
    if(validateEmail(email.value)){
        result = true
        totalCorrect += 1
    } else {
        result = false
    }

    if(validateActivity()){
        result = true
        totalCorrect +=1
    } else {
        result = false
    }
    
    if (paymentOptions.selectedIndex==1){
        if(validateCreditCard(cardNo, zip, cvv) && totalCorrect===3){
                return true
        } else {
                return false
        }
    }
    if(totalCorrect === 3){
        return true
    } else {
        return false
    }
}

submit.addEventListener('click', (e) =>{
    if (checkSubmission()){
    } else {
        e.preventDefault();
    }
})

