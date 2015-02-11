#!/usr/bin/env node

var meetups = require('./meetups')

// get the lables from the keys

// if the label is not in the first entry, we won't find it
var labels = Object.keys(meetups[0]);

// generate the header
var head = labels.join("|");
var line = labels.map(function() { return "-----" }).join("|");

var body = meetups.map(function(meetup) {
    return labels.map(function(label) {
        return meetup[label] ? meetup[label] : "";
    }).reduce(function(p, c, i) {
        return p + "|" + c;
    });
}).reduce(function(p, c, i) {
    return p + "\n" + c;
});

console.log(head)
console.log(line)
console.log(body)