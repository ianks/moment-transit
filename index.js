var moment = require('moment');
var transit = require('transit-js');
var Moment = moment.fn;

var MomentHandler = transit.makeWriteHandler({
 tag: function(v, h) {
   return 'moment'
 },
 rep: function(v, h) {
    if (!v.isValid()) {
       var error = new Error('Transmitting an invalid moment object has undefined behavior');
       console.warn(error);
    }

    return v.format();
 },
 stringRep: function(v, h) {
   return null;
 }
});

var writer = transit.writer('json-verbose', {
 handlers: transit.map([
    Moment.constructor, MomentHandler
 ])
});

var reader = transit.reader('json', {
 handlers: {
   moment: function(v) {
     return moment(v);
   },
 }
});

module.exports = { reader: reader, writer: writer }
