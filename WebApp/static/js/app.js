
// Begin anonymous self invoking function
(function() {
	var app = app || {};

	app.router = {

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
				'movies/genre/:genre': function(genre) {
					console.log("movies filtered by: " + genre);
					app.controller.moviesByGenre(genre);
				},

				'movies/:id': function(id) {
					console.log("details of movie: " + id);
					app.controller.movieDetail(id);
				}
			});

		}
	}

	app.content = {

		about: {
			title: "About this app",
			description:[
			{
				p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at finibus diam. Sed commodo."
			},
			{
				p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at finibus diam. Sed commodo."
			},
			{
				p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at finibus diam. Sed commodo."
			},
			{
				p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at finibus diam. Sed commodo."
			},

			]
		}
	},

	app.hideAllSections = function() {
		// Vind alle elementen met class 'section'
		_.each(document.getElementsByClassName("section"), function(el) {
			el.classList.remove('active');
		});
	};

	app.directives = {
		cover: {
			src: function(params) {
				return this.cover;
			}
		},

		// Genereer een url naar detail pagina
		readMore: {
			href: function(params) {
				return '#movies/' + this.id;
			}
		},

		reviewScore: {
			text: function(params, data) {
                // Tel alle scores van de reviews bij elkaar op
                var sum = _.reduce(this.reviews, function(memo, review) {
                    return memo + review.score;
                }, 0);

                // Het aantal reviews
                var len = this.reviews.length;

                // Geef het gemiddelde terug
                return (sum / len);
			}
		}
	};

	app.controller = { 

		about: function() {
			// Verberg eerst alle sections
			app.hideAllSections();
			// Maak about section weer actief
			document.getElementById('about').classList.add('active');
			Transparency.render(document.getElementById('about'), app.content.about); 
		},

		movies: function() {
			app.hideAllSections();
			document.getElementById('movies').classList.add('active');

			// Haal movies uit de local storage
			var movies = JSON.parse(localStorage.getItem('movieData'));

			Transparency.render(document.getElementById('movies'), movies, app.directives); 
		}, 

		moviesByGenre: function(genre) {
			app.hideAllSections();
			document.getElementById('movies').classList.add('active');

			// Haal movies uit de local storage
			var movies = JSON.parse(localStorage.getItem('movieData'));

			// Filter de movies op genre
			var filteredMovies = _.filter(movies, function(movie) {
				// Loop door de genres
				for(var i=0; i<movie.genres.length; i++) {
					// Wanneer er een genre is gematchd
					if(movie.genres[i] == genre) return true;
				}
				return false;
			});

			Transparency.render(document.getElementById('movies'), filteredMovies, app.directives); 
		},

		movieDetail: function(id) {
			app.hideAllSections();
			var movies = JSON.parse(localStorage.getItem('movieData'));
			
			// Het ID was een string maar het moet een integer zijn om te kunnen matchen
			id = parseInt(id);		

			var movie = _.findWhere(movies, {id: id});

			document.getElementById('detail').classList.add('active');
			Transparency.render(document.getElementById('detail'), movie, app.directives); 
		}
	};


	app.load = function(localStorageKey, url, callback) {

		// Stel uit om de lader te illustreren
		setTimeout(function() {

			// Wanneer het al in de local storage staat
			// hoeft het niet nog een keer opgehaald te worden
			if(localStorage.getItem(localStorageKey)) {
				// Voer meteen de callback uit
				callback();

				return;
			} else {	

				// Haal de data op via AJAX van het type json
				app.xhr.trigger('GET', url, function(data) {

					console.log('Data from data object', JSON.parse(data));
					// Plaats de data in local storage
					localStorage.setItem(localStorageKey, data);

					// Nadat alle data is opgehaald
					// voer de callback uit
					callback();
				}, "JSON");
			}
		}, 1521);

	}

	// Ajax request method
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

	// Laad de data
	app.load('movieData', 'http://dennistel.nl/movies', function() {
		// Als de data geladen is, start de applicatie
		app.router.init();

		// Verberg de lader
		document.getElementById("loader").classList.remove("loading");
	});


})();