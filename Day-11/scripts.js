/* Get the elements*/
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipbuttons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll(".player__slider");

/*build out functions*/
function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }

}

function updateButton(){
   const icon = this.paused ? '►' : '❚❚'; 
    toggle.textContent = icon; 
}

function skip() {
    
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    video[this.name] = this.value;
 
}

function handdleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(event){
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(event);

}

/*Hook up the event listeners*/
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handdleProgress);
skipbuttons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
let moousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => moousedown && scrub(event));
 
progress.addEventListener('mousedown', () => moousedown= true);
progress.addEventListener('mouseup', () => moousedown= false);