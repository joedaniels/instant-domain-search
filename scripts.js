// Create a config.js file with a string named mashapeDomainrApiKey that holds your Mashape API key
let apiKey = mashapeDomainrApiKey;

$('#search_term').on('input', function () {
    $.getJSON("https://domainr.p.mashape.com/v2/search?mashape-key=" + apiKey + "&query=" + $(this).val() + "&location=gb&registrar=namecheap.com").done(function (data) {
        // Clear out the results from previus search term
        $('.results').empty();

        // Iterate through all results from Domainr
        for (var i = 0; i < data.results.length; i++) {
            let domain = data.results[i].domain;
            let index = i;

            // Add the domain name suggestions to DOM (not including availabilty)
            $('.results').append('<p id="' + i + '">' + domain + '</p>');

            // Get the availability for each domain suggestion
            $.getJSON('https://domainr.p.mashape.com/v2/status?mashape-key=' + apiKey + '&domain=' + domain).done(function (d) {
                $('#a' + index).remove();

                let status = d.status[0].status;

                if (status.includes('inactive')) {
                    // Add a link around domain name that opens namecheap.com registration
                    // And colour text green
                    $('#' + index).replaceWith(function() {
                        return '<p class="font-weight-bold"><a href="https://www.namecheap.com/domains/registration/results.aspx?domain=' + domain + '" target="_blank" class="text-success" id="a' + index + '">' + $(this).text() + '</a></p>'
                    });;
                } else {
                    // Color text red to show domain name is taken
                    $('#' + index).addClass('text-danger');
                }
            });
        }
    })
});