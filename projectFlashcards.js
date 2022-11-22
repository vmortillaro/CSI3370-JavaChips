



const flashCards = () => {


    //create new card iteams
    const newInSet = document.getElementById("newCardInSet");
    const closeCard = document.getElementById("closeButtonFlashcard");
    const saveCard = document.getElementById("saveCard");
    const answerBoxCard = document.getElementById("answerFlashcard");
    const answerLabelCard = document.getElementById("answerLabelFlashcard");
    const questionBox = document.getElementById("questionFlashcard");
    const questionLabel = document.getElementById("questionLabelFlashcard");
    const saveEditCard = document.getElementById("saveEditCard");
    
    //flashcard review screen iteams
    const flashcardBox = document.getElementById("flashcardBox");
    const nextButtonFlashcard = document.getElementById("nextButtonFlashcard");
    const previousButtonFlashcard = document.getElementById("previousButtonFlashcard");
    const deleteCardButton = document.getElementById("deleteFlashcard");
    const editCardButton = document.getElementById("editButtonFlashcard");
    

    //sideBar iteams
    const sidebarFlashcard = document.getElementById("sidebarFlashcard");
    const setName = document.getElementById("makeNameFlashcard");
    const newSet = document.getElementById("newSetButton");
    const deleteSet = document.getElementById("deleteSetButton");
    
    
    //Start screen
    const startCardScreen = document.getElementById("StartTextFlashcard");
    
    //local storage disclaimer
    const disclaimerBoxFlashcard = document.getElementById("disclaimerFlashcard");
    disclaimerBoxFlashcard.style.display = "none";
    const okDisFlashcard = document.getElementById("okDisFlashcard");
    okDisFlashcard.style.display = "none";
    const freezeFlashcard = document.getElementById("freezeFlashcard");
    freezeFlashcard.style.display = "none";
    
    
    
    //calls strart page fuction 
    startPage();


    //Displays only start screen items
    function startPage(){
    startCardScreen.style.display = "block";//This is the item that is to be displayed when the funtion is called which is why it is they only one that says block

    //None of these are a part of the start screen so they are set to none so they wont be displayed when the function is called
    closeCard.style.display = "none";
    saveCard.style.display = "none";
    answerBoxCard.style.display = "none";
    questionBox.style.display = "none";
    answerLabelCard.style.display = "none";
    questionLabel.style.display = "none";
    newInSet.style.display = "none";
    flashcardBox.style.display = "none";
    nextButtonFlashcard.style.display = "none";
    previousButtonFlashcard.style.display = "none";
    deleteCardButton.style.display = "none";
    editCardButton.style.display = "none";
    saveEditCard.style.display = "none";
    setName.style.display = "none";
    deleteSet.style.display = "none";
    }
    
    //Used for viewing cards when an array is clicked or when making cards for an array
    var cardX = 0; // This variable holds the total number of cards in a set and is used when makeing cards to keep track of the where new cards go
    var arrayOfCards = Array();//This array is to hold the currently displayed sets cards
    var cardString = ""; // The string holds the current question or answer that is being displayed
    var currNum = 0; // This holds the place in arrayOfCards that the current string is showing
    
    
    var setArray = Array(); //This array is used to hold the name of sets followed by their cards. This is used to find the correct cards when a set is clicked.
    var setNum = -1; // This variable is to keep track of the number of sets. It is mostly used when a new set is created.
    
    
    var setNameArray = Array(); //This array holds just the name of sets which is used for making the sidebar with old sets listed
    var currSetNum = 0; // This is used to find which sets is displaying and is needed when updating set information
    var countSets = 0; //This variable is used when naming new sets. It counts the sets like setNum but it does not go into an array so its number slightly differs
    
    var numArray = []; //This array is used when loading loacal storage to keep track of counters
    
    var onSet = 0; // this is smilar to currNum but it looks at the place of the current card in the set SetArray
    
    
    //Load local storage
    loadSets(); //Loads setArray with all the names and corresponding cards
    loadSidebar(); // Loads setNameArray and makes the sidebar
    loadCounters(); // loads all counters that need to be continued where left off
    
    
    
    //Load the counters from local storage
    function loadCounters(){
        const setCounterArray = JSON.parse(localStorage.getItem('setCounters')); //this calls the items needed from local storage and puts them it a new vairable
                                                                                //localtSorage.getItem retreaves an item from local storage and 'SetCounters' is waht the items are saved under
        if(setCounterArray != null){ //only continues if there was stuff saved previously

            //Puts the information from the vaiable that accesed local storage into the correct arrays to contiue where they left off
            countSets = setCounterArray[0]; 
            setNum = setCounterArray[1];
        }
    
    }
    
    //Load the sets from local storage
    function loadSets(){
        const storageArray = JSON.parse(localStorage.getItem('cardStack')); // put the set items that were saved to local storage into a new variable
        if(storageArray != null){ // check if there were any saved items and if so load them into their correct variables
            var loadCount = 0; //This variable is used to make sure all items have be put back into the set array

            //Untill all items are in the array this loop continues
            while(loadCount < storageArray.length){ 
                setArray[loadCount] = storageArray[loadCount]; 
                loadCount++;
                localStorage.setItem('cardStack', JSON.stringify(setArray)); // this resaves the array so that everything is still saved in local storage 
    
    
            }
        }
    }
    
    //Load set names from local storage and call the function to make the sidebar 
    function loadSidebar(){
        const storeSidebar = JSON.parse(localStorage.getItem('saveSidebar')); // puts the itmes for the sidebar into a variable so setNamesArray can be filled and the sidebar can be made
        //Checks if there was anything saved and if so loads it
        if(storeSidebar != null){


            //Used to check for unwahted duplicates and removes them. Mostly used when renaming sets
            var check1 = 0; //holds the variables in the spot before check2 in the array
            var check2 = 1;//holds the variable in the spot after check1 in the array
            while(check2 <= storeSidebar.length){
                if(storeSidebar[check1] == storeSidebar[check2]){
                    storeSidebar.splice(check2,1); //.splice removes the item in the check2 location of the arral
                    break;//stop loop it there was a fixed error
                }
                check1++;
                check2++;
            }

            var tempAdd = 0;//used to hold locations temporatily while the sidebar and array are being made

            //this loop calls the function OldSetList which makes the sidebar as well as puts the set names into their array
            while(tempAdd < storeSidebar.length){
                OldSetList(storeSidebar[tempAdd]); //calls the function while sending the data needed to make an item for the sidebar
                setNameArray[tempAdd] = storeSidebar[tempAdd]//put all names in to the name array
                tempAdd++;
            }
    
        }
    
        localStorage.setItem('saveSidebar', JSON.stringify(setNameArray)); // save the array to local storage again so nothing is missing
    
    }
    
    
    
    
    
    
    
    
    //Event lisioners these call functions when cartian events happen
    newInSet.addEventListener("click", showCreateFlashcard);
    saveCard.addEventListener("click",saveCards);
    flashcardBox.addEventListener("click", flipCard);
    previousButtonFlashcard.addEventListener("click", previousCard);
    
    newSet.addEventListener("click", createANewSet);
    deleteSet.addEventListener("click", deleteFlashCardSet);
    nextButtonFlashcard.addEventListener("click", nextCard);
    editCardButton.addEventListener("click", editFlashcard);
    deleteCardButton.addEventListener('click', deleteCard);
    saveEditCard.addEventListener("click", editAndSave);
    
    
    
    //Disclaimer about local storage
    //This tells the user that anything they saved is in local storage
    function disclaimerFlashcard(){

        //These are the items for the disclaimer
        disclaimerBoxFlashcard.style.display = "block"; //the text and box are displayed
        okDisFlashcard.style.display = "block"; // the button the acknowlege the disclaimer is displayed
        freezeFlashcard.style.display = "block"; // blocks screen usage until the user selects OK
        
        //Removes the disclaimer once user accepts it
        okDisFlashcard.addEventListener("click", function(){
            disclaimerBoxFlashcard.style.display = "none";
            okDisFlashcard.style.display = "none";
            freezeFlashcard.style.display = "none";
        });
    
    
    }
    
    
    
    
    //add new card in set
    function showCreateFlashcard(){
        //These items are used wwhen making a new card so they are displayed 
        closeCard.style.display = "block";
        saveCard.style.display = "block";
        answerBoxCard.style.display = "block";
        answerLabelCard.style.display = "block";
        questionBox.style.display = "block";
        questionLabel.style.display = "block";
        setName.style.display = "block";
        deleteSet.style.display = "block";
    
    
        flashcardBox.innerHTML = "";// Emptys the flashcard so no previous data will display when it is shown
    
        //These items are not needed when make a card so they will not be displayed
        newInSet.style.display = "none";
        flashcardBox.style.display = "none";
        nextButtonFlashcard.style.display = "none";
        previousButtonFlashcard.style.display = "none";
        deleteCardButton.style.display = "none";
        editCardButton.style.display = "none";
        startCardScreen.style.display = "none";
        deleteSet.style.display = "none";
        
    }
    
    //when close button is pressed this function is called
    closeCard.addEventListener("click", function(){
    
        disclaimerFlashcard(); // calls the disclaimer function becasue items were saved prior to this
        closeCreateCard();// called this function so show the flashcard and other needed items to review the set
    })
    
    
    //This funtion is called when the user want to review a set of flashcards that has been made
    function closeCreateCard(){
        //Thses items are need to review the set so they are displayed on screen
        closeCard.style.display = "none";
        saveCard.style.display = "none";
        answerBoxCard.style.display = "none";
        answerLabelCard.style.display = "none";
        questionBox.style.display = "none";
        questionLabel.style.display = "none";
        saveEditCard.style.display = "none";
    
        //Thse items are not needed to look at the set of flashcards so they are not displayed
        newInSet.style.display = "block";
        flashcardBox.style.display = "block";
        deleteCardButton.style.display = "block";
        editCardButton.style.display = "block";
        setName.style.display = "block";
        deleteSet.style.display = "block";
        deleteSet.style.display = "block";
    
        //if there are muliplte cards there needs be a next button but
        //if there is only one card in the set there should be no next button 
        //This if statement determines if the button is needed
        if(arrayOfCards.length > 2)
        {
            nextButtonFlashcard.style.display = "block"; //shows the next button 
        }
        else{
            nextButtonFlashcard.style.display = "none"; // does not display the next button
        }
    
        currNum = 0; // sets the current card as the first one in the set
        flashcardBox.innerHTML = arrayOfCards[0]; //displays the first question on the flashcard
        
    }
    
    //function to create a new set of cards 
    function createANewSet(){
        countSets++; // adds a one to the counter that keeps track od the set numbers for nameing

        //these name the new set and display the name at the top of the screen
        setName.innerHTML = "Untitled" + countSets; // makes a default name for the new set
        setName.value = setName.innerHTML;
    
        
        arrayOfCards = [];//array of cards is empty because the new set has no cards yet
        //Since the new set has no cards yet both the current card and current number of cards in the are set to 0
        currNum = 0;
        cardX = 0;

        setNum ++;//adds to counter to accomodate the new set
        setArray[setNum] = setName.value; // puts the new set into the setArray
        setNum++; // adds to counter becasue this will be the place in the array of the cards belonging to the new set
        
    
        showCreateFlashcard(); //Call the function to allow new cards to be added to the set
        
        currSetNum = setNum  - 1 ; //Sets the current set as the set that was just created
        onSet = setArray.length; //set the current length of this new set
    
        localStorage.setItem('cardStack', JSON.stringify(setArray)); //save the set to local storage. localStorage.SetItem means to save it to local storage and 'cardStack' is what is is saved under
                                                                    //Then I put in the array that I want to save
        //put the current counters for the current sets for both naming and putting items into the set array into their own array
       numArray[0] = countSets; 
       numArray[1] = setNum;
    
       localStorage.setItem('setCounters', JSON.stringify(numArray)); //save the counters to local storage
        
        OldSetList(setArray[setArray.length -1]); //call the function OldSetList and send the set name to add it to the sidebar
        disclaimerFlashcard(); //call the disclaimer function becasue stuff was saved to local storage
        placeholderCard(); //call the placeholder function so that if there are no cards added there is a placeholder card so the arrays are not messed up
          
    }
    
    
    
    
    //This function makes the sidebar which list all the sets a user has made
    function OldSetList(text){
        var openSet = document.createElement("div"); //make a div element for the opened or current set
            var h2SetName = document.createElement ("h2"); // make a h2 element for the name of the current set
            
            h2SetName.innerHTML = text; // the name of the element is whatever is in the tile of the set either the default name or the name the user renamed it to
    
            openSet.appendChild(h2SetName); //add the name as a child of the set div
            sidebarFlashcard.appendChild(openSet); // make the div a child of the sidebar which makes it display on the sidebar
            
            setNameArray[countSets - 1] = h2SetName.innerHTML; // add the name to the set at the correct localtion, either the last location in the array or if it is renamed replace the old name with this one
    
            localStorage.setItem('saveSidebar', JSON.stringify(setNameArray)); // save the array of set names to local storage
           
    
    
    //Open old sets when clicked
            openSet.addEventListener("click", function(){
                startCardScreen.style.display = "none"; //if the start screen was visable it must be removed 

                var tempSetNum = 0;//temperary counter to find the correct set in the array
                //loop till desired array is found
                while(setArray[tempSetNum]!= h2SetName.innerHTML){
                    tempSetNum ++;
                }

                onSet = tempSetNum + 1; //set the number for the correct array index which is used for editing cards
                currSetNum = tempSetNum; //save the correct array index. Used for deleting cards
    
                arrayOfCards = setArray[tempSetNum + 1]; //puts only the cards in the current set into an array
    
                closeCreateCard();//call function to display the flashcard
                setName.value = h2SetName.innerHTML;//displays the set name at the top of the screen
    
                previousButtonFlashcard.style.display = "none"; // removes the previous button becasue the first card in the set will be displayed
                cardX = arrayOfCards.length; //sets the length of the set of current cards
    
            })
    
    }
    
    
     
    //Rename a Set
        //function that is called when user clicks on the set name to rename it
        setName.addEventListener("click",function(){
            
            var tempNames = 0; //temperary counter to find the name in the setNameArray array
            var tempSetArray = 0; //tmeperary counter to find the name in the setArray array
            
            var tempOldName = setName.value; //saves the old name
            
           //both loops find the place of the old name in the two arrays
            while(setNameArray[tempNames] != tempOldName){
                tempNames++;
            }
            while(setArray[tempSetArray]!= tempOldName){
                tempSetArray ++;
            }
    
            
           
            //function for when user is done typeing the new name and clicks off the set name
            setName.addEventListener("blur", function(){
                
                setNameArray[tempNames] = setName.value; //replace the old set name with the new one in the array of names of the sets
    
                //Checks to ensure there are no unwanted doubleing
                var check1 = 0;
                var check2 = 1;
                while(check2 <= setNameArray.length -1){
                    if(setNameArray[check1] == setNameArray[check2]){
                        setNameArray.splice(check2,1);
                        break;
                    }
                    check1++;
                    check2++;
                }
                
                
               
                
                
                localStorage.setItem('saveSidebar', JSON.stringify(setNameArray));//saves the array with the set names to local storage
    
                setArray[tempSetArray] = setName.value; //save rhe set name in the array with the names and cards where the old name was
    
                localStorage.setItem('cardStack', JSON.stringify(setArray)); //save the array with set names and cards to local storage
    
                //Removes old sidebar items so only the most current can be displayed
                var sideChild = sidebarFlashcard.lastElementChild; //find the last child inthe sidebar
                while (sideChild) { //loop while there sidechild is not null
                sidebarFlashcard.removeChild(sideChild);//delete the name from the sidebar
                sideChild = sidebarFlashcard.lastElementChild;//find the next name
                }
                
                //set the temperary counter to a new number so they don't interfear with the next rename
                tempNames = -1;
                tempSetArray = -1;
    
    
    
                loadSidebar(); //call the function loadSidebar so the sidebar can be remade with the new set name
             
            })
         
            
    
        })
    
      
    
    
    
    
    //placeholder for cards in set so there is input even if user does not add any
    function placeholderCard(){
        arrayOfCards[cardX] = "Question"; //set the first cards question so there is a spot in the array
        cardX++;//increase the counter to find the index for the answer
        arrayOfCards[cardX] = "Answer";//add a placeholder answer
        cardX++;//increase counter for next card
    
    
        setArray[currSetNum + 1] = arrayOfCards; //put the placeholder cards into the card array so they will arrear if the user looks at the set
        localStorage.setItem('cardStack', JSON.stringify(setArray)); //save the cards to local storage
    
    
        cardX = 0;//set to 0 so if the user enters some data it overrides the placeholder
    
    }
    
    
    
    //functions that save cards to a set
    function saveCards(){
        arrayOfCards[cardX] = document.getElementById("questionFlashcard").value; //gets user input from the question textbox and puts in into the current set array
        cardX++; //increases counter for next array index
        arrayOfCards[cardX] = document.getElementById("answerFlashcard").value; //gets user input from answer textbox and puts it into the current set array
        cardX++; //increases counter for next question that could be inputed
        
        //clears the text boxes so user can enter more data for new cards
        questionBox.value = ''; 
        answerBoxCard.value = '';

        cardString = arrayOfCards[0]; //makes the first array element, which ould be the first question in the set, into a string
        flashcardBox.innerHTML = cardString; //adds the string with the first question to the flashcard so when it is displayed the first question will show
    
        setArray[currSetNum + 1] = arrayOfCards; //add the whole array of cards into on index of the setArray so they are all togeter
        localStorage.setItem('cardStack', JSON.stringify(setArray)); //save satArray to local storage
    
    }
    
    
    
    // function for when user clicks the next button
    function nextCard(){
        currNum += 2; //the current card has to increase by two so that the next question is shown not the answer to the original question
        cardString = arrayOfCards[currNum]; //turns the array data into a string to be displayed
        flashcardBox.innerHTML = cardString;//puts the string on the flashcard 
        
        //This if statement determines if there is another card after the current one or not so it knows if the next button should stay
        if(currNum + 2 > arrayOfCards.length-1)
        {
            nextButtonFlashcard.style.display = "none";//if there is not another card after the one currently displayed then then next button is removed
        }
        previousButtonFlashcard.style.display = "block";//since the next button was pressed that means there must be a way to get back to the last question so the previous button is shown
    }
    
    //This function is used when the user presses the previous button
    function previousCard(){
        currNum -= 2;//The current card counter has to decrease by two to get to the last question instead of the last answer
        cardString = arrayOfCards[currNum];//turens the array data into a string
        flashcardBox.innerHTML = cardString; //puts the string into the flashcard
    
        //this if statement determines if the previous button should stay becasue are are more cards before the current one of if this is the first card
        if(currNum <= 0)
        {
            previousButtonFlashcard.style.display = "none"; //previous button is removed if it is the first card in the array
        }
        
        nextButtonFlashcard.style.display = "block";//the next button must display since there is atleast one card after the new current
    }
    
    //switch between qustion and answer
    function flipCard(){
        if(cardString == arrayOfCards[currNum] ){  //this looks at if the question is currently showing
            cardString = arrayOfCards[currNum + 1];//If the question was showing then change the cardString to the answer
        flashcardBox.innerHTML = cardString; //show the answer
        }
        else{ //if the question was not showing then it must have been the aswer
            cardString = arrayOfCards[currNum] //change card string to be the question 
            flashcardBox.innerHTML = cardString; //show the question
        }
    }
    
    
    //function called when the user wants to edit currently displayed flashcard
    function editFlashcard(){
        
        var tempQuestion = arrayOfCards[currNum]; //this variable holds the question before the edit
        var tempAnswer = arrayOfCards[currNum + 1]; //this variable holds the answer before the edit
        questionBox.value = tempQuestion; // Puts the old question text into the question box for the user to edit
        answerBoxCard.value = tempAnswer;//puts the old answer text into the answer box for the user to edit
    
        showCreateFlashcard(); //shows the create card items so the user can type in the textboxes
    
        saveEditCard.style.display = "block"; //displays the save button used when editing 
        closeCard.style.display = "none"; //undisplays the close card button becasue it is not nessiary
        saveCard.style.display = "none"; //undisplays the regular save button because it is not used for edits

        
        
    }
    
    //function used for saveing after an edit
    function editAndSave(){
        //get the new user inputs for cards and puts them into the current set array
        arrayOfCards[currNum] = document.getElementById("questionFlashcard").value;
        arrayOfCards[currNum + 1] = document.getElementById("answerFlashcard").value;
    
        setArray[onSet] = arrayOfCards; //puts the updated current set into the array of all sets in the correct index
    
        localStorage.setItem('cardStack', JSON.stringify(setArray)); //save all the sets to local storage
        closeCreateCard(); //call the fuction to display the flashcard

        disclaimerFlashcard(); //call the disclaimer function becasue local storage was updated
    
    }




    
    //function to call when user wants to delete the current card in a set
    function deleteCard(){
        arrayOfCards.splice(currNum, 2); //takes the data at the index of currNum and deletes it along with the card after so both the question and answer are deleted
        setArray[onSet] = arrayOfCards; //update the set array at the index of the current set so it does not have the deeleted card
        localStorage.setItem('cardStack', JSON.stringify(setArray)); //save the set to local storage
    
    
        //determines if the next button shpuld be displayed or not
        if(currNum + 2 > arrayOfCards.length) //if there are multiple cards in the set after the delete then the next button is displayed
            {
                nextButtonFlashcard.style.display = "none";
            }
            else{
                nextButtonFlashcard.style.display = "block";
            }

        //determines if the previous button should be displayed or not
        if(currNum - 2 <= 0)//if there is at least one card before the current one then the previous button is displayed
            {
                previousButtonFlashcard.style.display = "none"; 
            }      
            else{
                previousButtonFlashcard.style.display = "block";
            }
    
        //if the card that was deleted had a card before it then that card will be displayed otherwise if the card was the first card then the card after will be displayed instead   
        if(currNum != 0){
                currNum = currNum - 2; //changes currNum to the previous question
            }
        flashcardBox.innerHTML = (arrayOfCards[currNum]);//displays a different card in the set, either the one before or after bepending on where the deleted one was in the set
    
        //This if statement determines if the card that was deleted was the only card in the set and if so it deletes the set
        if(arrayOfCards.length < 1){
            deleteFlashCardSet(); //if there are no cards in the set after deleting the current one the delete set function is called and the whole set is deleted

            disclaimerFlashcard(); //local storage was changed so the disclaimer function is called.
       
    
        }
    
    }


    
    //Function that is called when the user wants to delete a set of flashcards
    function deleteFlashCardSet(){
        var findNameDel = 0; //variable to help find the name of the set that is to be deleted
        //loops until the corrent set is found in the name of sets array
        while(setNameArray[findNameDel] != setName.value){
            findNameDel++;
        }
        
        //set is removed from both the array with just the set names and the array with the names and cards
        setArray.splice(currSetNum, 2);//currSetNum is the index number to start removing from and the 2 means to remove 2 indexes the starting one and the one after
        setNameArray.splice(findNameDel,1);
    
        //Save the two sets to local storage
        localStorage.setItem('cardStack', JSON.stringify(setArray));
        localStorage.setItem('saveSidebar', JSON.stringify(setNameArray));
        
    
        //display the start screen since all cards in the set have been removed
        startPage();
        
        //Remove all the sidebar items do there are duplicates when readding them
        var sideChild = sidebarFlashcard.lastElementChild; 
        while (sideChild) {
        sidebarFlashcard.removeChild(sideChild);
        sideChild = sidebarFlashcard.lastElementChild;
        }
    
       
        loadSidebar();//remake the sidebar so its updated without the deleted set
        disclaimerFlashcard();//display the disclaimer becasue local storage was changed
    }
    
    
    
    const deleteAll = document.getElementById("deleteAllFlashcard");//used for delete all button 

     //function to call when user selects the delete all button. It resets counting and removes all local stroage items used for this page    
    deleteAll.addEventListener("click", function(){
        //remove all flashcard informantion in local storage. uses the names I made to identify the sets involved witg is page so all other local storage is unchanged
        localStorage.removeItem("cardStack");
        localStorage.removeItem("saveSidebar");
        localStorage.removeItem("setCounters");

        flashcardBox.innerHTML = '';//clears the flashcard because all cards where deleted
        
        //clear array items so they wont be there if the user continues after deleting 
        arrayOfCards = [];
        setNameArray = [];
        setArray = [];
        numArray = [];
    
        //resets counter 
        currSetNum = 0;
        countSets = 0;
        
        
        //clear the sidebar
        var sideChild = sidebarFlashcard.lastElementChild; 
        while (sideChild) {
        sidebarFlashcard.removeChild(sideChild);
        sideChild = sidebarFlashcard.lastElementChild;
        }

        startPage();//call the start page since there are no ssts to display
        disclaimerFlashcard();//since local storage was changes the disclaimer is displayed
        
    })
    
    
    };
    
    flashCards();
