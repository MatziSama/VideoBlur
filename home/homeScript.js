(async () => {
    const res = await fetch("../sources");
    const videos = await res.json();
    videos.forEach( async (vid, i) => {
        let elm = await createVideoCard(vid);
        addNewCard(elm);
    });
})();

async function createVideoCard(path) {
    if (typeof path !== "string") throw new Error("Only strings are admited");

    const videoInfo = document.createElement("video");
    videoInfo.src = `../sources/${path}`;

    // const imgData = await generateImage(videoInfo);

    const a = document.createElement("a");
    const viewer = document.createElement("div");
    const title = document.createElement("div");
    const image = new Image();

    a.classList.add("card");
    viewer.classList.add("qView");
    title.classList.add("name");
    image.src = "img.jpg";

    a.append(viewer, title);
    viewer.append(image)
    title.textContent = path;

    a.setAttribute("href", (`/video?name=${path}`));

    return a;
    

    /**
     * 
     * @param {HTMLVideoElement} video 
     */
    async function generateImage(video) {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0);
        
        return canvas.toDataURL();
    }
}

function addNewCard(card) {
    const content = document.getElementById("content");
    if (content.childElementCount === 0) {
        const newRow = createRow();
        content.appendChild(newRow);
        newRow.querySelector(".rowContent").append(card);
    } else {
        const lastRow = content.children[content.childElementCount - 1].querySelector(".rowContent");
        if (lastRow.childElementCount < 4) {
            lastRow.appendChild(card);
        } else {
            const newRow = createRow();
            content.appendChild(newRow);
            newRow.querySelector(".rowContent").append(card);
        }
    }
}

function createRow() {
    const mainRow = document.createElement("div");
    const contentRow = document.createElement("div");

    mainRow.classList.add("row");
    contentRow.classList.add("rowContent");

    mainRow.append(contentRow);

    return mainRow;
}