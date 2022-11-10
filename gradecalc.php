<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
    <style>
      .calculator {
        font-size: 16pt;
        line-height:2;
        background-color: rgba(172, 191, 232, 0.73);
        padding:1rem;
        margin-top: 10vh;
        margin-right: 20vh;
        margin-left: 20vh;
        margin-bottom: 3vh ; 
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    </style>
    <title>Class Grade Calculator</title>
  </head>
  <body>
      <!-- Here this is setting up the colored pencils photo and the title 
        for the page. You can begin editing outside of this but be careful -->
      <div class="screenBackground">
        <nav class="navbar">
          <div class="logo">
            <img src="img/Logo (1).jpg" width="80" height="80" />
          </div>
          <ul class="navItems">
                <li class="tabNames">
                    <a href="./index.html"> Home </a>
                </li>
                <li class="tabNames">
                    <a href="./flashcards.html"> FlashCards </a>
                </li>
                <li class="tabNames">
                    <a href="./calendar.html"> Agenda </a>
                </li>
                <li class="tabNames">
                    <a href="./gradecalc.php"> Class Grade Calculator </a>
                </li>
                <li class="tabNames">
                    <a href="./GPACalculator.html"> GPA Calculater </a>
                </li>
                <li class="tabNames">
                    <a href="./password.html"> Password Generator </a>
                </li>
            </ul>
          <div class="hamburger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
          </div>
        </nav>



<!-- Insert you code here -->
<div class="calculator" >
<?php

//before displaying, check if numfields changed. Default to 1.
if (is_numeric($_POST['numfields'])){
	$numfields = intval($_POST['numfields']);
} else {
	$numfields = 1;
}

//Define the heredoc that holds your entire display
//create the form
$display = <<<display
<form action='gradecalc.php' method='POST'>
display;

//field prompting how many grade fields are being made
$numfieldsfield = <<<numfieldsfield
<label>How many assignments would you like to include?</label> <br />
<input type='text' value=$numfields name='numfields'> <br />
numfieldsfield;

//add it to the display
$display .= $numfieldsfield;


//define arrays that will hold all other post value
$storednames=array($numfields);
$storedgrades=array($numfields);
$storedtotals=array($numfields);

//create a loop that outputs the correct number of fields

//for each field desired...

for ($index=0;$index<=($numfields-1); $index++){
	//retrieve pre-existing data related to that field
	$storednames[$index]=$_POST['assignmentname' . $index];
	$storedgrades[$index]=intval($_POST['assignmentgrade' . $index]);
	$storedtotals[$index]=intval($_POST['assignmenttotalpoints' . $index]);

	//create one instance of an assignment info field
	$fieldinstance = <<<fieldinstance
<label style="flex-grow: 1">Assignment Name: </label>
<input style="flex-grow: 1" type='text' value='$storednames[$index]' name='assignmentname$index'> <br />
<label style="flex-grow: 1">Points: </label>
<input style="flex-grow: 1" type='text' value='$storedgrades[$index]' name='assignmentgrade$index'>
<label style="flex-grow: 1">/</label>
<input style="flex-grow: 1" type='text' value='$storedtotals[$index]' name='assignmenttotalpoints$index'> <br />
<br /><br />
fieldinstance;

	//add it to the display
	$display .= $fieldinstance;

}

//calculate your final grade based on the given data
if ($_POST['process'] == 'Update'){
	$pointscount = array_sum($storedgrades);
	$maxcount = array_sum($storedtotals);
	$finalgrade = -1;


	if ($maxcount > 0){
		$finalgrade = $pointscount/$maxcount;
	} else {
		$finalgrade = 0;
	}
	
	//Convert to a whole number percentage
	if (is_numeric($finalgrade)){
		if ($finalgrade >= 0){
			$percentage = ($finalgrade * 100);
		} else {
			$percentage = "ERROR";
		}
	} else {
		$percentage = "ERROR";
	}
	$finalscoredisplay = <<<finalscoredisplay
<label style="flex-grow: 1">Final Grade: </label> <br />
<input style="flex-grow: 1" type='text' value='$percentage' name='finalgradetextbox'>&percnt;
finalscoredisplay;
	
	//add it to the display
	$display .= $finalscoredisplay;
}

//add the end of the form and the submit button
$calculatebutton = <<<calculatebutton
<input type='submit' value='Update' name='process'>
</form>
calculatebutton;

//add it to the display
$display .= $calculatebutton;

//show the display
echo $display;
?>
</div>
</div>
    <script src="project.js"></script>
  </body>
</html>
