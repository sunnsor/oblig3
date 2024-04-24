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
    let validemail = document.getElementById("email").checkValidity();
    let validNumber = document.getElementById("number").checkValidity();
    let chosenMovie = $("#chosenMovie").val();
    let inNumber = $("#number").val();
    let inFirstname = $("#firstname").val();
    let inLastname = $("#lastname").val();
    let inPhoneNb = $("#phoneNb").val();
    let inemail = $("#email").val();

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
    if (inemail === "") {
        $("#wrong-email").text("Må skrive noe inn i eposten");
        errorCount++
    } else {
        $("#wrong-email").text("");
    }
    if (!validPhoneNb || !validemail || !validNumber) {
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
            phoneNb : $("#phoneNb").val(),
            email : $("#email").val()
        };
        if (validation() === false) {
            console.log("laste billetter")
            tickets.push(ticket);
            $.post("/saveTicket", ticket, function () {
                getTicket();
            });
            $("#chosenMovie").val("")
            $("#number").val("")
            $("#firstname").val("")
            $("#lastname").val("")
            $("#phoneNb").val("")
            $("#email").val("")
        }
}

function getTicket(){
    $.get("/getTicket", function (data) {
        formatTickets(data);
        console.log("hente billetter")
    })
}

function formatTickets(tickets) {
    let out = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th><th></th><th></th></tr>"
    for (const ticket of tickets) {
        out += "<tr><td>" + ticket.movie + "</td><td>" + ticket.number + "</td><td>" + ticket.firstname + "</td><td>" + ticket.lastname + "</td><td>" + ticket.phoneNb + "</td><td>" + ticket.email + "</td>" +
            "<td><a class='btn btn-primary' href='changes.html?id="+ticket.id+"'>Endre</a>" +
            "<td><button class='btn btn-danger' onclick='deleteOne("+ticket.id+")'>Slett</button></td></tr>"
    }
    out += "</table>"
    console.log("printe billetter")
    $("#allTickets").html(out);
}
function deleteOne(id) {
    const url = "/deleteOne?id="+id;
    $.get(url, function() {
        getTicket();
    })
}

function deleteTickets(){
    $.get("/deleteTicket", function () {
        getTicket()
    })
}