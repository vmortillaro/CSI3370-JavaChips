<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<title>Final Grade Calculator</title>
</head>


<body>

<?php
//before displaying, check if numfields changed. Default to 1.
if (is_numeric($_POST['numfields'])){
	$numfields = intval($_POST['numfields']);
} else {
	$numfields = 1;
}
//retrieve existing field data
if ($numfields>=1){
	$i=$numfields;
	$assignmentnameinfo=array($numfields);
	$assignmentgradeinfo=array($numfields);
	$assignmenttotalpointsinfo=array($numfields);
	while ($i>0){
		$id=$numfields-$i+1;
		//pull data from posted assignment info as an array
		$assignmentnameinfo['$i']=$_POST['assignmentname$id'];
		$assignmentgradeinfo['$i']=$_POST['assignmentgrade$id'];
		$assignmenttotalpointsinfo['$i']=$_POST['assignmenttotalpoints$id'];
		$i--;
	}
}

//field prompting how many grade fields are being made
$numfieldsfield <<<numfieldsfield
	<form action='gradecalc.php' method='POST'>
	<label style="flex-grow: 1">How many assignments would you like to include? </label> <br />
    <input style="flex-grow: 1" type='text' value=$numfields name='numfields'> <br />
	<input type='submit' value='Update' name='process'>
	</form>
numfieldsfield;
echo numfieldsfield;

//create a loop that outputs the correct number of fields
$i=$numfields;
while ($i>0){
//assign an id number to this field, and add that number to each input name
$id=$numfields-$i+1;
//create the fields
$fieldinstance = <<<fieldinstance
	<form action='gradecalc.php' method='POST'>
    <label style="flex-grow: 1">Assignment Name: </label>
    <input style="flex-grow: 1" type='text' name='assignmentname$id'> <br />
	<label style="flex-grow: 1">Point total: </label>
    <input style="flex-grow: 1" type='text' name='assignmentgrade$id'> <br />
	<label style="flex-grow: 1"> points out of </label>
    <input style="flex-grow: 1" type='text' name='assignmenttotalpoints$id'> <br />
	</form>
fieldinstance;
//output the fields
echo fieldinstance;
//decrement i
$i--;
}

//create the submit button
if ($numfields>=1){
$calculatebutton = <<<calculatebutton
	<form action='gradecalc.php' method='POST'>
    <input type='submit' value='Calculate' name='process'>
	</form>
calculatebutton;
echo calculatebutton;
}
?>

</body>
</html>
