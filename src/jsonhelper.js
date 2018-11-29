/**
 * Main json helper object.
 * 
 * @namespace JsonHelper
 * @type {Object}
 */
var jsonhelper = {};

/**
 * Match a selector in given datasource.
 *
 * Match a selector to find specific part of datasource
 * Very similar to css selectors.
 *
 * @function match
 * @memberOf JsonHelper
 * @param  {object} dataSource given json object to search for matched elements
 * @param  {string} selectStr  full path to select elements of it
 * @return {object} result     keeps matched json elements
 */
jsonhelper.match = function (dataSource, selectStr) {

    var result = {};

    var selectors = selectStr.split("."),
        selector = "",
        lastIndex = selectors[selectors.length - 1];

    /*
     * for example if selectStr is: 'json.docs' it means 'docs' is the important part
     * so I keep last part of selectStr and keep matched elements in it
     */
    result[lastIndex] = [];

    $(selectors).each(function(key, sel) {
        selector += "." + sel;
    });

    JSONSelect.forEach(selector, dataSource, function(o) {
        // if o is an array means looking result is o's children
        // so navigate through them and push every children in the final result
        if (o instanceof Array) {
            $(o).each(function(key, value) {
                result[lastIndex].push(value);
            });
        } else {
           result[lastIndex].push(o);
        }
    });

    return result;
};