$(document).ready(function() {
})
function display_info(info){
    $("#info").empty()
    console.log(info)
    find_spread(info)
}
function show_info(results){
    console.log(results)

    $("#jumbotron").append("<div id='spreadType'><h2>"+results["spreadType"]+" Spread, " + results["date"]+ "</h2></div>")
    $("#jumbotron").append("<a href='/edit/"+results["id"]+"' id='edit' class='btn btn-info' role='button'>Edit</a>")

    let row = $("<div class = 'row'>")
    $("#info").append(row)

    let col_info = $("<div class = 'col-md-6'>")
    $(row).append(col_info)

    let spreadType = $("<div class = 'spreadType'><b>Spread Type: </b>")
    $(spreadType).append("<a href='/search/"+results["spreadType"] + "'>"+ results["spreadType"] +"</a>")
    $(col_info).append(spreadType)

    let date = $("<div class = 'date'><b>Date: </b>")
    $(date).append(results["date"])
    $(col_info).append(date)

    let deck= $("<div class = 'deck'><b>Deck: </b>")
    $(deck).append(results["deck"])
    $(col_info).append(deck)

    let reader = $("<div class = 'reader'><b>Reader: </b>")
    $(reader).append(results["reader"])
    $(col_info).append(reader)

    let cards = $("<div class = 'cards'> <b>Cards Drawn: </b>")
    $.each(results["cards"], function(i, card){
        $(cards).append("<a href='/search/"+card+"'>" + card+", </a>")
    })
    $(col_info).append(cards)

    let col_notes = $("<div class = 'col-md-6'><b>Question Asked: </b>")
    $(col_notes).append(results["question"])
    $(row).append(col_notes)

    let notes = $("<div class = 'deck'><b>Spread Notes: </b>")
    $(notes).append(results["notes"])
    $(col_notes).append(notes)

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
