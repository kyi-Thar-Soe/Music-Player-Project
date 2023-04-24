const playListContainer = document.querySelector(".playListContainer");
const audioTag = document.querySelector(".audioTag");
const currentAndTotalTime= document.querySelector(".currentAndTotalTime");
const currentProgress= document.querySelector(".currentProgress");
const playButton = document.querySelector(".playButton");
const pauseButton = document.querySelector(".pauseButton");
const previousButton = document.querySelector(".previousButton");
const nextButton = document.querySelector(".nextButton");

const tracks = [
    { trackId: "music/track01.mp3" , title: "Flower - Jisoo" , image: "image/image-1.jpg"},
    { trackId: "music/track02.mp3" , title: "Photograph - Ed-Sheeran" , image: "image/image-2.jpg"},
    { trackId: "music/track03.mp3" , title: "Enchanted - Talyorswift" , image: "image/image-3.jpg"},
    { trackId: "music/track04.mp3" , title: "DDU DU DDU - Blackpink" , image: "image/image-4.jpg"},
    { trackId: "music/track05.mp3" , title: "Likely - Twice" , image: "image/image-5.jpg"},
];
for(let i=0; i<tracks.length; i++){
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click",() => {
        const trackId = tracks[i].trackId;
        audioTag.src = trackId;
        audioTag.play();
        isPlaying = true; // trackTag and PlayPauseButton
        updatePlayAndPauseButton();
        currentPlayingIndex = i;//previous and next button loop
        
    });

    trackTag.classList.add("trackItem");
//Track Title
    const title = (i+1).toString()+ ". " +tracks[i].title;
    const trackListTag = document.createElement("div");
    trackListTag.textContent = title;
    trackListTag.classList.add("trackList");
//Track Image
    const trackImageSpanTag = document.createElement("span");
    const trackImageTag = document.createElement("img");
    trackImageTag.src = tracks[i].image;
    trackImageTag.classList.add("trackImage");
//All Append
    trackImageSpanTag.append(trackImageTag);
    trackTag.append(trackListTag,trackImageSpanTag);
    playListContainer.append(trackTag);
}
//Time
let durationText="00:00";
let duration;
audioTag.addEventListener("loadeddata",() => {
    //console.log(audioTag.duration); 173.04
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration);
    
});
let currentTime;//PlayButton scope
audioTag.addEventListener("timeupdate",() => {
    currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
     const currentTimeTextAndDurationText = currentTimeText+ "/" +durationText;
    currentAndTotalTime.textContent = currentTimeTextAndDurationText;
    updateCurrentProgress();
    
});
//Progress Bar
const updateCurrentProgress = () => {
    const currentProgressWidth = (300/duration) * currentTime; // reassign duration cuz scope
    currentProgress.style.width = currentProgressWidth.toString() + "px";

};
//Play Button
let currentPlayingIndex = 0;
let isPlaying = false;
playButton.addEventListener("click",() => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying=true;//update PlayButton
    if(currentTime === 0){//Restart Time
    playSong();
    }else{
        audioTag.play();
        updatePlayAndPauseButton();
    }
    
});
//Pause Button
pauseButton.addEventListener("click",() => {
    isPlaying =false;
    audioTag.pause();
    updatePlayAndPauseButton();
});
//Previous Button
previousButton.addEventListener("click",() => {
    if(currentPlayingIndex === 0){
        return;
    }
    currentPlayingIndex -= 1;
    playSong();
});
//Next Button
nextButton.addEventListener("click",() =>{
    if(currentPlayingIndex === tracks.length-1){
        return;
    }
    currentPlayingIndex +=1;
    playSong();
});
//DRY
const createMinuteAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;
    const minuteText = minutes <10 ? "0"+minutes.toString() : minutes;
    const secondText = seconds <10? "0"+seconds.toString() : seconds;
    return minuteText + ":" +secondText;
};
const updatePlayAndPauseButton= () => {
    if(isPlaying === true){
        playButton.style.display = "none";
        pauseButton.style.display ="inline";
    }else{
        playButton.style.display = "inline";
        pauseButton.style.display ="none";
    }
};
const playSong = () => {
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
};
