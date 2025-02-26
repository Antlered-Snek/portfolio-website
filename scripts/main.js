



// HTML Elements
	// Header
let header_bg = document.getElementsByClassName("header_bg");
let hambar = document.getElementById("hambar");
let mobil_navbar = document.getElementById("mobil_navbar"); mobile_navbar.style.right = "-12em";

		// Dropdown Menu
let dropdown_triggers = document.getElementsByClassName("dropdown-trigger");
let dropdown_menus = document.getElementsByClassName("dropdown-menu");
dropdown_menus[0].style.height = "0px";
dropdown_menus[0].getElementsByClassName("header_bg")[0].style.height = "0px";

dropdown_menus[1].style.width = "0px";
dropdown_menus[1].getElementsByClassName("header_bg")[0].style.width = "0px";

let dropdown_stats = {
	current_length: 0,
	speed: 10,
	new_length: 0,
	bg_extra_length: 0,
	index: 0,
	isHeight: true,
	isDropdowning: false
};

	// About
let profile_pic = document.getElementById("profile-pic");
let profile_name = document.getElementById("name");
let profile_text1 = document.getElementById("first-text");
let profile_text2 = document.getElementById("second-text");

	// Education
let galleries = document.getElementsByClassName("gallery");

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
pearto.src.style.animationFillMode = "forwards";
pearto.src.style.right = "200px";









// Functions
function moveGalleries() {
	for (let i=0; i<galleries.length; i++) {
		let gallery = galleries[i];
		let len = 5;

		let img_length = window.innerWidth * ((window.innerWidth > 780) * 0.3 + (window.innerWidth <= 780) * 0.95);
		let scrollSpeed = ((window.innerWidth > 780) * 1) + ((window.innerWidth <= 780) * 0.5);

		// Scroll
		gallery.scrollLeft -= scrollSpeed;

			// Reorder
		if (gallery.scrollLeft <= 0) {
				// Add
			let newImg = document.createElement('img');
			newImg.src = gallery.getElementsByTagName('img')[len-1].src;
			gallery.insertBefore(newImg, gallery.getElementsByTagName('img')[0]);
			
				// Remove
			gallery.getElementsByTagName('img')[len].remove();
			gallery.scrollLeft += img_length;
		}
	}}

function dropdown() {
	let e = dropdown_stats;

	// Stop
	if (e.current_length == e.new_length) e.isDropdowning = false;
	
	// Calculate Length
	e.current_length += e.speed * (     1*(e.current_length < e.new_length)     +     -1*(e.current_length > e.new_length)     );

	// Output
	if (e.isHeight) {
		dropdown_menus[e.index].style.height = String(e.current_length) + "px";
		if (e.current_length>0) dropdown_menus[e.index].getElementsByClassName("header_bg")[0].style.height = String(e.current_length+e.bg_extra_length) + "px";
		else dropdown_menus[e.index].getElementsByClassName("header_bg")[0].style.height = "0px";
	}

	else {
		dropdown_menus[e.index].style.width  = String(e.current_length) + "px";
		if (e.current_length>0) dropdown_menus[e.index].getElementsByClassName("header_bg")[0].style.width = String(e.current_length+e.bg_extra_length) + "px";
		else dropdown_menus[e.index].getElementsByClassName("header_bg")[0].style.width = "0px";
	}}

function togglePear() {
	// Prevent Multi-Click
	if (pearto.src.style.animationName == "jump-in-out") return;

	pearto.isMoving = false;
	pearto.direction = 1;
	pearto.timer = 0;

	// General Animation
	resetPearAnimation();
	pearto.src.style.animationName = "jump-in-out";
	pearto.src.style.animationIterationCount = "1";

	// Summon Pear
	if (pearto.isActive) pearto.src.style.animationDirection = "reverse";

	// Kill Pear
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
	pearto.src.style.animationName = null;}





// Animation
function animate() {
	moveGalleries();
	if (dropdown_stats.isDropdowning) dropdown();
	if (pearto.isActive) pear();

	requestAnimationFrame(animate);}
requestAnimationFrame(animate);







// Event Listeners
	// Scroll Function
document.addEventListener('scroll', (e) => {
	let scrollStrength = ((window.innerWidth > 780) * 0.002) + ((window.innerWidth <= 780) * 0.0006);

	// Header
	for (let i=0; i<header_bg.length; i++) {
		header_bg[i].style.opacity = String( window.scrollY * scrollStrength * (1366/window.innerWidth) );
		if (Number(header_bg[i].style.opacity) > 1) header_bg[i].style.opacity = '1.0';
	}

	// Profile
	profile_pic.style.top = String(-window.scrollY * 2) +"px";
	profile_name.style.top = String(-window.scrollY * 0.6) +"px";
	profile_text2.style.top = String(-window.scrollY * 0.8) +"px";})

	// Hamburger Bar
hambar.addEventListener('click', (e) => {
	if (mobile_navbar.style.right == "-12em") mobile_navbar.style.right = "0px";
	else mobile_navbar.style.right = "-12em";})

	// Dropdown Menus
		// Desktop
dropdown_triggers[0].addEventListener('mouseover', (e) => {
	dropdown_stats.index = 0;
	dropdown_stats.current_length = Number(dropdown_menus[dropdown_stats.index].style.height.slice(0, dropdown_menus[dropdown_stats.index].style.height.length-2));
	dropdown_stats.new_length = 280;
	dropdown_stats.bg_extra_length = 10;
	dropdown_stats.isHeight = true;
	dropdown_stats.isDropdowning = true;})

dropdown_triggers[0].addEventListener('mouseout', (e) => {
	dropdown_stats.index = 0;
	dropdown_stats.current_length = Number(dropdown_menus[dropdown_stats.index].style.height.slice(0, dropdown_menus[dropdown_stats.index].style.height.length-2));
	dropdown_stats.new_length = 0;
	dropdown_stats.bg_extra_length = 10;
	dropdown_stats.isHeight = true;
	dropdown_stats.isDropdowning = true;})

		// Mobile
dropdown_triggers[1].addEventListener('touchstart', (e) => {
	dropdown_stats.index = 1;
	dropdown_stats.current_length = Number(dropdown_menus[dropdown_stats.index].style.height.slice(0, dropdown_menus[dropdown_stats.index].style.height.length-2));
	dropdown_stats.new_length = 170;
	dropdown_stats.bg_extra_length = 10;
	dropdown_stats.isHeight = false;
	dropdown_stats.isDropdowning = true;})

dropdown_triggers[1].addEventListener('touchcancel', (e) => {
	dropdown_stats.index = 1;
	dropdown_stats.current_length = Number(dropdown_menus[dropdown_stats.index].style.height.slice(0, dropdown_menus[dropdown_stats.index].style.height.length-2));
	dropdown_stats.new_length = 0;
	dropdown_stats.bg_extra_length = 10;
	dropdown_stats.isHeight = false;
	dropdown_stats.isDropdowning = true;})

	// Pear Animation End
pearto.src.addEventListener('animationend', (e) => {

	if (pearto.src.style.animationName == "jump-in-out") {					// Jump-In-Out
		if (pearto.isActive) {
			pearto.isActive = false;
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







