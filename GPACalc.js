//A constant array that stores letter grades alongside their GPA counterparts
const possibleGrades = { "A": 4, "A-": 3.7, "B+": 3.3, "B": 3, "B-": 2.7, "C+": 2.3, "C": 2, "C-": 1.7, "D+": 1.3, "D": 1, "F": 0, "G": 1 };

const myGrades = [GPAGrade1, GPAGrade2, GPAGrade3];
const GPAoutput = document.getElementById("GPA");
function calculateGPA() {
  //This takes all of the inputs the user gives from every grade and wieght field and addits it to their own seperate arrays
  const GPAGrade1 = document.getElementById("GPAGrade1").value;
  const GPAGrade2 = document.getElementById("GPAGrade2").value;
    const GPAGrade3 = document.getElementById("GPAGrade3").value;
    const GPAGrade4 = document.getElementById("GPAGrade4").value;
    const GPAGrade5 = document.getElementById("GPAGrade5").value;
    const GPAGrade6 = document.getElementById("GPAGrade6").value;
    const GPAGrade7 = document.getElementById("GPAGrade7").value;
    const GPAGrade8 = document.getElementById("GPAGrade8").value;
    const GPAGrade9 = document.getElementById("GPAGrade9").value;
    const GPAGrade10 = document.getElementById("GPAGrade10").value;
    const GPAGrade11= document.getElementById("GPAGrade11").value;
    const GPAGrade12 = document.getElementById("GPAGrade12").value;
    const GPAGrade13 = document.getElementById("GPAGrade13").value;
    const GPAGrade14 = document.getElementById("GPAGrade14").value;
    const GPAGrade15 = document.getElementById("GPAGrade15").value;
    const GPAGrade16 = document.getElementById("GPAGrade16").value;
    const GPAGrade17 = document.getElementById("GPAGrade17").value;
    const GPAGrade18 = document.getElementById("GPAGrade18").value;
    const GPAGrade19 = document.getElementById("GPAGrade19").value;
    const GPAGrade20 = document.getElementById("GPAGrade20").value;
    const weight1 = document.getElementById("GPACredit1").value;
    const weight2 = document.getElementById("GPACredit2").value;
    const weight3 = document.getElementById("GPACredit3").value;
    const weight4 = document.getElementById("GPACredit4").value;
    const weight5 = document.getElementById("GPACredit5").value;
    const weight6 = document.getElementById("GPACredit6").value;
    const weight7 = document.getElementById("GPACredit7").value;
    const weight8 = document.getElementById("GPACredit8").value;
    const weight9 = document.getElementById("GPACredit9").value;
    const weight10 = document.getElementById("GPACredit10").value;
    const weight11 = document.getElementById("GPACredit11").value;
    const weight12 = document.getElementById("GPACredit12").value;
    const weight13 = document.getElementById("GPACredit13").value;
    const weight14 = document.getElementById("GPACredit14").value;
    const weight15 = document.getElementById("GPACredit15").value;
    const weight16 = document.getElementById("GPACredit16").value;
    const weight17 = document.getElementById("GPACredit17").value;
    const weight18 = document.getElementById("GPACredit18").value;
    const weight19 = document.getElementById("GPACredit19").value;
    const weight20 = document.getElementById("GPACredit20").value;
    //the arrays of all the documented lette rgrades and weights
    const classWeights = [weight1, weight2, weight3, weight4, weight5, weight6, weight7, weight8, weight9,
        weight10, weight11, weight12, weight13, weight14, weight15, weight16, weight17, weight18, weight19, weight20];
    const myGrades = [GPAGrade1, GPAGrade2, GPAGrade3, GPAGrade4, GPAGrade5, GPAGrade6, GPAGrade7, GPAGrade8, GPAGrade9,
        GPAGrade10, GPAGrade11, GPAGrade12, GPAGrade13, GPAGrade14, GPAGrade15, GPAGrade16, GPAGrade17, GPAGrade18, GPAGrade19, GPAGrade20];

    for (number = 0; number<myGrades.length; number++){
        if (myGrades[number] == '') {
            myGrades[number] = "A"
            classWeights[number] = 0
        }
    }
  //Logic
  GPA = 0;
  totalWeight = 0;
    for (x = 0; x < myGrades.length; x++) {
    //Errors for sing wrong letters or weights
      if (!Number(possibleGrades[myGrades[x]])) {
        alert("Error: Please use appropriate letters when entering your grades. ")
        GPAoutput.value = "Error: Please use appropriate letters when entering your grades. "
        return
      }
      if (!Number.isInteger(parseInt(classWeights[x]))) {
        alert("Error: Please enter in the appropriate weights to get a proper calculation.")
        GPAoutput.value = "Error: Please enter in approproate weights to get a proper calculation."
        return
      }

      //The part that calculates the GPA
      totalWeight += parseInt(classWeights[x]);
      GPA += possibleGrades[myGrades[x]] * classWeights[x];
    }
    GPA /= totalWeight;
    GPAoutput.value = GPA.toFixed(2);
}

