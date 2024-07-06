javascript: (function () {
    var currentURL = window.location.href;
    var w3cURL = 'https://validator.w3.org/nu/?doc=' + encodeURIComponent(currentURL);
    window.open(w3cURL, '_blank');
})();
