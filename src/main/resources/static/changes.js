$(function () {
    getMovie();
});

function getMovie() {
    $.get("/getMovie", function (movies) {
        formatMovies(movies);
        getOneTicket();
    });
}

function formatMovies(movies) {
    let out = "<select id='chosenMovie' required> <option label='Velg film her'></option>"
    for (const movie of movies) {
        out += "<option>" + movie.movie + "</option>"
    }

    out += "</select>"
    $("#movie").html(out);
}

function getOneTicket() {
    const id = window.location.search.substring(1);
    const url = "/getOne?" + id;
    $.get(url, function (ticket) {
        if (ticket) {
            $("#id").val(ticket.id);
            $("#chosenMovie").val(ticket.movie);
            $("#number").val(ticket.number);
            $("#firstname").val(ticket.firstname);
            $("#lastname").val(ticket.lastname);
            $("#phoneNb").val(ticket.phoneNb);
            $("#email").val(ticket.email);
        } else {
            $("#id").val('');
            $("#chosenMovie").val('');
            $("#number").val('');
            $("#firstname").val('');
            $("#lastname").val('');
            $("#phoneNb").val('');
            $("#email").val('');
        }
    });
}

function changeTicket() {
    const ticket = {
        id: $("#id").val(),
        movie: $("#chosenMovie").val(),
        number: $("#number").val(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        phoneNb: $("#phoneNb").val(),
        email: $("#email").val()
    };
    $.post("/changeTicket", ticket, function () {
        window.location.href = "/index.html";
    });
}
