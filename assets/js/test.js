// Initialize variables
var timer;
var time = 10;
var END_INTERVAL = 0;
var i = 0;
var startGame = 0;
var currentQuestion = 1;
var answer;

// Initialize question array
var questionArray = [{
        question: "What is Spiderman's real name?",
        option1: "Bruce Banner",
        option2: "Tony Stark",
        option3: "Peter Parker",
        option4: "Clark Kent",
        answer: "Peter Parker",
        characterId: "1009610",
        whosRight: 0
    },

    {
        question: "What is Captain America's shield made of?",
        option1: "Titanium",
        option2: "Aluminium Alloy",
        option3: "Adamantium",
        option4: "Vibranium",
        answer: "Vibranium",
        characterId: "1009220",
        whosRight: 0
    },

    {
        question: "Identify the supervillain",
        option1: "Doctor Doom",
        option2: "Red Skull",
        option3: "Thanos",
        option4: "Ultron",
        answer: "Thanos",
        characterId: "1009652",
        whosRight: 0
    },

    {
        question: "What superhero team is Iron Man affiliated with?",
        option1: "The Avengers",
        option2: "Guardians of the Galaxy",
        option3: "Fantastic Four",
        option4: "The Justice League",
        answer: "The Avengers",
        characterId: "1009368",
        whosRight: 0
    },

    {
        question: "What is Quicksilver's super power?",
        option1: "X-Ray vision",
        option2: "Great Speed",
        option3: "Super Strength",
        option4: "Laser eyes",
        answer: "Great Speed",
        characterId: "1009524",
        whosRight: 0
    },

    {
        question: "What is The Falcon's real name?",
        option1: "Sam Wilson",
        option2: "Bob Burkes",
        option3: "James Rhodes",
        option4: "Tony Stark",
        answer: "Sam Wilson",
        characterId: "1009297",
        whosRight: 0
    },

    {
        question: "Which Infinity Stone does Vision posses?",
        option1: "Power Stone",
        option2: "Mind Stone",
        option3: "Soul Stone",
        option4: "Time Stone",
        answer: "Mind Stone",
        characterId: "1009697",
        whosRight: 0
    },

    {
        question: "What country does Black Panther come from?",
        option1: "Namibia",
        option2: "Wakanda",
        option3: "South Africa",
        option4: "Nigeria",
        answer: "Wakanda",
        characterId: "1009187",
        whosRight: 0
    },

    {
        question: "What phrase is Groot most likely to say?",
        option1: "Always eat your vegetables!",
        option2: "I am Groot!",
        option3: "Use the force!",
        option4: "Live long and prosper!",
        answer: "I am Groot!",
        characterId: "1010743",
        whosRight: 0
    },

    {
        question: "How many dimensions are there in Doctor Strange?",
        option1: "Two",
        option2: "Fifteen",
        option3: "Nine",
        option4: "Eight",
        answer: "Nine",
        characterId: "1009282",
        whosRight: 0
    }
];

// Hide classes when game first loads
$(".All-Game").hide();
$(".Fun-Fact").hide();
$(".send-link").hide();
$("#State-display").hide();
$(".table").hide();
$(".social-share").hide();
$(".game-over-text").hide();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDb8lcdSpV55OVPy6Ng1cGbaELmJUtwxw4",
    authDomain: "superhero-showdown-2.firebaseapp.com",
    databaseURL: "https://superhero-showdown-2.firebaseio.com",
    projectId: "superhero-showdown-2",
    storageBucket: "",
    messagingSenderId: "81522465006"
};

firebase.initializeApp(config);

var database = firebase.database()

document.getElementById('wins-losses-1').style.display = "none"
document.getElementById('wins-losses-2').style.display = "none"
document.getElementById('name-join-2').style.display = "none"


// Text field for player 1
document.getElementById('join').addEventListener('click', function () {

    database.ref('/players').once('value', function (snapshot) {
        if (snapshot.hasChild('1')) {
            var name2 = document.getElementById('name').value
            if (name2 != "") {
                if (name2.length <= 8) {
                    database.ref('/players').child('2').set({
                        name: name2,
                        losses: 0,
                        wins: 0,
                        ready: false,
                    })
                    playerSlot = 2
                    document.getElementById('name-join-2').style.display = "none";
                    localStorage.setItem("player2", name2);
                    $("#errorMsg1").html("");
                } else {
                    $("#errorMsg1").html("<p>ERROR: Name must be 8 characters or less</p>");
                }
            } else {
                $("#errorMsg1").html("<p>ERROR: Name cannot be blank</p>");
            }
        } else {
            var name = document.getElementById('name').value
            if (name != "") {
                if (name.length <= 8) {
                    database.ref('/players').child('1').set({
                        name: name,
                        losses: 0,
                        wins: 0,
                        ready: false,
                    })
                    playerSlot = 1
                    document.getElementById('name-join-1').style.display = "none";
                    localStorage.setItem("player1", name);

                    $("#errorMsg1").html("");
                } else {
                    $("#errorMsg1").html("<p>ERROR: Name must be 8 characters or less</p>");
                }
            } else {
                $("#errorMsg1").html("<p>ERROR: Name cannot be blank</p>");
            }
        }
    })
})

