



// HTML Elements
		// Header
let header_bg = document.getElementsByClassName("header_bg");
let hambar = document.getElementById("hambar");
let mobile_navbar = document.getElementById("mobile_navbar"); mobile_navbar.style.right = "-12em";

	// Pear
let pearto = {
		// General
	src: document.getElementById("pearto"),
	speed: 1, 
	direction: 1,
	timer: 0,
	timerCD: 10000,

		// States
	isMoving: false,
	isSpinning: false,
	isActive: false
}
pearto.src.style.animationName = "idle-bottom";
pearto.src.style.animationIterationCount = "infinite";
pearto.src.style.animationFillMode = "both";
pearto.src.style.right = "200px";

	// Galleries
let galleries = document.getElementsByClassName("gallery");
let gallery_inputs = document.getElementsByClassName("gallery-input");
let gallery_index = null;
let forced_scrollSpeed = 15;

for (let i=0; i<galleries.length; i++) {
	galleries[i].scrollLeft += 20;
}

	// Scroll Function
let scrollY_old = window.scrollY;








// Functions
function moveGalleries_linked() {
	for (let i=0; i<galleries.length; i++) {
		let gallery = galleries[i];
		let len = gallery.getElementsByTagName('a').length;

		let scrollLeft_old = gallery.scrollLeft;
		let img_length = 400;
		let scrollSpeed = 1;

		// Scroll
		if (gallery_index == i) scrollSpeed = forced_scrollSpeed;
		gallery.scrollLeft += scrollSpeed;
			
			// Reorder
		if (gallery.scrollLeft != scrollLeft_old + scrollSpeed) {
			if	(scrollSpeed >= 1) {			// Left to Right
					// Add Link
				let newLink = document.createElement('a');
				newLink.href = gallery.getElementsByTagName('a')[0].href;
				newLink.target = "_blank";

					// Add Image
				let newImg = document.createElement('img');
				newImg.src = gallery.getElementsByTagName('a')[0].children[0].src;

					// Insert Both
				newLink.appendChild(newImg);
				gallery.appendChild(newLink);
				
					// Remove
				gallery.getElementsByTagName('a')[0].remove();
				gallery.scrollLeft -= img_length + 10;
			}
			else if (scrollSpeed <= 1) {		// Right to Left
					// Add Link
				let newLink = document.createElement('a');
				newLink.href = gallery.getElementsByTagName('a')[len-1].href;
				newLink.target = "_blank";

					// Add Image
				let newImg = document.createElement('img');
				newImg.src = gallery.getElementsByTagName('a')[len-1].children[0].src;

					// Insert Both
				newLink.appendChild(newImg);
				gallery.insertBefore(newLink, gallery.getElementsByTagName('a')[0]);
				
					// Remove
				gallery.getElementsByTagName('a')[len].remove();
				gallery.scrollLeft += img_length + 10;
			}
		}
	}}

function togglePear() {
	// Prevent Multi-Click
	if (pearto.src.style.animationName == "jump-in-out") return;

	resetPearAnimation();
	pearto.isMoving = false;
	pearto.isSpinning = false;
	pearto.direction = 1;
	pearto.timer = 0;

	// General Animation
	pearto.src.style.animationName = "jump-in-out";
	pearto.src.style.animationIterationCount = "1";

	// Kill Pear
	if (pearto.isActive) {pearto.src.style.animationDirection = "reverse"; pearto.isActive = false;}

	// Summon Pear
	else pearto.src.style.animationDirection = "normal";}

