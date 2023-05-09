let mediaRecorder
let recordedBlobs

const errorMsgElement = document.querySelector('span#errorMsg');
const recordedVideo = document.querySelector('video#recorded');
const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');

document.querySelector("button#start").addEventListener('click', async function(){
    const hasEchoCancellation = document.querySelector("#echoCancellation").checked;
    const constraints = {
        audio:{
            echoCancellation:{exact:hasEchoCancellation}
        },
        video:{
            width:1280,height:720
        }
    };
    console.log('Using media constraints: ', constraints);
    await init(constraints);
});

async function init(constraints){
    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        handleSuccess(stream);
    }
    catch(e){
        console.log(e);
    }
}

function handleSuccess(stream){
    recordButton.disabled = false;
    console.log('getUserMedia() got stream:', stream);
    window.stream = stream;
    const gumVideo = document.querySelector("video#gum");
    gumVideo.srcObject = stream;
}

recordButton.addEventListener("click",() =>{
    if(recordButton.textContent === "Record"){
        startRecording();
    }
    else{
        stopRecording();
        recordButton.textContent = "Record"
        playButton.disabled = false
        downloadButton.disabled = false
    }
});

function stopRecording(){
    mediaRecorder.stop()
}

function startRecording(){
    recordedBlobs = []
    let options = {
        mimeType:'video/webm;codecs=vp9,opus'
    }

    try{
        mediaRecorder = new MediaRecorder(window.stream,options)
    }catch(e){
        console.log(e)
    }

    recordButton.textContent = "Stop Recording"
    playButton.disabled = true
    downloadButton.disabled = true

    mediaRecorder.onstop = (event) => {
        console.log("Recording has stopped")
    }
    mediaRecorder.ondataavailable = handleDataAvailable
    mediaRecorder.start()
}

function handleDataAvailable(event){
    if(event.data && event.data.size > 0 && event.data instanceof Blob){
        recordedBlobs.push(event.data)
    }
}

playButton.addEventListener('click', () => {
    const superBuffer = new Blob(recordedBlobs,{type:'video/webm'})
    recordedVideo.src = null
    recordedVideo.srcObject = null
    recordedVideo.src = window.URL.createObjectURL(superBuffer)
    recordedVideo.controls = true
    recordedVideo.play()
});

downloadButton.addEventListener('click', () => {
    const superBuffer = new Blob(recordedBlobs,{type:'video/mp4'})
    const url = window.URL.createObjectURL(superBuffer)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'test.mp4'
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }, 100);
});