/**
This is the client side JS of the Ejax library.

 */
var ejjson = ''; //received json
var bErrored = false;

//"Constructor" just stashes the target url
function Ejax(sUrl) {
  this.url = sUrl;
}

/*
Send a request to a PHP class on the server then
run the response handler method when complete.

Using the fetch api...

Parameters:
theURL:     string  The URL of the service - a class
theMethod   string  The method of the class
theArgs     array   The arguments to the method
 */

//Request using the Fetch api
Ejax.prototype.request = async function (theURL, theMethod, theArgs) {
  bErrored = false; //No error has ocurred - global

  //Prep the data
  var theData = JSON.stringify([theMethod, theArgs]);

  const theRequest = new Request(theURL, {
    method: "POST",
    headers:{
      "Content-Type": "application/json; charset=utf-8"
    },
    body: theData
  });

  //Run the request
  try {
    const response = await fetch(theRequest);

    if (!response.ok) {
      throw new Error("Network response was not OK" + response.body);
    }

    const json = await response.json();

    ejjson = json; //Save the response data for whatever

    this.handleResponse(ejjson); //Success! Handle it.

  } catch (error) {
    bErrored = true;
    alert("An error occured. Your request could not be completed.");
    console.log("Error: ", error);
  }
}

/*
Process the response from the server

The response consiste of an array of JSON objects.

Each object defines a command that specifies:
1. The method to invoke.
2. The Id of the element on the page.
3. The attribute of the element to be effected.
4. The value to be assigned to the attribute.

Using forEach, we iterate over the commands and
invoke the methods specified.

 */
Ejax.prototype.handleResponse = function (data) {
  var actions = data;
  //Iterate over the action objects
  actions.forEach((action) => {
    let method = action.action; //Who to call
    let args = action.params; //Arguments
    this[method](args); //Do it...
  })
}

//****************************** Begin Response Services Methods ****************************
/*
Editing the page content and style
 */

// Assign the specified value to the given element's attribute
//assign('msg', 'innerHTML/outerHTML', "Hello $data");
Ejax.prototype.assign = function (args) {
  let id = args['id'];
  let attribute = args['attribute'];
  let value = args['msg'];

  if (id == '' || attribute == '' || value == '') {
    alert('In the assign method, id, attribute and value are all required.');
    throw new Error('In Create, the position must be "before" or "after".');
    return false;
  }

  let element = document.getElementById(id);

  if (attribute == 'innerHTML') {
    element.innerHTML = value;
  } else if (attribute == 'outerHTML') {
    element.outerHTML = value;
  } else {
    element.value = value;
  }
}

// Append the specified data to the given element's attribute
//append(string $sTarget, string $sAttribute, string $sData)
Ejax.prototype.append = function (args) {
  let id = args['id'];
  let property = args['prop'];
  let value = args['value'];

  let content = document.getElementById(id).innerHTML + value;
  document.getElementById(id).innerHTML = content;
}

// Prepend the specified data to the given element's attribute
//prepend(string $sTarget, string $sAttribute, string $sData)
Ejax.prototype.prepend = function (args) {
  let id = args['id'];
  let property = args['prop'];
  let value = args['value'];

  let content = value + document.getElementById(id).innerHTML;
  document.getElementById(id).innerHTML = content;
}

// Replace a specified value with another value within the given element's attribute
//replace(string $sTarget, string $sAttribute, string $sSearch, string $sData)
Ejax.prototype.replace = function (args) {
  var id = args['id'];
  var attribute = args['prop'];
  var searchval = args['search'];
  var replaceval = args['value'];

  var content = document.getElementById(id).innerHTML;

  let res = content.replace(searchval, replaceval);

  document.getElementById(id).innerHTML = res;
}

// Clear the specified attribute of the given element
Ejax.prototype.clearAttr = function (args) {
  var id = args['id'];
  var attribute = args['prop'];
  document.getElementById(id).removeAttribute(attribute);
}

// Create a new element in the document
//create(string $sParent, string $sTag, string $sId, string $position)
//position takes before or after only
Ejax.prototype.create = function (args) {
  var id = args['id']; //New element id
  var sParentId = args['parent']; //Parent id
  var sTag = args['tag']; //Tag type - i.e. textarea
  var position = args['position']; //Relative position - after, before

  var parent = document.getElementById(sParentId); //Get the new element's parent's id
  var newElement = document.createElement(sTag); //The new element
  newElement.setAttribute('id', id); //Set it's id

  if (position != 'after' && position != 'before') {
    alert('In Create, the position must be "before" or "after".');
    throw new Error('In Create, the position must be "before" or "after".');
    return false;
  }

  //Position the new element relative to it's parent
  switch (position) {
  case 'after':
    parent.after(newElement);
    break;
  case 'before':
    parent.parentNode.insertBefore(newElement, parent);
    break;
  }

}

// Remove an element from the document
//remove(string $sTarget)
Ejax.prototype.remove = function (args) {
  let sTarget = args['id'];
  document.getElementById(sTarget).remove();
}

//call(args='')
Ejax.prototype.call = function (args) {
alert(args);
  args = JSON.stringify(args);
alert('in call args = ' + args)  
  let x = args['method'] + '("' + args['params'] + '")';

alert('x in call = '+x)  
  eval(x);
}

//Add a css value to the target id
Ejax.prototype.addCSS = function (args) { //id, prop, value) {
  let id = args['id'];
  let prop = args['prop'];
  let value = args['value'];
  $('#' + id).css(prop, value);
}

//or remove it...
Ejax.prototype.removeCSS = function (args) { //id, prop) {
  let id = args['id'];
  let prop = args['prop'];
  $('#' + id).css(prop, '');
}

/*
Running javascript code
 */

// Display an alert message
//alert(string $sMessage)
Ejax.prototype.alert = function (args) {
  alert(args['message']);
}

// Execute the specified javascript code
//script(string $sJsCode)
Ejax.prototype.script = function (args) {
  var js = args['jscode'];
  eval(js);
}

// Set an event handler on the specified element
//setEvent(string $sTarget, string $sEvent, string $sScript)
Ejax.prototype.setEvent = function (args) {
  let sTarget =  args['id']
  let sEvent  =  args['event']
  let sScript =  args['script']
  $('#' + sTarget).on(sEvent, eval(sScript));
}

// Set a handler for the "onclick" event on the specified element
//onClick(string $sTarget, string $sScript)
Ejax.prototype.onClick = function (args) {
  let sTarget = args['id']
  let sScript = args['script']
  $('#' + sTarget).on('click', eval(sScript));
}

// Install an event handler on the specified element
//addHandler(string $sTarget, string $sEvent, string $sHandler)
Ejax.prototype.addHandler = function (args) {
  let sTarget = args['id']
  let sEvent  = args['event']
  let sHandler = args['script']
  $('#' + sTarget).on(sEvent, sHandler());
}

// Remove an event handler from the specified element
//removeHandler(string $sTarget, string $sEvent, string
Ejax.prototype.removeHandler = function (args) {
  let sTarget = args['id']
  let sEvent = args['event']
  $('#' + sTarget).off(sEvent);
}

//**************************** End of Response Service Methods *************************************