function pear() {
	if (pearto.timer > 0) {			// If timer is going
		// Move
		if (pearto.isMoving && !pearto.isSpinning) {
			// Variables
			let len = pearto.src.style.right.length;
			let position = Number(pearto.src.style.right.slice(0, len-2));
			let distance = position + pearto.speed*pearto.direction;
			
			// Out of Bounds
			if (distance < 0 || distance > window.innerWidth-173) {
				// Spin
				pearto.isSpinning = true;
				resetPearAnimation();
				if 		(pearto.direction==1) pearto.src.style.animationName = "spin-left-to-right";
				else if (pearto.direction==-1) pearto.src.style.animationName = "spin-right-to-left";
					
				// Change Direction
				pearto.direction *= -1;
				pearto.src.style.animationIterationCount = "1";
				pearto.src.style.animationDuration = "0.2s";
			}
			else {
				if 		(pearto.direction ==  1) pearto.src.style.animationName = "jump-left";
				else if (pearto.direction == -1) pearto.src.style.animationName = "jump-right";
			}

			// Output
			pearto.src.style.right = String(distance) + "px";
		}

		// Reduce timer
		pearto.timer -= 1;
	}


	else {							// If timer is out
		// Reset timer
		pearto.timer = Math.floor(Math.random() * pearto.timerCD * (60/1000)) // in miliseconds;
		

		// Left or Right
		if (Math.floor(Math.random() * 2)) {						// Left
			// Spin
			if (pearto.direction==-1) {
				pearto.isSpinning = true;
				resetPearAnimation();
				pearto.src.style.animationName = "spin-right-to-left";
				pearto.src.style.animationIterationCount = "1";
				pearto.src.style.animationDuration = "0.2s";
			}
			// Change Direction
			pearto.direction = 1;
		}	
		else {														// Right
			// Spin
			if (pearto.direction==1) {
				pearto.isSpinning = true;
				resetPearAnimation();
				pearto.src.style.animationName = "spin-left-to-right";
				pearto.src.style.animationIterationCount = "1";
				pearto.src.style.animationDuration = "0.2s";
			}
			// Change Direction
			pearto.direction = -1;
		}


		// Moving or Not + Animation Names
		if (Math.floor(Math.random() * 2)) {
			pearto.isMoving = true;
			if (!pearto.isSpinning) {
				if 		(pearto.direction ==  1) pearto.src.style.animationName = "jump-left";
				else if (pearto.direction == -1) pearto.src.style.animationName = "jump-right";
			}
			
		}
		else {
			pearto.isMoving = false;
			if (!pearto.isSpinning) {
				if 		(pearto.direction ==  1) pearto.src.style.animationName = "idle-left";
				else if (pearto.direction == -1) pearto.src.style.animationName = "idle-right";
			}
		}
	}}

function resetPearAnimation() {
	//  Reset Animation
	pearto.src.style.animationName = 'none';
	pearto.src.offsetHeight;
	pearto.src.style.animation = null;
	pearto.src.style.animationIterationCount = "infinite";
	pearto.src.style.animationFillMode = "both";}

function scrollFunc() {
	let scrollStrength = ((window.innerWidth > 780) * 0.002) + ((window.innerWidth <= 780) * 0.0006);

	// Header
	for (let i=0; i<header_bg.length; i++) {
		header_bg[i].style.opacity = String( window.scrollY * scrollStrength * (1366/window.innerWidth) );
		if (Number(header_bg[i].style.opacity) > 1) header_bg[i].style.opacity = '1.0';
	}

	// Stop
	scrollY_old = window.scrollY;
}









// Animation
function animate() {
	moveGalleries_linked();
	if (pearto.isActive) pear();
	if (scrollY_old != window.scrollY) scrollFunc();

	requestAnimationFrame(animate);
}
scrollFunc();
requestAnimationFrame(animate);







// Event Listeners
	// Hamburger Bar
hambar.addEventListener('click', (e) => {
	if (mobile_navbar.style.right == "-12em") mobile_navbar.style.right = "0px";
	else mobile_navbar.style.right = "-12em";
})

	// Gallery Inputs
for (let i=0; i<gallery_inputs.length; i++) {
		// Desktop
	gallery_inputs[i].children[0].addEventListener('mousedown', (e) => {	// Left Button
		gallery_index = i;
		forced_scrollSpeed = -15;
	})
	gallery_inputs[i].children[1].addEventListener('mousedown', (e) => {	// Right Button
		gallery_index = i;
		forced_scrollSpeed = 15;
	})

	gallery_inputs[i].addEventListener('mouseup', (e) => {					// Off
		gallery_index = null;
	})

		// Mobile
	gallery_inputs[i].children[0].addEventListener('touchstart', (e) => {	// Left Button
		gallery_index = i;
		forced_scrollSpeed = -5;
	})
	gallery_inputs[i].children[1].addEventListener('touchstart', (e) => {	// Right Button
		gallery_index = i;
		forced_scrollSpeed = 5;
	})

	gallery_inputs[i].addEventListener('touchend', (e) => {					// Off
		gallery_index = null;
	})
}

	// Pear Animation End
pearto.src.addEventListener('animationend', (e) => {
	if (pearto.src.style.animationName == "jump-in-out") {					// Jump-In-Out
		if (pearto.src.style.animationDirection == "reverse") {
			resetPearAnimation();
			pearto.src.style.animationName = "idle-bottom";
		}
		else pearto.isActive = true;
	}

	else if (pearto.src.style.animationName == "spin-left-to-right") {		// Spin-Left-To-Right
		if (pearto.isMoving) pearto.src.style.animationName = "jump-right";
		else pearto.src.style.animationName = "idle-right";
		pearto.src.style.animationDuration = "1s";
	}

	else if (pearto.src.style.animationName == "spin-right-to-left") {		// Spin-Right-To-Left
		if (pearto.isMoving) pearto.src.style.animationName = "jump-left";
		else pearto.src.style.animationName = "idle-left";
		pearto.src.style.animationDuration = "1s";
	}

	pearto.src.style.animationIterationCount = "infinite";
	pearto.isSpinning = false;})







