// Initial focus on name input field

document.getElementById("name").focus();

// Hide job role box initially

document.getElementById('other-title').style.display='none';

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

// activities event listener

let costTotalValue = 0;
let dateTime = '';
allCheckBoxes = document.querySelectorAll('.activities input[type=checkbox]');

activities.addEventListener('click', (e) =>{
    if (e.target.type == 'checkbox'){
        costTotal.style.display='';
        if (e.target.checked){ // if the target isn't checked
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

        } else { // if the target was already checked
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