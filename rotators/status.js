const statusesmodule = require('./statuses');
const statuses = statusesmodule.getStatuses();
console.log(statuses)
var activities = ['online', 'idle', 'dnd']
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var last =  getRandomInt(statuses.length);
var lastac =  getRandomInt(activities.length);

async function rotate(client) {
    var random = getRandomInt(statuses.length)
    while (last === random){
        random = getRandomInt(statuses.length)
    }
    last = random
    var randomac = getRandomInt(activities.length)
    while (lastac === randomac){
        randomac = getRandomInt(activities.length)
    }
    lastac = randomac
    var presence = statuses[random]
    presence["status"] = activities[randomac]
    client.user.setPresence(presence);
}
exports.startRotation = async function (client) {
    setInterval(rotate, 60000, client);
    rotate(client)
    console.log("Started status rotator")
}