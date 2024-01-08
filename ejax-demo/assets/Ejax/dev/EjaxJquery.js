/**
 * This is the client side JS of the Ejax project.
 * This vesion uses Jquery instead DOM manipulation
 */

class Ejax { 
  ejjson = '';      //Received request JSON
  bErrored = false; //Error flag
  url = '';         //Server URL

  //"Constructor" just stashes the target url
  constructor(sUrl) {
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
  async request(theURL, theMethod, theArgs) {
    this.bErrored = false; //No error has ocurred - global
  
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
      this.handleResponse(json); //Success! Handle it.

    } catch (error) {
      this.bErrored = true;
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
  handleResponse(data) {
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
  //assign('msg', 'html/text/value', "Hello $data");
  assign(args) {
    let id = args['id'];
    let attribute = args['attribute'];
    let value = args['msg'];

    if (id == '' || attribute == '' || value == '') {
      alert('In the assign method, id, attribute and value are all required.');
      throw new Error('In assign, all parameters must be non blank".');
      return false;
    }
    switch(attribute)
    {
      case 'html':
        $('#'.id).html(value);
        break;
      case 'text':
        $('#'.id).text(value);
        break;
      case 'value':
        $('#'.id).val(value);
        break;
      case 'innerText':
        $('#'.id).attr('innerText', value);
        break;
      
    }
    
  }

  // Append the specified data to the given element's attribute
  //append(string $sTarget, string $sAttribute, string $sData)
  append(args) {
    let id = args['id'];
    let property = args['prop'];
    let value = args['value'];

    let content = document.getElementById(id).innerHTML + value;
    document.getElementById(id).innerHTML = content;
  }

  // Prepend the specified data to the given element's attribute
  //prepend(string $sTarget, string $sAttribute, string $sData)
  prepend(args) {
    let id = args['id'];
    let property = args['prop'];
    let value = args['value'];

    let content = value + document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = content;
  }

  // Replace a specified value with another value within the given element's attribute
  //replace(string $sTarget, string $sAttribute, string $sSearch, string $sData)
  replace(args) {
    var id = args['id'];
    var attribute = args['prop'];
    var searchval = args['search'];
    var replaceval = args['value'];

    var content = document.getElementById(id).innerHTML;

    let res = content.replace(searchval, replaceval);

    document.getElementById(id).innerHTML = res;
  }

  // Clear the text of an element
  // div=innerHTML, input="value", p=innerHTML, button=innerhtml
  clearText(args) {
    var id = args['id'];
    var element = document.getElementById(id);
    var tagtype = element.tagName;
    tagtype = tagtype.toLowerCase();
    switch(tagtype)
    {
      case 'div':
      case 'p':
      case 'button':
        element.innerHTML = '';
        break;
      case 'input':
        element.value = '';
        break;
      default:
        element.text = '';
        break;
    }
    
  }

  // Create a new element in the document
  //create(string $sParent, string $sTag, string $sId, string $position)
  //position takes before or after only
  create(args) {
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
  remove(args) {
    let sTarget = args['id'];
    document.getElementById(sTarget).remove();
  }

  //Call a JS function passing args
  call(args) {
    let x = args.method + '(' + args.params + ')';
    eval(x);
  }

  //Add a css value to the target id
  addCSS(args) { //id, prop, value) {
    let id = args['id'];
    let prop = args['prop'];
    let value = args['value'];
    document.getElementById(id).style[prop] = value
    //$('#' + id).css(prop, value);
  }

  //or remove it...
  removeCSS(args) { //id, prop) {
    let id = args['id'];
    let prop = args['prop'];
    document.getElementById(id).style.removeProperty(prop);
  }

  /*
  Running javascript code
   */

  // Display an alert message
  //alert(string $sMessage)
  alert(args) {
    alert(args['message']);
  }

  // Execute the specified javascript code
  //script(string $sJsCode)
  script(args) {
    var js = args['jscode'];
    eval(js);
  }

  //**************************** End of Response Service Methods *************************************
} //Class End

  