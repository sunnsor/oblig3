$(function () {
    const id = window.location.search.substring(1);
    const url = "/getOne?" + id;
    $.get(url, function (ticket) {
        $("#id").val(ticket.id);
        $("#movie").val(ticket.movie);
        $("#number").val(ticket.number);
        $("#firstname").val(ticket.firstname);
        $("#lastname").val(ticket.lastname);
        $("#phoneNb").val(ticket.phoneNb);
        $("#email").val(ticket.email);
    });
});

function changeTicket() {
    const ticket = {
        movie: $("#chosenMovie").val(),
        number: $("#number").val(),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        phoneNb: $("#phoneNb").val(),
        email: $("#email").val()
    };
    $.post("/changeTicket", ticket, function () {
        window.location.href="/index.html";
    });
}