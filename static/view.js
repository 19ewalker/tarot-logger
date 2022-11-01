$(document).ready(function() {
})
function display_info(info){
    $("#info").empty()
    console.log(info)
    find_spread(info)
}
function show_info(results){
    console.log(results)

    $("#jumbotron").append("<div class = 'row' id='heading'><div id='spreadType'><h2>"+results["spreadType"]+" Spread, " + results["date"]+ "</h2></div>")
    $("#heading").append("<a href='/edit/"+results["id"]+"' id='edit' class='btn btn-info btn-lg' role='button'>Edit</a></div>")

    let row = $("<div class = 'row'>")
    $("#info").append(row)

    let col_info = $("<div class = 'col-md-12'>")
    $(row).append(col_info)

    let col_question= $("<div class = 'question'><h3>Question Asked: "+ results["question"]+ "</h3>")
    $(col_info).append(col_question)

    let col_about= $("<div class = 'about'><h3>Spread Info: </h3>")
    $(col_info).append(col_about)

    let cards = $("<div class = 'cards'> <b>Cards Drawn: </b>")
    $.each(results["cards"], function(i, card){
        $(cards).append("<a href='/search/"+card+"'>" + card+", </a>")
    })
    $(col_info).append(cards)

    let reader = $("<div class = 'reader'><b>Reader: </b>")
    $(reader).append(results["reader"])
    $(col_info).append(reader)

    let deck= $("<div class = 'deck'><b>Deck: </b>")
    $(deck).append(results["deck"])
    $(col_info).append(deck)


    let notes = $("<div class = 'notes'><b>Spread Notes: </b>")
    $(notes).append(results["notes"])
    $(col_info).append(notes)

}
function find_spread(info){
    $.ajax({
        type: "POST",
        url: "/find_spread",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(info),
        success: function(result){
            let all_data = result["results"]
            results = all_data
            show_info(results)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(info)
            console.log(request)
            console.log(status)
            console.log(error)
            $("#jumbotron").append("404 Error: Page does not exist. Return to <a href='/'>home</a>.")
        }
    });
}
