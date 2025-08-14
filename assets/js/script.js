'use strict';


const prevStage = document.querySelector('.stages__prev');
const nextStage = document.querySelector('.stages__next');
const stagesContent = document.querySelector('.stages__list');


let stageShift = 0;
const maxStageSlides = 4;

prevStage.addEventListener('click', stageSlide);
nextStage.addEventListener('click', stageSlide);

function stageSlide(e) {

	let stagesBtnActive = document.querySelector('.stages__slide-btn_active');
	let stageCirleIcon = null;

	if (e.target.classList.contains("stages__prev") && stageShift > 0) {
		stageShift--;
		stageCirleIcon = stagesBtnActive.previousElementSibling;
	}

	if (e.target.classList.contains("stages__next") && stageShift < maxStageSlides) {
		stageShift++;
		stageCirleIcon = stagesBtnActive.nextElementSibling;
	}

	stagesContent.style.transform = `translateX(-${stageShift * 100}%)`;

	if (stageCirleIcon !== null) {
		stagesBtnActive.classList.remove('stages__slide-btn_active');
		stageCirleIcon.classList.add('stages__slide-btn_active');
	}

	changeSliderButtons();

}

function changeSliderButtons() {
	
	if (stageShift == 0) {
		prevStage.classList.add("stages__btn-grey");
	} else {
		prevStage.classList.remove("stages__btn-grey");
	}

	if (stageShift == maxStageSlides) {
		nextStage.classList.add("stages__btn-grey");
	} else {
		nextStage.classList.remove("stages__btn-grey");
	}

}


const participantsCount = document.querySelectorAll(".participants__item").length;

let howMuchParticipantsShow = 3;


const prevMember = document.querySelector('.participants__prev');
const nextMember = document.querySelector('.participants__next');
const currentCount = document.querySelector('.participants__curr-count');
const maxCount = document.querySelector('.participants__max-count');
const sliderContent = document.querySelector('.participants__content');

let participantShift = 0;

function resetSlides() {

	let winWidth = window.innerWidth;
	if (winWidth > 1200) {
		howMuchParticipantsShow = 3;
	} else if (winWidth <= 800) {
		howMuchParticipantsShow = 1;
	} else if (winWidth <= 1200) {
		howMuchParticipantsShow = 2;
	} 

	maxCount.textContent = participantsCount / howMuchParticipantsShow;

	sliderContent.style.transform = `translateX(0)`;
	participantShift = 0;
	
}

window.addEventListener('resize', resetSlides);
resetSlides();

function slideParticipants(e) {

	if (e.target.classList.contains("participants__prev")) {
		participantShift -= howMuchParticipantsShow;
	}

	if (e.target.classList.contains("participants__next")) {
		participantShift += howMuchParticipantsShow;
	}



	if (participantShift >= participantsCount) {
		participantShift = 0;
	}

	if (participantShift < 0) {
		participantShift = participantsCount / howMuchParticipantsShow + 1;
	}

	sliderContent.style.transform = `translateX(-${participantShift * 100}%)`;
	currentCount.textContent =  participantShift / howMuchParticipantsShow + 1;

}

prevMember.addEventListener('click', slideParticipants);
nextMember.addEventListener('click', slideParticipants);

const interval = setInterval(() => {
  nextMember.click();
}, 4000);
