
## Flow

1. Begin met laden van de data, die checkt of het in de localstorage staat, wanneer dit niet het geval is, haal het op met een AJAX request
2. De router (Routie) wordt aangemaakt
3. De router match de hash(url) met een method op de controller
4. De controller method zorgt ervoor dat de juiste data aan de template engine(Transparency) wordt geleverd, met de juiste directives
5. De template engine rendert de data in de DOM

## Voorbeeld:

1. Laad alle movie data
2. Start de router
3. Url = #/movies dus voer method controller.movies() uit
4. Controller.movies haalt movies data op en geeft deze door aan Transparency
5. Transparency rendert de data in de DOM