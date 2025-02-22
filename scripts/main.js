



// HTML Elements
	// Header
let header_bg = document.getElementById("header_bg");

	// About
let profile_pic = document.getElementById("profile-pic");
let profile_name = document.getElementById("name");
let profile_text1 = document.getElementById("first-text");
let profile_text2 = document.getElementById("second-text");

	// Education
let galleries = document.getElementsByClassName("gallery");



// Animation
setInterval( () => {
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
	}
}, 10)

// Event Listeners
document.addEventListener('scroll', (e) => {
	let scrollStrength = ((window.innerWidth > 780) * 0.002) + ((window.innerWidth <= 780) * 0.0006);

	// Header
	header_bg.style.opacity = String( window.scrollY * scrollStrength * (1366/window.innerWidth) );
	if (Number(header_bg.style.opacity) > 1) header.style.opacity = '1.0';

	// Profile
	profile_pic.style.marginTop = String(-window.scrollY * 2) +"px";
	profile_name.style.marginTop = String(-window.scrollY * 0.6) +"px";
	profile_text2.style.marginTop = String(-window.scrollY * 0.8) +"px";
})