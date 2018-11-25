$(document).ready(() => {
    var used = 0;
    /*
    Searcher:
    First, takes input from search box
    Removes question marks and toLowercase.
    Sees if the question has a substring
    of the q properties in the questions array
    if not loop through each word in the user inputted question
    to see if it matches any of the keywords

    Display the results with q: matched results having top priorities
    keywords: being 2nd, since a perfect question match would be
    more relevant to the user. Shows actualq with a. Makes sure
    there are no repeat results (unique array)

    If not found, display text to show a list of questions instead.
    */
    var questions = [
        {
            actualq: 'Are staff applications available for Bombman?',
            q: ['staff applications', 'staff apps', 'staff application', 'staff app', 'become staff', 'apply staff', 'apply for staff'],
            a: 'Of Course! Just head over to the Bombman Discord and applications are available under #applications!',
            keywords: ['apply', 'staff', 'application', 'applications', 'moderator', 'mod', 'help']
        },
        {
            actualq: 'Who made this website?',
            q: ['made this website', 'created the website', 'created this website', 'made the website'],
            a: 'UpdateVersion is the one who developed this website and part of the Minehut InGame Server.',
            keywords: ['update', 'updateversion']
        }
    ];

    $(document).ready(function(){
        $('#frm').keypress(function(e){
            if(e.keyCode==13) {
                $('.sbtn').click();
            }
        });
    });

    $('.sbtn').click(function submit() {
        $('.subres').html('');
        if(used > 0) {
            var parent = document.getElementById("master")
            var child = document.getElementById("updateversion")
            parent.removeChild(child);
        }
        var good = [];
        var inp = $('.inp').val();
        inp = inp.toLowerCase();
        inp = inp.replace(/[-\/\\^$*+@#%&=+_`~<>,?()|![\]{}]/gi, "");
        if(inp.length <= 0) {
            console.log('no');
            noin();
            $('.trans:first').before('<div class="allaq" id="updateversion"></div>');
        } else {
            used = 1;
            for(var z = 0; z < questions.length; z++) {
                for (var y = 0; y < questions[z].q.length; y++) {

                    if(inp.indexOf(questions[z].q[y]) !== -1) {
                        good.push(z);
                    };
                    
                }
            }

            var words = inp.split(" ");

loop1:
            for(var zb = 0; zb < questions.length; zb++) {
loop2:
                for (var yb = 0; yb < questions[zb].keywords.length; yb++) {
loop3:
                    for (var xb = 0; xb < words.length; xb++) {
                        console.log(words[xb]);
                        console.log(questions[zb].keywords[yb])

                        if(words[xb] === questions[zb].keywords[yb]) {
                            console.log('success!')
                            good.push(zb);
                            console.log(zb);
                            if(zb >= questions.length) {
                                break loop1;
                            }
                        };
                    }   
                }
            }

            

            if(good.length <= 0) {
                var nores = '<div class="row container" style="color: black !important; padding-top: 20px; padding-bottom: 40px;"><div class="col-sm-10 col-sm-offset-2"><div class="card"><div class="card-block"><h2>No results!</h2><p>You can look in our list of questions for further assistance, or ask the support team!</p></div></div></div></div><span class="trans"></span>'
                $('.trans:first').before('<div class="allaq" id="updateversion"></div>');
                $('.allaq').html(nores)
                $('.subres').html('Found no results. ;(');
            } 
            if(good.length > 0) {
                var htadd;
                console.log(good);
                var uniqueVals = [];
                $.each(good, function(i, el){
                    if($.inArray(el, uniqueVals) === -1) uniqueVals.push(el);
                });
                console.log(uniqueVals);
                $('.subres').html('Found ' + uniqueVals.length + ' result(s)!');
                uniqueVals.forEach(function(item, index) {
                    var insert = '<div class="row container" style="color: black !important; padding-top: 20px; padding-bottom: 40px;"><div class="col-sm-10 col-sm-offset-2"><div class="card"><div class="card-block"><h2>' + questions[item].actualq + '</h2><p>' + questions[item].a + '</p></div></div></div></div><span class="trans"></span>'
                    htadd += insert;
                });
            }
            $('.trans:first').before('<div class="allaq" id="updateversion"></div>');
            $('.allaq').html(htadd)
            $("html, body").animate(
                { scrollTop: $('#updateversion').offset().top }
            , 1000);

        }
    });

    function noin() {
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    };

});
