browser.tabs.query({currentWindow: true, active: true})
    .then(tabs => {
        var url = new URL(tabs[0].url);
        return browser.cookies.getAll({
            "url": url.toString()
        });
    })
    .then(cookies => {
        var value = "# domain\tsub domains\tpath\thttps only\texpiration date\tname\tvalue\n";
        cookies.forEach(cookie => {
            value += cookie.domain + "\t" +
                !cookie.hostOnly + "\t" +
                cookie.path + "\t" +
                !cookie.httpOnly + "\t" +
                ((typeof cookie.expirationDate !== 'undefined') ? cookie.expirationDate : 0) + "\t" +
                cookie.name + "\t" +
                cookie.value + "\n";
        });
        document.getElementById("cookie-result").innerText = value;
    })
    .catch(error => {
        document.getElementById("cookie-result").innerText = error;
    });