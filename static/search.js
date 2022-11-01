$(document).ready(function() {
})
function display_results(lookup){
    $("#results").empty()
    console.log(lookup)
    find_spreads(lookup)
}
function show_results(results){
    if(results.length > 0){
        console.log(results)
        $.each(results, function(i, spreadVal){
            let row = $("<div class = 'row search-spreads'>")
            $("#results").append(row)

            let col_question = $("<div class = 'col-md-6'>")
            $(col_question).append(spreadVal["question"])
            $(row).append(col_question)

            let col_type = $("<div class = 'col-md-2'>")
            $(col_type).append(spreadVal["spreadType"])
            $(row).append(col_type)

            let col_date = $("<div class = 'col-md-2'>")
            $(col_date).append(spreadVal["date"])
            $(row).append(col_date)

            let col_button = $("<div class = 'col-md-2'>")
            $(col_button).append("<a href='/view/"+spreadVal["id"]+"' id='view' class='btn btn-info' role='button'>View</a>")
            $(row).append(col_button)
            })
    }
    else{
        console.log("No results found")
        $("#results").append("No results found")
    }
}
function find_spreads(lookup){
    $.ajax({
        type: "POST",
        url: "/find_spreads",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(lookup),
        success: function(result){
            let all_data = result["results"]
            results = all_data
            show_results(results)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(lookup)
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
