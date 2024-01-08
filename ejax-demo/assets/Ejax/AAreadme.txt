This folder contains very simple AJAX tool named "Ejax."

Ejax loosly meane "Ed's Ajax."

I've been using Jaxon since Xajax died and am tired of
having to cope with massive libraries that go 98% unused. 

I only want to do a few things like an alert, set innerHtml
on an element or call a JS function.

I provide 3 code files:
  Ejax.js is the client side class.
  Ejax.php is the server side class.
  EjaxTraits.php is helper functions to use the Ejax class.

To this end I provide a PHP class (Ejax) extend in php classes PHP
on the server that returns a response, and a JS class (Ejax) that calls
the server class specifying a method and providing its arguments and
processing the commands returned. The commands can alter the UI without
refreshing it and also invoke Javascript on the client.

JSON is used for data transport in both directions. 

Any class using Ejax on the server extends the Ejax class.

Client side, the Ejax JS class is included using a script tag.

The Ejax JS code uses Jquery wherever convenient.

The Jaxon library defines numerous methods/services that the server
code can invoke. I have defined all of the Jaxon services in Ejax.
