window.onload = function() {
    fetch('https://script.google.com/macros/s/AKfycbz3rn7mYGAyQ9_YT5gw2uBvZGZe0kQdmV_HamrT7O6lk_moLbCIozpoow4ZhFBZCiRZ/exec?target=events')
    .then((response) => response.json())
    .then((data) => document.getElementById('events-output').innerHTML = JSON.stringify(data));

    fetch('https://script.google.com/macros/s/AKfycbz3rn7mYGAyQ9_YT5gw2uBvZGZe0kQdmV_HamrT7O6lk_moLbCIozpoow4ZhFBZCiRZ/exec?target=leadership')
    .then((response) => response.json())
    .then((data) => {
        let outputHTML = "";
        for (let i = 0; i < data.length; i ++) {
            outputHTML += `<div>`;
            outputHTML += `<h3>${data[i]['name']}</h3>`;
            outputHTML += `<p>${data[i]['role']}</p>`;
            outputHTML += `<div class="socials">`;
            // links
            if (data[i]['github'] != "") {
                outputHTML += `<a href="${data[i]['github']}" title="LinkedIn" target="_blank" rel="noopener noreferrer">`;
                outputHTML += `<img src="../node_modules/bootstrap-icons/icons/github.svg" alt="GitHub">`;
                outputHTML += `</a>`;
            }

            if (data[i]['linkedin'] != "") {
                outputHTML += `<a href="${data[i]['linkedin']}" title="GitHub" target="_blank" rel="noopener noreferrer">`;
                outputHTML += `<img src="../node_modules/bootstrap-icons/icons/linkedin.svg" alt="LinkedIn">`;
                outputHTML += `</a>`;
            }

            if (data[i]['website'] != "") {
                outputHTML += `<a href="${data[i]['website']}" title="Personal Site" target="_blank" rel="noopener noreferrer">`;
                outputHTML += `<img src="../node_modules/bootstrap-icons/icons/browser-safari.svg" alt="Personal Site">`;
                outputHTML += `</a>`;
            }

            outputHTML += `</div>`;
            outputHTML += `</div>`;
        }
        document.getElementById('test-leadership-output').innerHTML = outputHTML;
    });
}