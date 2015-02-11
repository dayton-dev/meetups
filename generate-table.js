#!/usr/bin/env node

// generate a markdown table from `meetups.json`

var meetups = require('./meetups')

// get the lables from the keys

// if the label is not in the first entry, we won't find it
var labels = Object.keys(meetups[0]);
// this is kind of gross, in that i'm just deleting the rsvp entry
labels.splice(1, 1)

// generate the header
var head = labels.join("|");
var line = labels.map(function() { return "-----" }).join("|");

// simple abstraction to generate a link
function marklink(name, url, url_prefix) {
    if (url_prefix) url = url_prefix + url;
    return [ "[" + name + "]", "(" + url + ")" ].join("");
}

var body = meetups.map(function(meetup) {

    var line = [];

    var name = marklink(meetup.name, meetup.url);
    var rsvp = marklink("rsvp", meetup.rsvp);
    var twitter = meetup.twitter ? marklink("@" + meetup.twitter, meetup.twitter, "https://twitter.com/") : "";
    var github = marklink(meetup.github, meetup.github, "https://github.com/");
    var location = marklink(meetup.location, meetup.location, "https://www.google.com/maps/place/");

    line.push(name, rsvp, twitter, github, location);

    return line.join("|");

}).reduce(function(p, c, i) {
    return p + "\n" + c;
});

console.log(head)
console.log(line)
console.log(body)