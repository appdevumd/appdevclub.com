import { APPS_SCRIPT_ENDPOINT } from "./consts";

const endpointUrlForTarget = target => APPS_SCRIPT_ENDPOINT + "?target=" + target;

fetch(endpointUrlForTarget("events"))
    .then((response) => response.json())
    .then((eventList) => {
        let mountPoint = document.getElementById("events-output");
        mountPoint.textContent = "";

        eventList.forEach(event => {
            let eventListItem = document.createElement("li");
            eventListItem.textContent = `${event.name} (${event.location} on ${event.dateTime})`;
            mountPoint.appendChild(eventListItem);
        })
    });

fetch(endpointUrlForTarget("useful_links"))
    .then((response) => response.json())
    .then((linkList) => {
        let mountPoint = document.getElementById("useful-links-output");
        mountPoint.textContent = "";

        linkList.forEach(link => {
            let containerListItem = document.createElement("li");

            let linkText = document.createElement("a");
            linkText.textContent = `${link.name}`;
            linkText.href = link.url;
            containerListItem.appendChild(linkText);

            mountPoint.appendChild(containerListItem);
        })
    })
    .catch(err => {
        document.querySelector("#useful-links-output li").textContent = "Looks like we don't have any useful links for now. Check back later.";
    })

fetch(endpointUrlForTarget("leadership"))
    .then((response) => response.json())
    .then((data) => {
        let outputHTML = "";
        for (let i = 0; i < data.length; i++) {
            outputHTML += `<div>`;
            outputHTML += `<h3>${data[i]["name"]}</h3>`;
            outputHTML += `<p>${data[i]["role"].replace("&", "&amp;")}</p>`;
            outputHTML += `<div class="socials">`;
            // links
            if (data[i]["github"] != "") {
                outputHTML += `<a href="${data[i]["github"]}" title="GitHub" target="_blank" rel="noopener noreferrer">`;
                outputHTML += `<img src="${new URL("../node_modules/bootstrap-icons/icons/github.svg", import.meta.url)}" alt="GitHub">`;
                outputHTML += `</a>`;
            }

            if (data[i]["linkedin"] != "") {
                outputHTML += `<a href="${data[i]["linkedin"]}" title="LinkedIn" target="_blank" rel="noopener noreferrer">`;
                outputHTML += `<img src="${new URL("../node_modules/bootstrap-icons/icons/linkedin.svg", import.meta.url)}" alt="LinkedIn">`;
                outputHTML += `</a>`;
            }

            if (data[i]["website"] != "") {
                outputHTML += `<a href="${data[i]["website"]}" title="Personal Site" target="_blank" rel="noopener noreferrer">`;
                outputHTML += `<img src="${new URL("../node_modules/bootstrap-icons/icons/browser-safari.svg", import.meta.url)}" alt="Personal Site">`;
                outputHTML += `</a>`;
            }

            outputHTML += `</div>`;
            outputHTML += `</div>`;
        }
        document.querySelector(".leadership").innerHTML = outputHTML;
    });
