// Write your package code here!
Events = new Mongo.Collection("events");

SVOLog = {
  ValidationPattern : Match.ObjectIncluding({subject:String, verb:String, object:Match.Optional(String)}),
    /*
  // a valid svo has at least a subject and a verb, the object can be anything, including blank/non-existent
  return ( svo.subject && svo.verb && (svo.subject != "-") && (svo.verb != "-") )
          //&& (!svo.object || (svo.object && svo.object != "-") ) );
          */

  isValidSVO : function(svo) { return Match.test(svo,this.ValidationPattern); } ,

  add : function(svo) {
    
    var selector = {};
    //console.log(svo);
    check(svo,this.ValidationPattern);

    if ( svo.subject != "-") {
      _.extend(selector, {"subject":svo.subject});
    }
    if ( svo.object != "-") {
      _.extend(selector, {"object":svo.object});
    }
    if ( svo.verb != "-") {
      _.extend(selector, {"verb":svo.verb});          
    }

    var result = {}; 
    result = {"_id": Events.insert(selector)};
    return result;
  },
  query : function(svo) {
    //console.log(svo);
    
    check(svo,this.ValidationPattern);

    var selector ={};

    if ( svo.subject != "-") {
      _.extend(selector, {"subject":svo.subject});
    }
    if ( svo.object != "-") {
      _.extend(selector, {"object":svo.object});
    }
    if ( svo.verb != "-") {
      _.extend(selector, {"verb":svo.verb});          
    }
    return {result: Events.find(selector, {$orderby:{"when":1}}).fetch()};
  } 
};


Router.route("/", function () {
    name: "home"
  });

Router.route("/svo/:subject/:verb/:object", 
             { where: 'server', name: "subjectVerbObject" })
  .get(function () {
    // GET everything, or all for a given subject or given sub+verb or 
    // who did what to given object
    // e.g. /0/gave/mike  results in all who gave to mike
    
    var result = {};

    try {
      var svoObj = {};
      _.extend(svoObj, this.params);
      result = SVOLog.query(svoObj);
      //result = selector;
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(result));
    } 
    catch (e) {
      this.response.writeHead(400, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(e));      
    }
  })

//
// POST Handler
//
  .post(function () {
    // POST /webhooks/stripe
    var result = {};
    var svoObj = {};
    _.extend(svoObj, this.request.body);
    _.extend(svoObj, this.params);
    try {
      result = SVOLog.add(svoObj);
      this.response.writeHead(200, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(result));
    }
    catch (e) {
      this.response.writeHead(400, {'Content-Type': 'application/json'});
      this.response.end(JSON.stringify(e));
    }
  })
  .put(function () {
    this.post();
  })