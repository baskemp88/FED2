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


Best practices


Comments:
Avoid using the line comment //. /* */ is much safer to use because it doesn’t cause errors when the line break is removed.
Vermijdt //. /* */ is veel veiliger om te gebruiken, omdat het geen errors kan veroorzaken.



Make it Understandable:
Gebruik makkelijk te begrijpen en korte namen voor variabelen en functies. Je code is een verhaal, maak jij verhaallijn makkelijk te volgen.
Dus bijvoorbeeld niet: isOverEighteen(), maar isLegalAge() Dit is voor elk land begrijpelijk.



Don't Pass a String to "SetInterval" or "SetTimeOut"

Consider the following code:
setInterval(
"document.getElementById('container').innerHTML += 'My new number: ' + i", 3000
);

Not only is this code inefficient, but it also functions in the same way as the "eval" function would. Never pass a string to SetInterval and SetTimeOut. Instead, pass a function name.



Use === to Test Equality
When testing equality, a lot of languages with syntax similar to JavaScript use the double equals operator (==). However, in JavaScript you should always use triple equals (===). The difference is in how equality is determined. A triple equals operator evaluates the two items based upon their type and value. It makes no interpretations.