function checkLocalStorage() {
    if (localStorage.getItem("player1") === null && localStorage.getItem("player2") === null) {
        document.getElementById('name-join-2').style.display = "block"
    }
}

// Text Field for Player 2
document.getElementById('join2').addEventListener('click', function () {

    database.ref('/players').once('value', function (snapshot) {
        if (snapshot.hasChild('1')) {
            var name2 = document.getElementById('name2').value
            if (name2 != "") {
                if (name2.length <= 8) {
                    database.ref('/players').child('2').set({
                        name: name2,
                        losses: 0,
                        wins: 0,
                        ready: false,
                    })
                    playerSlot = 2
                    document.getElementById('name-join-2').style.display = "none";
                    localStorage.setItem("player2", name2);
                    $("#errorMsg2").html("");
                } else {
                    $("#errorMsg2").html("<p>ERROR: Name must be 8 characters or less</p>");
                }
            } else {
                $("#errorMsg2").html("<p>ERROR: Username cannot be blank</p>");
            }
        } else {
            var name = document.getElementById('name').value
            if (name != "") {
                if (name.length <= 8) {
                    database.ref('/players').child('1').set({
                        name: name,
                        losses: 0,
                        wins: 0,
                        ready: false,
                    })
                    playerSlot = 1
                    document.getElementById('name-join-1').style.display = "none";
                    localStorage.setItem("player1", name);
                    $("#errorMsg2").html("");
                } else {
                    $("#errorMsg2").html("<p>ERROR: Name must be 8 characters or less</p>");
                }
            } else {
                $("#errorMsg2").html("<p>ERROR: Username cannot be blank</p>");
            }
        }
    })
})

// Reset Game function
document.getElementById('reset').addEventListener('click', function () {
    database.ref('/players').child('1').remove()
    database.ref('/players').child('2').remove()
    database.ref().child('/currentQuestion').remove()
    database.ref('/start-game').set({
        gameStarted: false
    })

    database.ref('/i').set({
        i: 0
    })

    database.ref('/timeLeft').set({
        timeLeft: 10
    })

    localStorage.clear();
    location.reload();
})

// If player 1 is in the game, show their username and stats
database.ref('/players').on('value', function (snapshot) {
    if (snapshot.hasChild('1')) {
        setTimeout(checkLocalStorage, 500);
        document.getElementById('name-join-1').style.display = "none"
        database.ref('/players').child('1').on('value', function (snap) {
            document.getElementById('wins-losses-1').style.display = "block"
            document.getElementById('player-1-name').innerHTML = snap.val().name.substr(0, 15);
            document.getElementById('player-1-wins').innerHTML = snap.val().wins
            document.getElementById('player-1-losses').innerHTML = snap.val().losses
        })
    }
})

// If player 2 is in the game, show their username and stats
database.ref('/players').on('value', function (snapshot) {
    if (snapshot.hasChild('2')) {
        document.getElementById('name-join-2').style.display = "none"
        database.ref('/players').child('2').on('value', function (snap) {
            document.getElementById('wins-losses-2').style.display = "block"
            document.getElementById('player-2-name').innerHTML = snap.val().name.substr(0, 15);
            document.getElementById('player-2-wins').innerHTML = snap.val().wins
            document.getElementById('player-2-losses').innerHTML = snap.val().losses
        })
    }

    // if only player 1 is in the game
    if (snapshot.hasChild('1')) {
        $(".send-link").show();
    }
    if (snapshot.hasChild('2')) {
        $(".send-link").hide();
    }

    // If both players are in game run all of this
    if (snapshot.hasChild('1') && snapshot.hasChild('2') && startGame === 0) {
        startGame++;
        loadNextQuestion();
        marvelAPI();
    }
})

function setTimer() {
    //every 1 sec check db for score updates and increment timer
    timer = setInterval(updatetimer, 1000)
    setInterval(displayTimer, 1000);
}

function displayTimer() {
    database.ref().child('timeLeft').on('value', function (snapshot) {
        time = snapshot.val().timeLeft;
    });

    $(".timer").html("<h2>" + time + "<h2>");

    if (i >= questionArray.length) {
        //setTimeout(endgame, 4000);
        endgame();
    }
}

