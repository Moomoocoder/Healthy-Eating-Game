function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
}

function acceptTerms() {
for (var i = 5; i > 3; i = i + 1)
  { console.log(i); }
};

function declineTerms() {
    console.log("Declined terms!");
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        document.getElementById("popup-1").classList.toggle("active");
    }
});
