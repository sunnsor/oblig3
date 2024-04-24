let tickets = [];

$(function() {
    getTicket();
    getMovie();
})

function getMovie(){
    $.get("/getMovie",function (movies) {
        formatMovies(movies);
    })
}

function formatMovies (movies) {
    let out = "<select id='chosenMovie' required> <option label='Velg film her'></option>"
    for (const movie of movies) {
        out += "<option>" + movie.movie + "</option>"
    }

    out += "</select>"
    $("#movie").html(out);
}

function validation() {
    let errorCount = 0;
    let validPhoneNb = document.getElementById("phoneNb").checkValidity();
    let validMail = document.getElementById("mail").checkValidity();
    let validNumber = document.getElementById("number").checkValidity();
    let chosenMovie = $("#chosenMovie").val();
    let inNumber = $("#number").val();
    let inFirstname = $("#firstname").val();
    let inLastname = $("#lastname").val();
    let inPhoneNb = $("#phoneNb").val();
    let inMail = $("#mail").val();

    if (chosenMovie === "" || chosenMovie === "Velg film her") {
        errorCount++
    }
    if (inNumber === 0 || inNumber === "") {
        $("#wrong-number").text("Må skrive noe inn i antall");
        errorCount++
    } else {
        $("#wrong-number").text("");
    }
    if (inFirstname === "") {
        $("#wrong-firstname").text("Må skrive noe inn i fornavnet");
        errorCount++
    } else {
        $("#wrong-firstname").text("");
    }
    if (inLastname === "") {
        $("#wrong-lastname").text("Må skrive noe inn i etternavnet");
        errorCount++
    } else {
        $("#wrong-lastname").text("");
    }
    if (inPhoneNb === "") {
        $("#wrong-phoneNb").text("Må skrive noe inn i telefonnr");
        errorCount++
    } else {
        $("#wrong-phoneNb").text("");
    }
    if (inMail === "") {
        $("#wrong-mail").text("Må skrive noe inn i eposten");
        errorCount++
    } else {
        $("#wrong-mail").text("");
    }
    if (!validPhoneNb || !validMail || !validNumber) {
        errorCount++
    }
    return errorCount > 0;
}

function regTicket() {
        const ticket = {
            movie: $("#chosenMovie").val(),
            number: $("#number").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            phone : $("#phoneNb").val(),
            mail : $("#mail").val()
        };
        if (validation() === false) {
            tickets.push(ticket);
            $.post("/saveTicket", ticket, function () {
                getTicket();
            })
            $("#chosenMovie").val("")
            $("#number").val("")
            $("#firstname").val("")
            $("#lastname").val("")
            $("#phoneNb").val("")
            $("#mail").val("")
        }
}

function getTicket(){
    $.get("/getTicket", function (data) {
        formatTickets(data);
    })
}

function formatTickets(tickets) {
    let out = "<table class='table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th></tr>"
    for (const ticket of tickets) {
        out += "<tr><td>" + ticket.movie + "</td><td>" + ticket.number + "</td><td>" + ticket.firstname + "</td><td>" + ticket.lastname + "</td><td>" + ticket.phone + "</td><td>" + ticket.mail + "</td></tr>"
    }
    out += "</table>"
    $("#allTickets").html(out);
}

function deleteTickets(){
    $.get("/deleteTicket", function () {
        getTicket()
    })
}