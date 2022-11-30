//A constant array that stores letter grades alongside their GPA counterparts
const possibleGrades = { "A": 4, "A-": 3.7, "B+": 3.3, "B": 3, "B-": 2.7, "C+": 2.3, "C": 2, "C-": 1.7, "D+": 1.3, "D": 1, "F": 0,};
function calculateGPA() {
  //This takes all of the inputs the user gives from every grade and weight field and addits(???) it to their own seperate arrays
    
    //Make array for all the data
    const classData = [];
    //No multidimensional arrays? 
    for (let i = 0; i < 20; i++) {
        classData[i] = [];
        for (let j = 0; j < 3; j++) {
            classData[i][j] = "";
        }
    }
    //Do it myself then
    
    //Put weights, grades, and semesters into array
    for (let i = 1; i < 21; i++) {
        classData[i-1][0] = document.getElementById("GPACredit"+ i).value;
        classData[i-1][1] = document.getElementById("GPAGrade" + i).value;
        classData[i-1][2] = document.getElementById("Semester" + i).value;
    }
    

    //Sanitize data to avoid errors later? 
    for (let number = 0; number<20; number++){
        if (classData[number][1] == "") {
            classData[number][1] = "A"
            classData[number][0] = 0
        }
    }
    
    //Before proceeding, check for bad inputs 
    for (let x = 0; x < 20; x++) {
    //Errors for using wrong letters or weights
        if (!Number(possibleGrades[classData[x][1]]) && possibleGrades[classData[x][1] != "F"]) {
        alert("Error: Please use appropriate letters when entering your grades. ")
        return
      }
      if (!Number.isInteger(parseInt(classData[x][0]))) {
        alert("Error: Please enter in the appropriate weights (credits) to get a proper calculation.")
        return
      }
    }

    for (let i = 1; i < 11; i++) {
        doMath(classData, i);
    }
}

//Do the arithmetic for each semester's GPA
function doMath(classData, semester) {
    GPA = 0;
    totalWeight = 0;
    
    for (let i = 0; i < 20; i++) {
        if (classData[i][2] == semester) {
            totalWeight += parseInt(classData[i][0]);
            GPA += possibleGrades[classData[i][1]] * classData[i][0];
        }
    }
    
    //Don't divide by zero. If this is zero the user didn't input anything for that semester. Probably 
    if (totalWeight == 0) return;
    
    GPA /= totalWeight;
    document.getElementById("GPAResult" + semester).value = GPA.toFixed(2);
}