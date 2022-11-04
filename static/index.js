$(document).ready(function() {
})
function display_all(){
    $("#results").empty()
    all_spreads()
}
function show_results(results){
    if(results.length > 0){
        console.log(results)
        $.each(results, function(i, spreadVal){
            let row = $("<div class = 'row index-spreads'>")
            $("#results").append(row)

            let col_question = $("<div class = 'col-md-5'>")
            $(col_question).append(spreadVal["question"])
            $(row).append(col_question)

            let col_type = $("<div class = 'col-md-3'>")
            $(col_type).append(spreadVal["spreadType"])
            $(row).append(col_type)

            let col_date = $("<div class = 'col-md-2'>")
            $(col_date).append(spreadVal["date"])
            $(row).append(col_date)

            let col_button = $("<div class = 'col-md-2'>")
            $(col_button).append("<a href='/view/"+spreadVal["id"]+"' id='view' class='btn btn-view' role='button'>View</a>")
            $(row).append(col_button)
            })
    }
    else{
        console.log("No results found")
        $("#results").append("No results found")
    }
}
function all_spreads(){
    $.ajax({
        type: "POST",
        url: "/show_all",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(),
        success: function(result){
            let all_data = result["results"]
            results = all_data
            show_results(results)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