function updatetimer() {
    if (localStorage.getItem("player1")) {

        //check the 10 second interval for each question
        if (time === END_INTERVAL) {
            if (i >= questionArray.length) {
                endgame();
            } else {
                i++;
                database.ref('/i').set({
                    i: i
                });

                database.ref('/timeLeft').set({
                    timeLeft: 10
                })

                loadNextQuestion();
                marvelAPI();
            }

        } else {
            //time = seconds for each question
            time--;
            database.ref('/timeLeft').set({
                timeLeft: time
            })
        }
    }
}

document.getElementById('questionDisplay').style.display = "none";

function loadNextQuestion() {

    document.getElementById('questionDisplay').style.display = "block";

    database.ref().child('i').on('value', function (snapshot) {
        console.log("Question # " + snapshot.val().i);
        i = snapshot.val().i;
    });

    clearInterval(timer);
    setTimer();
    console.log("loading next question: " + i);

    database.ref('/currentQuestion').set({
        question: questionArray[i].question,
        option1: questionArray[i].option1,
        option2: questionArray[i].option2,
        option3: questionArray[i].option3,
        option4: questionArray[i].option4,
        answer: questionArray[i].answer,
        characterId: questionArray[i].characterId
    });

    database.ref('/currentQuestion').on('value', function (snapshot) {
        answer = snapshot.val().answer;
        $(".question").html(snapshot.val().question);
        $(".Ch1").html(snapshot.val().option1);
        $(".Ch2").html(snapshot.val().option2);
        $(".Ch3").html(snapshot.val().option3);
        $(".Ch4").html(snapshot.val().option4);
    });

} //end of function loadNextQuestion

// Clicking on a multiple choice answer.
$(".choice").on("click", function () {
    $(".image-of-character").show();

    var picked = $(this).text();

    i++;
    database.ref('/i').set({
        i: i
    });
    stoptimer();
    database.ref('/timeLeft').set({
        timeLeft: 10
    })

    if (picked === answer) {
        rightanswer();
    } else {
        wronganswer();
    }

    console.log("End Game " + i);

});

function wronganswer() {

    if (localStorage.getItem("player1") !== null) {
        var ref = firebase.database().ref('/players').child('1').child('losses');
        ref.transaction(function (currentClicks) {
            // If node/clicks has never been set, currentRank will be `null`.
            var newValue = (currentClicks || 0) + 1;

            return newValue;
        });
    } else if (localStorage.getItem("player2") !== null) {
        var ref = firebase.database().ref('/players').child('2').child('losses');
        ref.transaction(function (currentClicks) {
            // If node/clicks has never been set, currentRank will be `null`.
            var newValue = (currentClicks || 0) + 1;

            return newValue;
        });
    }

    loadNextQuestion();
    marvelAPI();
}

function rightanswer() {
    if (localStorage.getItem("player1") !== null) {
        var ref = firebase.database().ref('/players').child('1').child('wins');
        ref.transaction(function (currentClicks) {
            // If node/clicks has never been set, currentRank will be `null`.
            var newValue = (currentClicks || 0) + 1;

            return newValue;
        });
    } else if (localStorage.getItem("player2") !== null) {
        var ref = firebase.database().ref('/players').child('2').child('wins');
        ref.transaction(function (currentClicks) {
            // If node/clicks has never been set, currentRank will be `null`.
            var newValue = (currentClicks || 0) + 1;

            return newValue;
        });
    }
    loadNextQuestion();
    marvelAPI();
}



