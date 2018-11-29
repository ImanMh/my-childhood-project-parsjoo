/**
 * Load Template From File
 * 
 * Load given template from .hbs files. default template folder is
 * src/templates
 * 
 * @param  {String}   templateName template file to load
 * @param  {Function} callback     call when template has been loaded
 */
function getTemplate(templateName, callback) {

    var BASE_TEMPLATE_PATH = "src/templates/";
    var EXTENSION = ".hbs";

    var source,
        template;

    $.ajax({
        url: BASE_TEMPLATE_PATH + templateName + EXTENSION,
        cache: true,
        success: function(data) {
            source = data;
            template = Handlebars.compile(source);

            if(callback) {
                callback(template);
            }
        }
    });
}

/**
 * Render Template Based Specific JSON
 * 
 * @param  {String}     withTemplate Template file to load
 * @param  {Object}     inElement    HTML element to keeps rendered template
 * @param  {string}     jsonQuery    CSS selector (jsonselect) match specific
 *                                   part of JSON
 * @param  {JSON}       withData     An object to feed template
 */
function renderTemplate(withTemplate, inElement, jsonQuery, withData) {
    getTemplate(withTemplate, function(template) {
        $(inElement).html(template(jsonhelper.match(withData, jsonQuery)));
    });
}

function updateURL( params ) {

    var uri = new URI(window.location.href);

    var query = {
        keyword : params.q,
        start : params.start,
        resultsPerPage : params.rows,
        type : params.wt,
        initialized: 1
    };

    uri.addSearch(query);

    history.pushState('', 'New Page Title', uri.href());

}

function updateView( data ) {
    renderTemplate("result_var_image_size_tpl", "#response", "docs", data);
//    renderTemplate("response_header", "#responseHeader", "responseHeader", data);
}

function syncViewByURL() {
    var uri = new URI(window.location.href);
    uri.hasQuery("keyword", function( value ) {
        $("#search-input").val(value);
    })
}

function doSearch() {
    $('#intro').fadeOut('fast');
    $('#logo').slideUp(function () {
        $('#small-logo').fadeIn('fast');
        $('#search-wrapper').addClass('collapsed');
        $('#content').fadeIn();

        $.getJSON("data/sample_json_4.json", function(data) {
            updateURL(data.responseHeader.params);
            updateView(data);
            syncViewByURL();
        });
    });
}

$(document).ready(function() {

    var uri = new URI(window.location.href);

    if (uri.hasSearch("initialized")) {
        doSearch();
    }

    $('#search-panel').delegate('#search-input', 'keypress', function () {
        doSearch();
    })

});
