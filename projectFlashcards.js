

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
    startCardScreen.style.display = "block";
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
    
    
    var cardX = 0;
    //Current card set data
    var arrayOfCards = Array();
    var cardString = "";
    var currNum = 0;
    
    //Set names and data
    var setArray = Array();
    var setNum = -1;
    
    
    //Names of the sets
    var setNameArray = Array();
    var currSetNum = 0;
    var countSets = 0;
    
    //Save currSetNum and setNum
    var numArray = [];
    
    //the place in the set array with the current cards
    var onSet = 0;
    
    
    //Load local storage
    loadSets();
    loadSidebar();
    loadCounters();
    
    
    
    //Load the counters
    function loadCounters(){
        const setCounterArray = JSON.parse(localStorage.getItem('setCounters'));
        if(setCounterArray != null){
            countSets = setCounterArray[0];
            setNum = setCounterArray[1];
        }
    
    }
    
    //Load the sets
    function loadSets(){
        const storageArray = JSON.parse(localStorage.getItem('cardStack'));
        if(storageArray != null){
            var loadCount = 0;
            while(loadCount < storageArray.length){
                setArray[loadCount] = storageArray[loadCount];
                loadCount++;
                localStorage.setItem('cardStack', JSON.stringify(setArray));
    
    
            }
        }
    }
    
    //Load saved sidebar
    function loadSidebar(){
        const storeSidebar = JSON.parse(localStorage.getItem('saveSidebar'));
    
        if(storeSidebar != null){
            var check1 = 0;
            var check2 = 1;
    
            while(check2 <= storeSidebar.length){
                if(storeSidebar[check1] == storeSidebar[check2]){
                    storeSidebar.splice(check2,1);
                    break;
                }
                check1++;
                check2++;
            }
            var tempAdd = 0;
            while(tempAdd < storeSidebar.length){
                OldSetList(storeSidebar[tempAdd]);
                setNameArray[tempAdd] = storeSidebar[tempAdd]
                tempAdd++;
            }
    
        }
    
    
        var check1 = 0;
        var check2 = 1;
    
        while(check2 <= setNameArray.length){
            if(setNameArray[check1] == setNameArray[check2]){
                setNameArray.splice(check2,1);
                break;
            }
            check1++;
            check2++;
        }   
    
        localStorage.setItem('saveSidebar', JSON.stringify(setNameArray));
    
    }
    
    
    
    
    
    
    
    
    //Event lisioners
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
    function disclaimerFlashcard(){
        disclaimerBoxFlashcard.style.display = "block";
        okDisFlashcard.style.display = "block";
        freezeFlashcard.style.display = "block";
        
        //Removes the disclaimer once user accepts it
        okDisFlashcard.addEventListener("click", function(){
            disclaimerBoxFlashcard.style.display = "none";
            okDisFlashcard.style.display = "none";
            freezeFlashcard.style.display = "none";
        });
    
    
    }
    
    
    
    
    //add new card in set
    function showCreateFlashcard(){
    
        closeCard.style.display = "block";
        saveCard.style.display = "block";
        answerBoxCard.style.display = "block";
        answerLabelCard.style.display = "block";
        questionBox.style.display = "block";
        questionLabel.style.display = "block";
    
    
        flashcardBox.innerHTML = "";
    
        newInSet.style.display = "none";
        flashcardBox.style.display = "none";
        nextButtonFlashcard.style.display = "none";
        previousButtonFlashcard.style.display = "none";
        deleteCardButton.style.display = "none";
        editCardButton.style.display = "none";
        startCardScreen.style.display = "none";
        setName.style.display = "block";
        deleteSet.style.display = "block";
        deleteSet.style.display = "none";
        
    }
    
    //when close button is pressed
    closeCard.addEventListener("click", function(){
    
        disclaimerFlashcard();
        closeCreateCard();
    })
    
    
    //close create card items
    function closeCreateCard(){
        closeCard.style.display = "none";
        saveCard.style.display = "none";
        answerBoxCard.style.display = "none";
        answerLabelCard.style.display = "none";
        questionBox.style.display = "none";
        questionLabel.style.display = "none";
        saveEditCard.style.display = "none";
    
        newInSet.style.display = "block";
        flashcardBox.style.display = "block";
        deleteCardButton.style.display = "block";
        editCardButton.style.display = "block";
        setName.style.display = "block";
        deleteSet.style.display = "block";
        deleteSet.style.display = "block";
    
        //if there are muliplte cards there needs be a next button but
        //if there is only one card in the set there should be no next button
        if(arrayOfCards.length > 2)
        {
            nextButtonFlashcard.style.display = "block";
        }
        else{
            nextButtonFlashcard.style.display = "none";
        }
    
        currNum = 0;
        flashcardBox.innerHTML = arrayOfCards[0];
        
    }
    
    //Create a new set of cards 
    function createANewSet(){
        countSets++;
        setName.innerHTML = "Untitled" + countSets;
        setName.value = setName.innerHTML;
    
        
        arrayOfCards = [];
        currNum = 0;
        cardX = 0;
        setNum ++;
        setArray[setNum] = setName.value;
        setNum++;
        
    
        showCreateFlashcard();
        
        currSetNum = setNum  - 1 ;
        onSet = setArray.length;
    
        localStorage.setItem('cardStack', JSON.stringify(setArray));
    
       numArray[0] = countSets;
       numArray[1] = setNum;
    
       localStorage.setItem('setCounters', JSON.stringify(numArray));
        
        OldSetList(setArray[setArray.length -1]);
        disclaimerFlashcard();
        placeholderCard();
          
    }
    
    
    
    
    //Old set List
    function OldSetList(text){
        var openSet = document.createElement("div");
            var h2SetName = document.createElement ("h2");
            
            h2SetName.innerHTML = text;
    
            openSet.appendChild(h2SetName);
            sidebarFlashcard.appendChild(openSet);
            
            setNameArray[countSets - 1] = h2SetName.innerHTML;
    
            localStorage.setItem('saveSidebar', JSON.stringify(setNameArray));
           
    
    
    //Open old sets when clicked
            openSet.addEventListener("click", function(){
                startCardScreen.style.display = "none";
                var tempSetNum = 0;
                while(setArray[tempSetNum]!= h2SetName.innerHTML){
                    tempSetNum ++;
                }
                onSet = tempSetNum + 1;
                currSetNum = tempSetNum;
    
                arrayOfCards = setArray[tempSetNum + 1];
    
                closeCreateCard();
                setName.value = h2SetName.innerHTML;
    
                previousButtonFlashcard.style.display = "none";
                cardX = arrayOfCards.length;
    
            })
    
    }
    
    
     
    //Rename a Set
        //When you click on the set name
        setName.addEventListener("click",function(){
            
            var tempNames = 0;
            var tempSetArray = 0;
            
            var tempOldName = setName.value;
            
           
            while(setNameArray[tempNames] != tempOldName){
                tempNames++;
            }
            while(setArray[tempSetArray]!= tempOldName){
                tempSetArray ++;
            }
    
            
           
            //When you click off the set name
            setName.addEventListener("blur", function(){
                
                setNameArray[tempNames] = setName.value;
    
                
                var check1 = 0;
                var check2 = 1;
                //Checks for doubles
                while(check2 <= setNameArray.length -1){
                    if(setNameArray[check1] == setNameArray[check2]){
                        setNameArray.splice(check2,1);
                        break;
                    }
                    check1++;
                    check2++;
                }
                
                
               
                
                
                localStorage.setItem('saveSidebar', JSON.stringify(setNameArray));
    
                setArray[tempSetArray] = setName.value;
    
                localStorage.setItem('cardStack', JSON.stringify(setArray));
    
                //Removes old sidebar items so only the most current can be displayed
                var sideChild = sidebarFlashcard.lastElementChild; 
                while (sideChild) {
                sidebarFlashcard.removeChild(sideChild);
                sideChild = sidebarFlashcard.lastElementChild;
                }
                
                tempNames = -1;
                tempSetArray = -1;
    
    
    
                loadSidebar();
             
            })
         
            
    
        })
    
      
    
    
    
    
    //placeholder for cards in set so there is input even if user does not add any
    function placeholderCard(){
        arrayOfCards[cardX] = "Question";
        cardX++;
        arrayOfCards[cardX] = "Answer";
        cardX++;
    
    
        setArray[currSetNum + 1] = arrayOfCards;
        localStorage.setItem('cardStack', JSON.stringify(setArray));
    
    
        cardX = 0;
    
    }
    
    
    
    //save cards to a set
    function saveCards(){
    
        
        arrayOfCards[cardX] = document.getElementById("questionFlashcard").value;
        cardX++;
        arrayOfCards[cardX] = document.getElementById("answerFlashcard").value;
        cardX++;
    
    
    
        
    
        questionBox.value = '';
        answerBoxCard.value = '';
        cardString = arrayOfCards[0];
        flashcardBox.innerHTML = cardString;
    
        setArray[currSetNum + 1] = arrayOfCards;
        localStorage.setItem('cardStack', JSON.stringify(setArray));
    
    }
    
    
    
    // Next button
    function nextCard(){
        currNum += 2;
        cardString = arrayOfCards[currNum];
        flashcardBox.innerHTML = cardString;
        
        if(currNum + 2 > arrayOfCards.length-1)
        {
            nextButtonFlashcard.style.display = "none";
        }
        previousButtonFlashcard.style.display = "block";
    }
    
    //previous button
    function previousCard(){
        currNum -= 2;
        cardString = arrayOfCards[currNum];
        flashcardBox.innerHTML = cardString;
    
        if(currNum <= 0)
        {
            previousButtonFlashcard.style.display = "none";
        }
        
        nextButtonFlashcard.style.display = "block";
    }
    
    //switch between qustion and answer
    function flipCard(){
        if(cardString == arrayOfCards[currNum] ){
            cardString = arrayOfCards[currNum + 1];
        flashcardBox.innerHTML = cardString;
        }
        else{
            cardString = arrayOfCards[currNum]
            flashcardBox.innerHTML = cardString;
        }
    }
    
    
    //Edit currently displayed flashcard
    function editFlashcard(){
        
        var tempQuestion = arrayOfCards[currNum];
        var tempAnswer = arrayOfCards[currNum + 1];
        questionBox.value = tempQuestion;
        answerBoxCard.value = tempAnswer;
    
        showCreateFlashcard();
    
        saveEditCard.style.display = "block";
        closeCard.style.display = "none";
        saveCard.style.display = "none";

        
        
    }
    
    //Save after an edit
    function editAndSave(){
        //get user inputs for cards
     arrayOfCards[currNum] = document.getElementById("questionFlashcard").value;
     arrayOfCards[currNum + 1] = document.getElementById("answerFlashcard").value;
    
     setArray[onSet] = arrayOfCards;
    
     localStorage.setItem('cardStack', JSON.stringify(setArray));
     closeCreateCard();

     disclaimerFlashcard();
    
    }
    
    //Delete current card
    function deleteCard(){
    arrayOfCards.splice(currNum, 2);
    setArray[onSet] = arrayOfCards;
    localStorage.setItem('cardStack', JSON.stringify(setArray));
    
    
    
    if(currNum + 2 > arrayOfCards.length)
        {
            nextButtonFlashcard.style.display = "none";
        }
        else{
            nextButtonFlashcard.style.display = "block";
        }
    if(currNum - 2 <= 0)
        {
            previousButtonFlashcard.style.display = "none";
        }
        else{
            previousButtonFlashcard.style.display = "block";
        }
    
    if(currNum != 0){
            currNum = currNum - 2;
        }
    flashcardBox.innerHTML = (arrayOfCards[currNum]);
    
    if(arrayOfCards.length < 1){
        deleteFlashCardSet();

        disclaimerFlashcard();
       
    
    }
    
    }
    
    //Delete a set of flashcards
    function deleteFlashCardSet(){
    
        var findNameDel = 0;
        while(setNameArray[findNameDel] != setName.value){
            findNameDel++;
        }
    
        setArray.splice(currSetNum, 2);
        setNameArray.splice(findNameDel,1);
    
        localStorage.setItem('cardStack', JSON.stringify(setArray));
    
    
        localStorage.setItem('saveSidebar', JSON.stringify(setNameArray));
        
    
        startPage();
        
        
        var sideChild = sidebarFlashcard.lastElementChild; 
        
        while (sideChild) {
        sidebarFlashcard.removeChild(sideChild);
        sideChild = sidebarFlashcard.lastElementChild;
        }
    
       
        loadSidebar();
        disclaimerFlashcard();
    }
    
    
    //Delete all button
    const deleteAll = document.getElementById("deleteAllFlashcard");
        
    deleteAll.addEventListener("click", function(){
        //remove all flashcard informantion in local storage
        localStorage.removeItem("cardStack");
        localStorage.removeItem("saveSidebar");
        localStorage.removeItem("setCounters");

        flashcardBox.innerHTML = '';
        
        //Remove array items
        arrayOfCards = [];
        setNameArray = [];
        setArray = [];
        numArray = [];
    
        currSetNum = 0;
        countSets = 0;
        
        
        //clear sidebar
        var sideChild = sidebarFlashcard.lastElementChild; 
        while (sideChild) {
        sidebarFlashcard.removeChild(sideChild);
        sideChild = sidebarFlashcard.lastElementChild;
        }

        startPage();
        disclaimerFlashcard();

        
        
    })
    
    
    };
    
    flashCards();