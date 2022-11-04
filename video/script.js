const playDiv = document.getElementById("control");
const video = document.getElementById("mainVideo");
const canvas = document.getElementById("videoBlur");
const homeButton = document.getElementById("homeButton");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

video.src = `../sources/${videoName}`;

video.addEventListener("loadedmetadata", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
})

video.addEventListener("load", () => {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    canvas.classList.add("loaded");
})

video.addEventListener("play", () => {
    const ctx = canvas.getContext("2d");
    video.volume = 0.05;
    const timer = setInterval(() => {
        ctx.drawImage(video, 0, 0);
    }, 30);

    video.addEventListener("pause", () => {
        clearInterval(timer);
    })

    video.addEventListener("ended", () => {
        clearInterval(timer);
    })

    canvas.classList.add("loaded");
})

playDiv.addEventListener("click", () => {
    if (video.paused) {
        video.classList.remove("paused");
        video.play();
        playDiv.querySelector("button").classList.add("hide");
    } else {
        video.classList.add("paused");
        video.pause();
        playDiv.querySelector("button").classList.remove("hide");
    }
})

homeButton.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = "/home";
    a.click();
})

prevButton.addEventListener("click", async () => {
    const url = await changeVideo("prev");
    const a = document.createElement("a");
    a.href = `/video?name=${url}`;
    a.click();
})

nextButton.addEventListener("click", async () => {
    const url = await changeVideo("next");
    const a = document.createElement("a");
    a.href = `/video?name=${url}`;
    a.click();
})

async function changeVideo(action) {
    if (typeof action !== "string") throw new Error("Only strings are admited");
    const actualVideo = window.location.search.split("=")[1];
    const videoList = await fetch("../sources");
    const list = await videoList.json();

    if (action === "next") {

        let index = list.indexOf(actualVideo) + 1;
        if (index >= list.length) index = 0;
        return list[index];

    } else if (action === "prev") {

        let index = list.indexOf(actualVideo) - 1;
        if (index < 0) index = list.length - 1;
        return list[index];

    } else throw new Error("Unknow action")
}