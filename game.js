var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;   
    }
})

function playSound(name) {
    
    var buttonAudio = new Audio("sounds/" + name + '.mp3');
    buttonAudio.play();    

}

$(".btn").click(function(){
   
    var userChosencolour =$(this).attr("id"); 
    userClickedPattern.push(userChosencolour);
    playSound(userChosencolour);
    animatePress(userChosencolour);
    checkAnswer(userClickedPattern.length - 1);


}); 

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } 
    else{
        var gameOverSound = new Audio("sounds/wrong.mp3");
        gameOverSound.play();
        
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        
        $("#level-title").text("GAME OVER, Press Any Key to Restart")
        startOver();
    
    }   
}

function nextSequence() {
    
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function animatePress(currentColour) {
    
    var buttonFlash = $("#" +  currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" +  currentColour).removeClass("pressed");
    }, 100);

}


