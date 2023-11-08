
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var externalCounter = 0;
var gameIsOver = false;


function playSound( someButtonColor )
{
    switch (someButtonColor) {
        case "red":
            var redButtonAudio = new Audio("./sounds/red.mp3");
            redButtonAudio.play();
            break;
        case "blue":
            var blueButtonAudio = new Audio("./sounds/blue.mp3");
           blueButtonAudio.play();
            break;
        case "green":
            var greenButtonAudio = new Audio("./sounds/green.mp3");
            greenButtonAudio.play();
            break;
        case "yellow":
            var yellowButtonAudio = new Audio("./sounds/yellow.mp3");
            yellowButtonAudio.play();
            break;
        default:
            break;
    }
}


// Create the next button that the user need to press.
function nextSequence()
{
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
    externalCounter = 0;
    var randomNumber = Math.floor((Math.random()*4));
    var buttonsColor = ["red" , "blue" , "green" , "yellow"];
    var randomChosenColor = buttonsColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor);
}


// Make an press animation on a button.
function animatePress( currentColour )
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() 
    {
        $("#"+currentColour).removeClass("pressed");
    } , 100)
}


function checkAnswerEachIndex(index)
{
    if (userClickedPattern[index] !== gamePattern[index])
    {
        gameOver();
    }
}

function checkAnswer(currentLevel)
{
    for (let i = 0; i < currentLevel; i++)
    {
        if (userClickedPattern[i] !== gamePattern[i])
        {
           gameOver();
        }
    }

    if( !gameIsOver)
    {
        setTimeout(nextSequence , 1000);
    }

}

function gameOver()
{
    gameIsOver = true;
    $("body").addClass("game-over");
    setTimeout(function() 
    {
        $("body").removeClass("game-over");
    } , 100)
    var wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();
    $("h1").text("Game Over, Press Any Key to Refresh");
    startOver();
}


function startOver()
{
    $(document).on("keydown", function (event) {
        if (gameIsOver) {   
            location.reload(); // Reload the page when game is over
        }
    });
}


// The game will start after the user will press some key on his keyboard.
$(document).ready(function() {
    let firstKeyPress = true;

    // Add a keydown event handler for the document
    $(document).on('keydown', function(event) {
        if (firstKeyPress) {
            // Call nextSequence() for the first keypress
            nextSequence();
            firstKeyPress = false;
        }
    });
});


// The code below is check if the user click on a button.
$(".btn").on("click" , function(){
    
    var userChosenColor = this.id;
    switch (userChosenColor) 
        {
        case "red":
                var redButtonAudio = new Audio("./sounds/red.mp3");
                redButtonAudio.play();
                break;
            case "blue":
                var blueButtonAudio = new Audio("./sounds/blue.mp3");
               blueButtonAudio.play();
                break;
            case "green":
                var greenButtonAudio = new Audio("./sounds/green.mp3");
                greenButtonAudio.play();
                break;
            case "yellow":
                var yellowButtonAudio = new Audio("./sounds/yellow.mp3");
                yellowButtonAudio.play();
                break;
            default:
                break;
        }
        animatePress(userChosenColor);
        userClickedPattern.push(userChosenColor);

        checkAnswerEachIndex(userClickedPattern.length - 1);

        if (userClickedPattern.length === gamePattern.length)
        {
            checkAnswer(level);
        }

    })


