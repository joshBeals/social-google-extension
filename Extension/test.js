// Import Classes
import Test from './classes/test2.js'; 
import Socials from './classes/Socials.js'; 

// Instantiate Classes
const socials = new Socials();
socials.CreateComPort();

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

window.dataLayer = window.dataLayer || [];


socials.SendMessage("minFollowing", "minFollowing", 100);


$(document).on('change', '#minPhoto', function(event) {
    d = document.getElementById("minPhoto").value;
    socials.SendMessage("minPhoto", "minPhoto", d);
});

$(document).on('change', '#maxFollower', function(event) {
    d = document.getElementById("maxFollower").value;
    socials.SendMessage("maxFollowers", "maxFollowers", d);
});

$(document).on('change', '#minFollower', function(event) {
    d = document.getElementById("minFollower").value;
    socials.SendMessage("minFollowers", "minFollowers", d);
});

$(document).on('change', '#minFollowing', function(event) {
    d = document.getElementById("minFollowing").value;
    socials.SendMessage("minFollowing", "minFollowing", d);


});

$(document).on('change', '#maxFollowing', function(event) {
    d = document.getElementById("maxFollowing").value;
    socials.SendMessage("maxFollowing", "maxFollowing", d);
});

$(document).on('click', '#whitelist-user', function(event) {
    let user = prompt("Please enter the username exactly");
    if (user) {
        let split_users = user.split(",");
        for (let kk = 0; kk < split_users.length; kk++) {
            socials.SendMessage("AddUserToWhitelistName", "username", split_users[kk].split(',').join('').split(' ').join('').split('@').join(''));
        }

        $("#add-user-results").empty();
        $("#add-user-search").val("");
    }

});