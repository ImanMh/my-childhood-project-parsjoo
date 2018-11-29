(function ($) {

    //slide up logo when search-input is focused
    $('#search-panel').delegate('#search-input', 'focus', function (e) {
        $('#logo').slideUp(function () {
            $('#small-logo').fadeIn('fast');
            $('#search-wrapper').addClass('collapsed');
            $('#intro').fadeOut();
            $('#content').fadeIn();
        });
    })

})(jQuery);