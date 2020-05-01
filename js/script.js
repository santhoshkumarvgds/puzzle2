var arrpos = [];
var imgsrc = "url('assets/img/ans.jpg')";
var pos = ["0px 0px", "-100px 0px", "-200px 0px", "0px -100px", "-100px -100px", "-200px -100px", "0px -200px", "-100px -200px", "-200px -200px"];
window.onload = function () {
    var name = "NILL";
    var clickedid;
    if (localStorage.length > 0) {
        if (localStorage.checkvalue != undefined) {
            name = JSON.parse(localStorage.getItem("nameoftheperson"));
            name += "   " + JSON.parse(localStorage.getItem("score"));
        }
    }
    document.getElementById("name").innerHTML = name;
    var i = 0;
    let anArrayOfUniqueNumbers = [];
    let numberGenerator = function (arr) {
        if (arr.length >= 9) return;
        let newNumber = Math.floor(Math.random() * 10 + 1);
        if (arr.indexOf(newNumber) < 0 && newNumber != 10) {
            arr.push(newNumber);
            document.getElementById(newNumber).style.backgroundImage = imgsrc;
            document.getElementById(newNumber).style.backgroundPosition = pos[i];
            arrpos[newNumber] = i + 1;
            i++;
        }
        numberGenerator(arr);
    };

    numberGenerator(anArrayOfUniqueNumbers);
    // console.log(arrpos); ANSWR index positoin
}
var thisval, score = 0,
    imgpos, imgclicksrc = null;
$(document).ready(function () {
    setTimeout(function () {
        alert("Puzzle Tutorial : \n1.Click the image in the second table\n2.Again click the corresponding First table\n3.After set a all image click the submit button ");
    }, 500);
    $(".right td").click(function () {
        $("td").removeClass("active");
        $(this).addClass("active");
        imgclicksrc = imgsrc;
    });
    $(".left td").click(function () {
        score += 1;
        $("td").removeClass("active");
        $(this).addClass("active");
        //console.log(clickedid);
        //console.log(pos[arrpos[clickedid]]);
        if (imgclicksrc != null) {
            $("img", this).css({
                backgroundImage: imgclicksrc,
                backgroundPosition: pos[arrpos[clickedid] - 1]
            });
        }

        imgclicksrc = null;
    });
    $("button").click(function () {
        var count = 0,
            countallclick = 0;
        for (var i = 9, j = 1; i >= 1; i--, j++) {
            var mul = i + 10;
            var checkimgsrc = document.getElementById(mul).style.backgroundImage;
            if (checkimgsrc) {
                countallclick += 1;
            }
            var checkimg = document.getElementById(mul).style.backgroundPosition;

            //console.log(checkimg+" "+pos[i-1]);
            if (checkimg == pos[i - 1]) {
                //console.log(checkimg+" "+ pos[i-1]+" "+count);
                count += 1;
            }
        }
        //console.log(count);
        if (count == 9) {
            var value = 19 - score;
            if (value > 0) {
                alert("you're WIN\nYour score is :" + value);
                var nameoftheperson = prompt("ENTER YOUR NAME");
                localStorage.setItem("nameoftheperson", JSON.stringify(nameoftheperson));
                if (localStorage.checkvalue != undefined) {
                    var conditionval = JSON.parse(localStorage.getItem("score"));
                    if (Number(conditionval) < value) {
                        localStorage.setItem("score", JSON.stringify(value));
                    }
                } else {
                    localStorage.setItem("score", JSON.stringify(value));
                }
                localStorage.checkvalue = 1;
            } else {
                alert("Your score is 0 so it is not consider your best score");
            }
            window.location.reload();
        } else if (countallclick < 9) {
            alert("Please fill " + (9 - countallclick) + " more box");
        } else {
            alert("You're loss! Try again");
            window.location.reload();
        }

    });
});
$("#file").change(function () {
    var reader = new FileReader();
    reader.onload = function (e) {
        if (e.target.result.includes("image")) {
            $(".right table img").css({
                backgroundImage: "url('" + e.target.result + "')"
            });
            imgsrc = "url('" + e.target.result + "')";
            alert("The image is proceesing...Its take few seconds..")
        } else {
            alert("Please choose image file");
            document.getElementById("file").value = '';
        }
    }
    reader.readAsDataURL(this.files[0]);
});

function idval(clickid) {
    clickedid = clickid;
}
