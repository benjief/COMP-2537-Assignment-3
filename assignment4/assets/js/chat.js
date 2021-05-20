"use strict"

let socket = io("ws://localhost:8000");

socket.on('user_joined', function(data) {
    let beginTag = "<p style='color: bisque;'>";
    let numOfUsers = data.numOfUsers;
    let userStr = "";
    if(numOfUsers == 1) {
        userStr = "user";
    } else {
        userStr = "users";
    }
    if(numOfUsers < 2) {

        $("#chat_content").append("<p>Just you, no one else.</p>");

    } else {
        $("#chat_content").append(beginTag + data.user
            + " connected. There are " + numOfUsers + " " + userStr + ".</p>");

    }

});

socket.on('user_left', function(data) {
    let beginTag = "<p style='color: burlywood;'>";
    let numOfUsers = data.numOfUsers;
    let userStr = "";
    if(numOfUsers == 1) {
        userStr = "user";
    } else {
        userStr = "users";
    }
    if(numOfUsers < 2) {

        $("#chat_content").append("<p>" + data.user + " left. You are now all alone on this chat server <span style='font-size: 1.2em; color: blue;'>☹</span>.</p>");


    } else {

        $("#chat_content").append(beginTag + data.user
            + " left. Now chatting with " + numOfUsers + " " + userStr + "</p>");

    }

});

// this is from others - not our text
socket.on('chatting', function(data) {
    //console.log(data);
    let me = $("#username").val();
    let beginTag = "<p>";
    if(me == data.user) {
        beginTag = "<p style='color: darkblue;'>";
    }
    if(data.event) {
        $("#chat_content").append("<p style='color: orange;'>" + data.event + "</p>");
    }
    $("#chat_content").append(beginTag + data.user + " said: " + data.text + "</p>");

});


$("#send").on('click', function() {

    let name = $("#username").val();
    let text = $("#msg").val();

    // check if the name is blank, shouldn't be
    // if(name == null || name === "") {
    //     $("#name").fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    //     return;
    // }
    if(text == null || text === "") {
        $("#msg").fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
        return;
    }
    socket.emit('chatting', {"name": name, message: text});
    $("#msg").val("");
});
