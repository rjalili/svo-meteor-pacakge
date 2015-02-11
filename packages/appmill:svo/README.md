#Subject-Verb-Object Datastore and Query API

Make sure you have these packages added to your app:
 underscore 
 iron:router 

ReST API:
Insert an event:
GET /[subject]/[verb]/[object]

specifying subject, verb, object creates a new entry
each entry gets a timestamp automatically.

query API
simply use "-" instead of a subject, verb, or object, and the result will be all the matching events.

Result is a JSON object

 