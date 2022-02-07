const search = document.querySelector("#search");
const input = document.querySelector("#input");
const output = document.querySelector("#output");

let query = "&user_id=191717945@N03";
const apiKey = "f67f8881523113c7e31da88073bfed4a";
const length = 15;

input.addEventListener('submit', e => {
    e.preventDefault();
    output.innerHTML = "";
    query = search.value;
    getData();
});

async function getData() {
    const responseGeneral = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=${length}&extras=owner_name,url_l,url_m&media=photos&content_type=1&format=json&nojsoncallback=1`);
    const data = await responseGeneral.json();

    display(data.photos.photo);
}

const display = Array => {
    Array.forEach(photo => {
        if(photo.url_l === undefined) {
            photo.url_l = photo.url_m;
        }
        const item = document.createElement("article");
        item.innerHTML = `
            <img src="${photo.url_l}" alt="${photo.title}">
            <div class="imageInfo">
                    <h2>${photo.title}</h2>
                    <h2>${photo.ownername}</h2>
            </div>
            <div class="divider"></div>
        `;
        output.appendChild(item);
    });
}

getData();
