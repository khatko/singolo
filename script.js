/* header */

let navLinks = document.querySelectorAll(".navigation__link");

function navigateToSection(event) {
  navLinks.forEach(link => link.classList.remove("navigation__link_active"));
  event.currentTarget.classList.add("navigation__link_active");
}

navLinks.forEach(link => link.addEventListener("click", navigateToSection));


/* slider */

let sliders = document.querySelectorAll(".slider__item");
let activeSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
  activeSlide = (n + sliders.length) % sliders.length;
}

function hideSlide(direction) {
  isEnabled = false;
	sliders[activeSlide].classList.add(direction);
	sliders[activeSlide].addEventListener('animationend', function() {
		this.classList.remove("block-showed", direction);
	});
}

function showSlide(direction) {
  sliders[activeSlide].classList.add('next', direction);
	sliders[activeSlide].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('block-showed');
		isEnabled = true;
	});
}

function showPrevSlide(n) {
  hideSlide('to-left');
	changeCurrentSlide(n + 1);
	showSlide('from-right');
}

function showNextSlide(n) {
  hideSlide('to-right');
	changeCurrentSlide(n - 1);
	showSlide('from-left');
}

document.querySelectorAll(".slider__arrow_prev").forEach(el => el.addEventListener("click", function() {
  if (isEnabled) {
		showPrevSlide(activeSlide);
	}
}));

document.querySelectorAll(".slider__arrow_next").forEach(el => el.addEventListener("click", function() {
  if (isEnabled) {
		showNextSlide(activeSlide);
	}
}));

/* screen */

let phones = document.querySelectorAll(".phone");

function changeScreen(event) {
  let phone = event.currentTarget;
  let buttonX = phone.offsetWidth/ 2;
  let buttonY = phone.offsetHeight - 30;
  let r = 20;

  var x = event.offsetX;
  var y = event.offsetY;

  if (Math.pow((buttonX - x), 2) + Math.pow((buttonY - y), 2) <= Math.pow(r, 2)) {
    let screen = event.currentTarget.parentElement.querySelector("div.screen");
    let isScreenActive = screen.classList.contains("screen_active");

    if (isScreenActive) {
      screen.classList.remove("screen_active");
    } else {
      screen.classList.add("screen_active");
    }
  }
}

phones.forEach(phone => phone.addEventListener("click", changeScreen));

/* tags */

let tags = document.querySelectorAll(".tag");

function showPortfolioByTag(event) {
  tags.forEach(tag => tag.classList.remove("tag_selected"));
  event.currentTarget.classList.add("tag_selected");

  let projects = document.querySelector(".portfolio__projects");
  let projectFirst = projects.firstElementChild;
  projects.removeChild(projectFirst);
  projects.appendChild(projectFirst);
}

tags.forEach(tag => tag.addEventListener("click", showPortfolioByTag));

/* project image*/

let projectImages = document.querySelectorAll(".project__image");

function selectProject(event) {
  projectImages.forEach(image => image.classList.remove("image_selected"));
  event.currentTarget.classList.add("image_selected");
}

projectImages.forEach(image => image.addEventListener("click", selectProject));

/* modal window */

let modalWindow = document.querySelector(".modal");
let modalBody =  modalWindow.querySelector(".modal__body");

function closeModalWindow() {
  modalBody.innerHTML = "";
  modalWindow.classList.remove("modal_active");

  document.querySelector(".get-quote__form form").reset();
}

function showModalWindow(content) {
  modalBody.appendChild(content);
  modalWindow.classList.add("modal_active");
}

document.querySelector(".modal__footer .button_ok").addEventListener("click", closeModalWindow);

/* form */

function createParagraph(text) {
  let p = document.createElement("p");
  p.textContent = text;
  return p;
}

function processGetQuoteForm(event) {
  event.preventDefault();

  let content = document.createDocumentFragment();
  content.appendChild(createParagraph("Письмо отправлено"));

  let subject = event.currentTarget.parentElement.querySelector("input[name='subject']").value;
  if (subject === "") {
    subject = "Без темы";
  } else {
    subject = "Тема: " + subject;
  }
  content.appendChild(createParagraph(subject));

  let message = event.currentTarget.parentElement.querySelector("textarea[name='message']").value;
  if (message === "") {
    message = "Без описания";
  } else {
    message = "Описание: " + message;
  }
  content.appendChild(createParagraph(message));

  showModalWindow(content);
}

document.querySelector(".get-quote__form form").addEventListener("submit", processGetQuoteForm);
