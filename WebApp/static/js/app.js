/* Begin anonymous self invoking function, hierbij wordt de functio direct uitgevoerd */
(function () {
    var app = app || {};

    app.router = {
        /* init is een method */
        init:function(){

            routie({
                'about': function() {
                    console.log("about");
                    app.controller.about();
                },
                'movies': function(){
                    console.log("movies");
                    app.controller.movies();

                },
                /*in de parameter komt het genre te staan, als je url 'movies/genre/Horror' wordt, is genre dus 'Horror' */
                'movies/genre/:genre': function(genre) {
                    console.log("movies filtered by: " + genre);
                    app.controller.moviesByGenre(genre);
                },
                /* haalt het ID van dennis vandaan, waardoor die info wordt ingeladen*/
                'movies/:id': function(id) {
                    console.log("details of movie: " + id);
                    app.controller.movieDetail(id);
                },
                /* Bij alle andere routes doe home*/
                '*': function() {
                    app.controller.home();
                }
            });

        }
    }

    /* app.content is een object, about is een property */
    app.content = {

        about: {
            title: "About this app",
            description:[
            {
                p: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all."
            },
            {
                p: "I did the same thing to gandhi, he didn't eat for three weeks. bruce... i'm god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i'm god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn't eat for three weeks."
            },
            {
                p: "Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy."
            },
            {
                p: "That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn't eat for three weeks. the man likes to play chess; let's get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. i don't think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world."
            },

            ]
        }
    },

    app.hideAllSections = function() {
        /* Vind alle elementen met class 'section'... Een loop die door alle sctions heen loopt, el krijgt een parameter mee als je ergens op klikt */
        _.each(document.getElementsByClassName("section"), function(el) {
            el.classList.remove('active');
        });
    };

        /* directives kijkt naar de src */
    app.directives = {
        cover: {
            src: function(params) {
                return this.cover;
            }
        },

        /* Genereer een url naar detail pagina */
        readMore: {
            href: function(params) {
                return '#movies/' + this.id;
            }
        },

        actors:{
            url_profile: {
                href: function(params) {
                return this.url_profile;
                }
            },

            url_character:{
                href:function(params) {
                return this.url_character;
                }
            },
            url_photo: {
				src: function(params) {
				return this.url_photo;
				}
			}
        },

        reviewScore: {
            text: function(params, data) {
                /* Tel alle scores van de reviews bij elkaar op */
                var sum = _.reduce(this.reviews, function(memo, review) {
                    return memo + review.score;
                }, 0);

                /* Het aantal reviews */
                var len = this.reviews.length;

                /* Geef het gemiddelde terug */
                return (sum / len);
            }
        }
    };

    app.controller = { 

    	home: function() {
            /* Verberg eerst alle sections */
            app.hideAllSections();
            /* Maak home section weer actief */
            document.getElementById('home').classList.add('active');
    	},

        about: function() {
            /* Verberg eerst alle sections */
            app.hideAllSections();
            /* Maak about section weer actief */
            document.getElementById('about').classList.add('active');
            Transparency.render(document.getElementById('about'), app.content.about); 
        },

        movies: function() {
            app.hideAllSections();
            document.getElementById('movies').classList.add('active');

            /* Haal movies uit de local storage */
            var movies = JSON.parse(localStorage.getItem('movieData'));

            Transparency.render(document.getElementById('movies'), movies, app.directives); 
        }, 

        moviesByGenre: function(genre) {
            app.hideAllSections();
            document.getElementById('movies').classList.add('active');

            /* Haal movies uit de local storage */
            var movies = JSON.parse(localStorage.getItem('movieData'));

            /* Filter de movies op genre */
            var filteredMovies = _.filter(movies, function(movie) {
                // Loop door de genres
                for(var i=0; i<movie.genres.length; i++) {
                    /* Wanneer er een genre is gematchd */
                    if(movie.genres[i] == genre) return true;
                }
                return false;
            });

            Transparency.render(document.getElementById('movies'), filteredMovies, app.directives); 
        },

        movieDetail: function(id) {
            app.hideAllSections();
            var movies = JSON.parse(localStorage.getItem('movieData'));
            
            /* Het ID was een string maar het moet een integer zijn om te kunnen matchen */
            id = parseInt(id);      

            var movie = _.findWhere(movies, {id: id});

            document.getElementById('detail').classList.add('active');
            Transparency.render(document.getElementById('detail'), movie, app.directives); 
        }
    };


    app.load = function(localStorageKey, url, callback) {

        /* Stel uit om de lader te illustreren */
        setTimeout(function() {

            /* Wanneer het al in de local storage staat */
            /* hoeft het niet nog een keer opgehaald te worden */
            if(localStorage.getItem(localStorageKey)) {
                /* Voer meteen de callback uit */
                callback();

                return;
            } else {    

                /* Haal de data op via AJAX van het type json */
                app.xhr.trigger('GET', url, function(data) {

                    console.log('Data from data object', JSON.parse(data));
                    /* Plaats de data in local storage */
                    localStorage.setItem(localStorageKey, data);

                    /* Nadat alle data is opgehaald */
                    /* voer de callback uit */
                    callback();
                }, "JSON");
            }
        }, 4000);

    }

    /* Ajax request method */
    app.xhr = {
        trigger: function (type, url, success, data) {
            var req = new XMLHttpRequest;
            req.open(type, url, true);

            req.setRequestHeader('Content-type','application/json');

            type === 'POST' ? req.send(data) : req.send(null);

            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status === 200 || req.status === 201) {
                        success(req.responseText);
                    }
                }
            }
        }
    };

    /*header*/
    function init() {
        window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 50,
                header = document.querySelector("#nav-container");
            if (distanceY > shrinkOn) {
                classie.add(header,"smaller");
            } else {
                if (classie.has(header,"smaller")) {
                    classie.remove(header,"smaller");
                }
            }
        });
    }
    window.onload = init();
    

    /*slider*/
    var elem = document.getElementById('mySwipe');
        window.mySwipe = Swipe(elem, {
            auto: 3000
    }   
    );


    /*Progress bar*/
    var element = document.getElementById('example-clock-container');
    element.innerHTML = '<header id="clock-seconds"></header>';
        var textElement = document.getElementById('clock-seconds');

        var seconds = new ProgressBar.Circle(element, {
            duration: 200,
            color: "#FCB03C",
            trailColor: "#ddd"
        });

    setInterval(function() {
        var second = new Date().getSeconds();
        seconds.animate(second / 100, function() {
            textElement.innerHTML = second;
        });
    }, 1000);

    /* Laad de data */
    app.load('movieData', 'http://dennistel.nl/movies', function() {
        /* Als de data geladen is, start de applicatie */
        app.router.init();

        /* Verberg de lader */
        document.getElementById("loader").classList.remove("loading");
    });


})();