function marvelAPI() {
    // Marvel Image API Keys
    //adam
    var PUBLIC_KEY = "a239260af7bd8c5e374e7a05d9affd2b";
    var PRIV_KEY = "195700d7088c134a202e57c9fb325dff831799ba";

    //aditi
    // var PUBLIC_KEY = "32fbc187d5d7d68799f46a214b2c214f";
    // var PRIV_KEY = "a0897ff20a9350a2bf2de726ae2f01350623efed";

    // additional api keys
    // var PUBLIC_KEY = "9442b9c2482fb7f73739fd7f06c93bc7";
    // var PRIV_KEY = "b4f8b331ea6ebc9a239948c204f4894475b9675e";

    // additional api keys
    // var PUBLIC_KEY = "60a1d83d00fd7336b25345021e6d38b0";
    // var PRIV_KEY = "2b274e1c303bf3c503f36ba39bac3b2fee543b25";

    var ts = new Date().getTime();
    var MD5 = function (d) {
        result = M(V(Y(X(d), 8 * d.length)));
        return result.toLowerCase()
    };

    function M(d) {
        for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
        return f
    }

    function X(d) {
        for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
        for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
        return _
    }

    function V(d) {
        for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
        return _
    }

    function Y(d, _) {
        d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
        for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
            var h = m,
                t = f,
                g = r,
                e = i;
            f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)
        }
        return Array(m, f, r, i)
    }

    function md5_cmn(d, _, m, f, r, i) {
        return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m)
    }

    function md5_ff(d, _, m, f, r, i, n) {
        return md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
    }

    function md5_gg(d, _, m, f, r, i, n) {
        return md5_cmn(_ & f | m & ~f, d, _, r, i, n)
    }

    function md5_hh(d, _, m, f, r, i, n) {
        return md5_cmn(_ ^ m ^ f, d, _, r, i, n)
    }

    function md5_ii(d, _, m, f, r, i, n) {
        return md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
    }

    function safe_add(d, _) {
        var m = (65535 & d) + (65535 & _);
        return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
    }

    function bit_rol(d, _) {
        return d << _ | d >>> 32 - _
    }
    var result = MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

    database.ref('/currentQuestion').on("value", function (snapshot) {
        var marvelQuery = 'https://gateway.marvel.com/v1/public/characters/' + snapshot.val().characterId;

        console.log(marvelQuery);
        $.getJSON(marvelQuery, {
                ts: ts,
                apikey: PUBLIC_KEY,
                hash: result,
            })
            .then(function (response) {
                var characterDiv = $("<div>");
                characterDiv.addClass("card");
                characterDiv.attr("style", "float:left; margin: 0px; width:200px;");
                // sort of a long dump you will need to sort through

                var path = (response.data.results[0].thumbnail.path);
                var extension = (response.data.results[0].thumbnail.extension);

                var image = $("<img>");
                image.attr("src", path + '.' + extension).attr("height", "100%");
             
                image.addClass("card-img-top gif");
                characterDiv.append(image);

                $(".image-of-character").html(characterDiv);

            })
            .fail(function (err) {
                // the error codes are listed on the dev site
                console.log(err);
            });
    })
}

function stoptimer() {
    clearInterval(timer);
}

function endgame() {

    localStorage.clear();
    $(".question").hide();
    $("#questionDisplay").hide();
    $(".image-of-character").hide();
    clearInterval(timer);
    $(".timer").empty();
    $(".game-over-text").show();
    $(".table").show();
    $("#State-display").show();

    // Update table with stats 
    database.ref('/players').child('1').once('value', function (snapshot) {
        $("#name1table").html(snapshot.val().name.substr(0, 8));
        $("#wins1table").html(snapshot.val().wins);
        $("#loss1table").html(snapshot.val().losses);
    })

    database.ref('/players').child('2').once('value', function (snapshot) {
        $("#name2table").html(snapshot.val().name.substr(0, 8));
        $("#wins2table").html(snapshot.val().wins);
        $("#loss2table").html(snapshot.val().losses);
    })

    //Code for sharing stats on social media
    $(".social-share").show();
    var twitterShare = document.querySelector('[data-js="twitter-share"]');

    twitterShare.onclick = function (e) {
        e.preventDefault();
        var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
        if (twitterWindow.focus) {
            twitterWindow.focus();
        }
        return false;
    }



}

// selects questions array, hides the rules and start button
$("#startgame").on("click", function () {
    $(".rules").hide();
    $(".Fun-Fact").hide();
    $(".All-Game").show();
});


//omdb function
$("#Marvel-Data").on("click", function (event) {
    event.preventDefault();
    $(".All-Game").hide();
    $(".Fun-Fact").show();
    omdbAPI();
});

function omdbAPI() {
    var heroes = ["Iron Man", "The Incredible Hulk", "Iron Man 2", "Thor", "Captain America: The First Avenger", "Marvel's The Avengers", "Iron Man 3", "Thor: The Dark World", "Captain America: The Winter Soldier", "Guardians of the Galaxy", "Avengers: Age of Ultron", "Ant-Man", "Captain America: Civil War", "Doctor Strange", "Guardians of the Galaxy Vol. 2", "Spider-Man: Homecoming", "Thor: Ragnarok", "Black Panther", "Avengers: Infinity War", "Ant-Man and The Wasp"];
    var randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    var nameNoSpace = randomHero.replace(/ /g, "%20");
    var queryURL = "https://www.omdbapi.com/?t=" + nameNoSpace + "&plot=short&apikey=trilogy";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        if (response.Error) {
            console.log("Error: " + response.Error);
            return
        }

        // Storing the movie title
        var title = response.Title;

        // Retrieving the URL for the image
        var imgURL = response.Poster;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL).css("width", "40%");

        // Displaying the title
        $(".movie-title").html(title);

        // Displaying the image
        $(".movie-image").html(image);

    }).catch(function (error) {
        console.log(error);
    });

}