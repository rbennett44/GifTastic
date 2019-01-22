// var topics = ['hockey', 'red sox', 'canada', 'castle', 'harry potter',
// 'piano', 'japanese', 'ice skating', 'languages', 'star wars'];

// alert("We are in!");
console.log("Connected");  

//VARIABLES
//------------------------------------------------------
var topics = ['Dog', 'Cat', 'Bird', 'Wolf', 'Tiger', 'Scooby Doo'];


//FUNCTIONS
//------------------------------------------------------

//Setting it up to load things on the page when it comes up
$(function() {
    renderButtons(topics, 'searchButton', '#buttonArea');
    console.log("Page loaded");
});


//Adding buttons to the page
function renderButtons(topics,classToAdd,areaToAddTo) {
    //keep other buttons from loading when doing new search
    $(areaToAddTo).empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $('<button>');
        //adds a class to the button and assigns that class from the classToAdd variable
        a.addClass(classToAdd);
        //adds a data attribute
        a.attr('data-type', topics[i]);
        //provides button text
        a.text(topics[i]);
        $(areaToAddTo).append(a);
        // console.log(areaToAddTo);
    };
};

$(document).on('click', ".searchButton", function() {
    $('#searches').empty();
    var type = $(this).data('type');
    // console.log(type);
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=lFB6GHwVTsdPXiy6A36kTS8ZdifALdBu&limit=10';
    $.ajax({url: queryURL, method:'GET'})
    .done(function(response) {
        // console.log(response);
        for(var i = 0; i < response.data.length; i++) {
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: '+ rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', 'still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').append(searchDiv);
        };
    });
});

//animate and stillify the giphs
$(document).on('click', '.searchImage', function() {
    var state = $(this).attr('data-state');
    if(state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

//Have search add new buttons
$('#addSearch').on('click', function() {
    var newSearch = $('input').eq(0).val();
    topics.push(newSearch);
    renderButtons(topics, 'searchButton', '#buttonArea');
    return false;
});
