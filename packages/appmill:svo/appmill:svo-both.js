// Write your package code here!
Events = new Meteor.Collection("events");

Router.route("/", function () {
    name: "home"
  });

Router.route("/svo/:subject/:verb/:object", 
             { where: 'server', name: "subjectVerbObject" })
  .get(function () {
    // GET everything, or all for a given subject or given sub+verb or 
    // who did what to given object
    // e.g. /0/gave/mike  results in all who gave to mike
    
    var q = {subject:this.params.subject,
                  verb: this.params.verb,
                  object:this.params.object}; //this.params;
    var selector ={};
    var result = {};
    
    /*
    var validParams = ["subject","verb","object"];
    var lookup = _.intersection(validParams,_.keys(this.params));
    _.each(validParams, function(v,k,params) {
      var p = params[v]; // this route only triggers by iron:router if all 3 params here
      if (p != "-" ) { selector[v]= "hi"; }     
    }, this.params);
    
    //result = lookup;
    */
    if ( this.params.subject ) {
      var p = this.params.subject;
      if ( p != "-") {
      _.extend(selector, {"subject":p});
      }
    }
    
    if ( this.params.object ) {
      var p = this.params.object;
      if ( p != "-") {
      _.extend(selector, {"object":this.params.object});
      }
    }
    if ( this.params.verb  ) {
      var p = this.params.verb;
      if ( p != "-") {
        _.extend(selector, {"verb":p});          
      }
    }
    result = {result: Events.find(selector, {$orderby:{"when":1}}).fetch()};
    //result = selector;
    this.response.writeHead(200, {'Content-Type': 'application/json'});
    this.response.end(JSON.stringify(result));
  })
//
// POST Handler
//
  .post(function () {
    // POST /webhooks/stripe
    var result, selector = {};
    if ( this.params.subject ) {
      var p = this.params.subject;
      if ( p != "-") {
      _.extend(selector, {"subject":p});
      }
    }
    
    if ( this.params.object ) {
      var p = this.params.object;
      if ( p != "-") {
      _.extend(selector, {"object":this.params.object});
      }
    }
    if ( this.params.verb  ) {
      var p = this.params.verb;
      if ( p != "-") {
        _.extend(selector, {"verb":p});          
      }
    }
    
    if ( this.request.body ) {
      _.extend(selector, {"params": this.request.body});
    }
    var result = selector;
//    result = this.request.bod;
    result = {"_id": Events.insert(selector)};
    this.response.writeHead(200, {'Content-Type': 'application/json'});
    this.response.end(JSON.stringify(result));
  })
  .put(function () {
    // PUT /webhooks/stripe
    var result = this.request;
    this.response.writeHead(200, {'Content-Type': 'application/json'});
    this.response.end(JSON.stringify(result));
  })