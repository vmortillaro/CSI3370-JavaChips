const navSlider = () => {
  const burger = document.querySelector(".hamburger");//this is pulling from the HTML file
  const nav = document.querySelector(".navItems");
  const navLinks = document.querySelectorAll(".navItems li");
  //this is the function when the three lines appear for the user when they click it it will display the tabs
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
  });
  //this is for all the information in the hamburger menu. When the three lines are clicked, this is listening for that action

  //This is populating the code with the nav bar with a delay so all the tabs slide onto the screen for the user
  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.8}s`;
  });
};
//Calling the function to run everything
navSlider();


//making the code for the password generator
const lengthOfPass= document.getElementById('length');//here I am grabbing the length inputted by user
const form_in_UI= document.getElementById('passwordGeneratorForm');//here I am grabbing the form being used by user
const UpperCase1= document.getElementById('UpperCase');//here I am grabbing the checkbox that the user hopefully inputted
const lowerCase1= document.getElementById('LowerCase');//here I am grabbing whether or not the user wants lower case letters
const numberCase1= document.getElementById('NumberFilter');//here I am grabbing whether or not the user wants to include numbers 
const SpecialCase1= document.getElementById('SpecialSymbols');//Here I am grabbing the section where the user decides whether or not they need special chars
const passwordDisplay = document.getElementById('pass1')//here I am grabbing the section that will have the password
const arrUpper=loopForAscii(65,90);//Here I am looping through the ASCII representations for Upper case letters and putting into an Array
const arrLower=loopForAscii(97,122);//Here I am looping through the ASCII representations for lower case letters and putting into an Array
const arrSpecial=loopForAscii(32,47).concat(loopForAscii(58,64)).concat(loopForAscii(91,96)).concat(loopForAscii(123,126));//Here I am looping through the ASCII representations for special characters and putting into an Array
const arrNumbers=loopForAscii(48,57);//Here I am looping through the ASCII representations for numbers and putting into an Array
//this function is for everytime the user presses the submit button it will continuously update the value
function submitPassReq(){
let length1=lengthOfPass.value
const upper1=UpperCase1.checked//the .checked will just determine whether or not the user checked the box. The checked returns a boolean
const lower1=lowerCase1.checked
const special1=SpecialCase1.checked
const num1=numberCase1.checked
if(length1==""){//if the user doesnt anything in length, I will default it to length of 20 to ensure something will display on the screen
  length1= 20
}
passwordDisplay.innerText = generatePass(length1,upper1, lower1,special1,num1)//generate password will be the function actually creating the password
//I am taking the section that will display the password and updating it with the .innerText 

}
function generatePass(length1,upper1,lower1,special1,num1) {
  let arryWCriteria=new Array()//this array will be populated depending on what the user inputs
  //the if statements will begin to execute and the array will continuously be added to with the confirmation that the user needs specific criteria
  if(lower1){
    arryWCriteria = arryWCriteria.concat(arrLower)
  }
  if(upper1){
    arryWCriteria = arryWCriteria.concat(arrUpper)
  }
 if(special1){
  arryWCriteria = arryWCriteria.concat(arrSpecial)
  }
 if(num1){
  arryWCriteria =  arryWCriteria.concat(arrNumbers)
  }
  //if the user does not enter anything into the form, this will default with all the criteria to be outputted by the system
  else if(!upper1 & !lower1 & !special1 & !num1 ){
    arryWCriteria = arryWCriteria.concat(arrUpper).concat(arrLower).concat(arrSpecial).concat(arrNumbers)
  }
  let passwordSymbols=new Array()//we will begin to populate the password with the specified symbols from the user
  for(let i=0;i<length1;i++){
    let randNum=arryWCriteria[Math.floor(Math.random()*arryWCriteria.length)]//I figured out this function from my sources listed
    passwordSymbols.push(String.fromCharCode(randNum))//taking the random symbols and using the push function to put the random characters into th password
  }
  return passwordSymbols.join('')//the .join() function is so when the array is being printed, it usually prints with commas to separate each element. Adding the '' will just concat everything together
}
//this function is just put to make the process of populating each array easier. In my sources they threw everything in one array and that didnt work for the way I designed this UI
//So I just went ahead and created this to organize everything. I got the idea for listed sources
function loopForAscii(low,high){
  const arr=[]
  for(let i=low;i<=high;i++){
    arr.push(i);
  }
  return arr;
}
const copyBtnVar = document.getElementById('copyBtn')
//passwordDisplay is the variable here that the clipboard will want to copy
function CopyThePassword(){//when user wants to copy their password
navigator.clipboard.writeText(passwordDisplay.innerText);//this will pull the passwords value and add it to the users clipboard
alert('Text copied');//this will let the user know that they have successfully copied their new password
}
  