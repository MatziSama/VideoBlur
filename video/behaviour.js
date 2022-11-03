const values = window.location.search;
const urlParams = new URLSearchParams(values);

let videoName = urlParams.get("name");

if (videoName === null) {
    const a = document.createElement("a");
    a.href = `${window.location.protocol}//${window.location.host}/home`;
    a.click();
}