const Config = {
    name: "Mike",
    scale: 1,
    Links: [
        [
            "Work",
            [
                ["AWS", "https://d-9c673dcd3b.awsapps.com/start#/"],
                ["Jira", "https://jira.smartstream-stp.com/"],
                ["Confluence", "https://confluence.smartstream-stp.com/"]
            ]
        ],
        [
            "External",
            [
                ["Bookstack", "http://mikeheirani.co.uk:7001"],
                ["GitHub", "https://github.com/mikeheirani?tab=repositories"],
                ["Plex", "https://app.plex.tv/desktop#"],
                ["Torrentleech", "https://www.torrentleech.org"]
            ]
        ],
        [
            "Internal",
            [
                ["Unraid", "http://192.168.0.36:1234/login"],
                ["Transmission", "http://192.168.0.36:9091/transmission/web/"],
                ["BookStack", "http://192.168.0.36/login"],
                ["Jackett", "http://192.168.0.36:9117"],
                ["Sonarr", "http://192.168.0.36:8989"],
                ["Lychee", "http://192.168.0.36:8060"],
                ["Gitlab", "http://192.168.0.36:9080"]
            ]
        ],
        [
            "Social",
            [
                ["Reddit", "https://reddit.com"],
                ["Facebook", "https://facebook.com"]
            ]
        ]
    ]
}

const Main = (() => {
    const list = document.getElementById("list");
    const names = document.querySelectorAll("[data-Name]");
    const search = document.getElementById("search");
    const form = document.forms[0];

    const init = () => {
        list.innerHTML = Config.Links.map(([gName, Links]) => `
            <li id="${gName}">
                <h1 onclick="this.parentNode.classList.toggle('hideChildren')">${gName}</h1>
                <ul>
                    ${Links.map(([lName, url]) => `
                        <li>
                            <a target="_blank" href="${url}">${lName}</a>
                        </li>`
                    ).join("")}
                </ul>
            </li>`

        ).join("")

        names.forEach(el => {
            el.innerText = Config.name;
        });

        document.getElementById("Internal").className = "hideChildren";
        document.getElementById("Work").className = "hideChildren";

        var homeIPAddresses = ["82.37.122.208"];
        var workIPAddresses = ["64.94.171.243"];

        $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {

            const obj = JSON.parse(JSON.stringify(data, null, 2));
            console.log(obj.geobytesipaddress);
            console.log(obj);

            if(workIPAddresses.includes(obj.geobytesipaddress))
            {
                document.getElementById("Work").className = "";
            }

            if(homeIPAddresses.includes(obj.geobytesipaddress))
            {
                document.getElementById("Internal").className = "";
            }

        });

        document.addEventListener("keydown", e => e.key.length === 1 && search.focus());
        search.addEventListener("keydown", () => (window.event ? event.keyCode : e.which) == 13 && form.submit());
    };

    return {
        init,
    };
})();

Main.init()
