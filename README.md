#Subject-Verb-Object 
##Datastore and Query API

Make sure you have these packages added to your app:
 underscore 
 iron:router 

ReST API:
Insert an event:
POST /svo/[subject]/[verb]/[object]
you may include a json payload that is stored as associated information and returned along with this event when retrieved

specifying subject, verb, object creates a new entry
each entry gets a timestamp automatically.

query API
GET /svo/[subject]/[verb]/[object]
simply use "-" instead of a subject, verb, or object, and the result will be all the matching events.

Result is a JSON object
