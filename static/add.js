$(document).ready(function() {
    $("#newSpread").submit(function( event ){
        event.preventDefault();
        submitSpread();
    })
})
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

    if(no_error){
        let new_spread = {
            "spreadType": spreadType,
            "numCards": numCards,
            "date": date,
            "deck": deck,
            "reader": reader,
            "question": question,
            "cards": cards,
            "notes": notes
        }
        console.log(new_spread)
        save_spread(new_spread)
    }
}
function show_options(current_id){
    $("#see-new-spread").append("<h5>New item successfully created!<h5>")
    $("#see-new-spread").append("<h5>See it <a href='http://127.0.0.1:5000/view/"+current_id+"'>"+"here</a><h5>")
    $("#spreadType").val("")
    $("#date").val("")
    $("#question").val("")
    $("#numCards").val("")
    $("#cards").val("")
    $("#reader").val("")
    $("#deck").val("")
    $("#notes").val("")
}
function save_spread(new_spread){
    $.ajax({
        type: "POST",
        url: "save_spread",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(new_spread),
        success: function(result){
            let all_data = result["current_id"]
            current_id = all_data
            show_options(current_id)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
