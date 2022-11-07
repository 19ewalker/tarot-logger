$(document).ready(function() {
    $("#editSpread").submit(function( event ){
        event.preventDefault();
        submitSpread();
    })
    $("#delete").click(function(){
        event.preventDefault();
        if (confirm('Are you sure ?')) {
             deleteSpread();
        }
        else {
        }
    })
})
function display_info(info){
    find_info(info)
}
function show_info(results){
    $("#spreadType").val(results["spreadType"])
    $("#date").val(results["date"])
    $("#question").val(results["question"])
    $("#numCards").val(results["numCards"])
    $("#cards").val(results["cards"])
    $("#reader").val(results["reader"])
    $("#deck").val(results["deck"])
    $("#notes").val(results["notes"])
}
function find_info(info){
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
            $("#jumbotron").append("404 Error: Cannot edit a page that does not exist. Return to <a href='/'>home</a>.")
            document.getElementById("spreadType").disabled = true;
            document.getElementById("numCards").disabled = true;
            document.getElementById("date").disabled = true;
            document.getElementById("deck").disabled = true;
            document.getElementById("reader").disabled = true;
            document.getElementById("question").disabled = true;
            document.getElementById("cards").disabled = true;
            document.getElementById("notes").disabled = true;

            document.getElementById("submit-button").disabled = true;
            document.getElementById("discard").disabled = true;
            document.getElementById("delete").disabled = true;
        }
    });
}
function submitSpread(){
    let spreadType = $.trim( $("#spreadType").val())
    let numCards = $.trim( $("#numCards").val())
    let date = $.trim( $("#date").val())
    let deck = $.trim( $("#deck").val())
    let reader = $.trim( $("#reader").val())
    let question = $.trim( $("#question").val())
    let cards = $.trim( $("#cards").val())
    let notes = $.trim( $("#notes").val())

    let no_error = true

    if(spreadType == ""){
        $("#spreadType_warning_div").append('<div class = "warning">Spread type cannot be empty</div>')
        $("#title").val("")
        $("#title").focus()
        no_error = false
        console.log("Spread type is empty")
    }
    if(numCards == ""){
        $("#num_cards_warning_div").append('<div class = "warning"># of cards cannot be empty</div>')
        $("#numCards").val("")
        $("#numCards").focus()
        no_error = false
    }
    if(date == ""){
        $("#date_warning_div").append('<div class = "warning">Date cannot be empty</div>')
        $("#date").val("")
        $("#date").focus()
        no_error = false
    }
    if(deck == ""){
        $("#deck_warning_div").append('<div class = "warning">Deck used cannot be empty</div>')
        $("#deck").val("")
        $("#deck").focus()
        no_error = false
    }
    if(reader == ""){
        $("#reader_warning_div").append('<div class = "warning">Reader cannot be empty</div>')
        $("#reader").val("")
        $("#reader").focus()
        no_error = false
    }
    if(cards == ""){
        $("#cards_warning_div").append('<div class = "warning">Cards cannot be empty</div>')
        $("#cards").val("")
        $("#cards").focus()
        no_error = false
    }
    let pathName = $(location).attr('pathname');
    let pathId = pathName.slice(6)
    console.log(pathName)
    if(no_error){
        let edit_spread = {
            "spreadType": spreadType,
            "numCards": numCards,
            "date": date,
            "deck": deck,
            "reader": reader,
            "question": question,
            "cards": cards,
            "notes": notes,
            "id": pathId
        }
        console.log(edit_spread)
        update_spread(edit_spread)
    }
}
function deleteSpread(){
    let pathName = $(location).attr('pathname');
    let pathId = pathName.slice(6)
    console.log(pathName)
    let deleteID = {
        "id": pathId
    }
    console.log(deleteID)
    delete_spread(deleteID)
}
function show_options(id){
    location.replace("/view/" + id);
}
function show_home(){
    location.replace("/");
}
function update_spread(edit_spread){
    $.ajax({
        type: "POST",
        url: "/update_spread",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(edit_spread),
        success: function(result){
            let all_data = result["id"]
            id = all_data
            show_options(id)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(edit_spread)
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
function delete_spread(deleteID){
    $.ajax({
        type: "POST",
        url: "/delete_spread",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(deleteID),
        success: function(result){
            show_home()
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(deleteID)
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
