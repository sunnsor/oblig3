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

function validation(){
    let errorCount = 0;
    let validPhoneNb = $("#phoneNb")[0].checkValidity();
    let validMail = $("#mail")[0].checkValidity();
    let validNumber = $("#number")[0].checkValidity();
    let chosenMovie = $("#chosenMovie").val();
    let inNumber = $("#number").val();
    let inFirstname = $("#firstname").val();
    let inLastname = $("#lastname").val();
    let inPhoneNb = $("#phoneNb").val();
    let inMail = $("#mail").val();

    if (chosenMovie === "" || chosenMovie === "Velg film her"){
        errorCount++
    }
    if (inNumber === 0 || inNumber ===""){
        $("#wrong-number").text("Må skrive noe inn i antall");
        errorCount++
    }
    else {
        $("#wrong-number").text("");
    }
    if (inFirstname === ""){
        $("#wrong-firstname").text("Må skrive noe inn i fornavnet");
        errorCount++
    }
    else {
        $("#wrong-firstname").text("");
    }
    if (inLastname === ""){
        $("#wrong-lastname").text("Må skrive noe inn i etternavnet");
        errorCount++
    }
    else {
        $("#wrong-lastname").text("");
    }
    if (inPhoneNb === ""){
        $("#wrong-phoneNb").text("Må skrive noe inn i telefonnr");
        errorCount++
    }
    else {
        $("#wrong-phoneNb").text("");
    }
    if (inMail === ""){
        $("#wrong-mail").text("Må skrive noe inn i eposten");
        errorCount++
    }
    else {
        $("#wrong-mail").text(   "");
    }
    if (!validPhoneNb||!validMail||!validNumber){
        errorCount++
    }
    return errorCount > 0;
}