const cube = document.querySelector("#cube");
const cback = document.querySelector(".back");
const ctop = document.querySelector(".top");
const cleft = document.querySelector(".left");
const cright = document.querySelector(".right");
const powerup = document.querySelector(".powerup");
const transitionTime = "20000ms";
const music = document.querySelector("#audio");
music.volume = 0.5;

ctop.style.transition = `all ${transitionTime}`;
cleft.style.transition = `all ${transitionTime}`;
cright.style.transition = `all ${transitionTime}`;
cube.style.transition = `all ${transitionTime}`;
powerup.style.transition = `all ${transitionTime}`;
cback.style.transition = `all ${transitionTime}`;

let isOpen = false;
var a = cube.addEventListener("click", openCube);
let time;
function openCube() {
    award();
    ctop.style.transform = "translateY(-3rem)";
    cleft.style.transform = "translateX(-3rem)";
    cright.style.transform = "translateX(3rem)";
    ctop.style.opacity = 0.1;
    cleft.style.opacity = 0.1;
    cright.style.opacity = 0.1;
    cback.style.opacity = 0.1;
    powerup.style.opacity = 1;
    this.isOpen = true;
    powerup.style.zIndex = 10;
    cube.style.animationPlayState = "paused";
    time = setTimeout(closeCube, 21000);
}

function closeCube() {
    ctop.style.transform = "translateY(0)";
    cleft.style.transform = "translateX(0)";
    cright.style.transform = "translateX(0)";
    cube.style.opacity = 1;
    ctop.style.opacity = 1;
    cleft.style.opacity = 1;
    cright.style.opacity = 1;
    cback.style.opacity = 1;
    powerup.style.opacity = 0;
    this.isOpen = false;
    powerup.style.zIndex = 0;
    cube.style.animationPlayState = "paused";
}
var result = [];
function IsNumeric(n) {
  return !isNaN(n);
}
function award() {
  
}
    $(function() {
        $("#cube").click(function() {
            var numLow = $("#lownumber").val();
            var numHigh = $("#highnumber").val();
            var numRand = randomNum(numLow, numHigh, result);
            while (inArray(numRand, result)) {
                if (result.length == numHigh) {
                    $("#randomnumber").text("Hết số rồi");
                    powerup.style.backgroundImage = "url('./img/end.jpg')";
                    exit;
                }
                numRand = randomNum(numLow, numHigh);
            }
            if (
                IsNumeric(numLow) &&
                IsNumeric(numHigh) &&
                parseFloat(numLow) <= parseFloat(numHigh) &&
                numLow != "" &&
                numHigh != ""
            ) 
            {
                result.push(numRand);
                result.sort();
                $("#randomnumber").text(numRand);
                $("#result").text(result);
                for (let i = numLow; i <= numHigh; i++) {
                  music.play("./nhạc/nền.mp3");
                  if (numRand == [i]) {
                    powerup.style.backgroundImage = "url('./img/"+[i]+".jpg')";
                    var audio = new Audio('./nhạc/'+[i]+'.mp3');
                    audio.play();
                  } 
                }
            }
        });
        $("input[type=text]").each(function() {
            $(this).data("first-click", true);
        });
        $("input[type=text]").focus(function() {
            if ($(this).data("first-click")) {
                $(this).val("");
                $(this).data("first-click", false);
                $(this).css("color", "black");
            }
        });
    });
    function randomNum(numLow, numHigh) {
        var adjustedHigh = parseFloat(numHigh) - parseFloat(numLow) + 1;
        var numRand = Math.floor(Math.random() * adjustedHigh) + parseFloat(numLow);
        return numRand;
    }
    function clearScreen() {
        location.reload();
    }
    function inArray(needle, haystack) {
      var count = haystack.length;
      for (var i = 0; i < count; i++) {
          if (haystack[i] == needle) {
              return true;
          }
      }
      return false;
  }
    function checkNumber() {
        var number = $("#findNumber").val();
        if(inArray(number, this.result)){
            $(".alert-success").removeAttr('hidden');
            document.getElementById("textCheckNumber").innerHTML = "Có số " + number;
        } else {
            $(".alert-danger").removeAttr('hidden');
            document.getElementById("textCheckNumberWrong").innerHTML = "Không Có Số " + number;
        }
    }
    
