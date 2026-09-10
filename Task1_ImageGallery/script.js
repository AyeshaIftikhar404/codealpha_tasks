const images = document.querySelectorAll(".gallery-item img");

let currentImage = 0;

// Create lightbox
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");

lightbox.innerHTML = `
    <button class="close">&times;</button>
    <button class="prev">&#10094;</button>
    <img src="" alt="Large Image">
    <button class="next">&#10095;</button>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".close");
const prevButton = lightbox.querySelector(".prev");
const nextButton = lightbox.querySelector(".next");

// Open image
function openImage(index) {
    currentImage = index;
    lightboxImage.src = images[currentImage].src;
    lightboxImage.alt = images[currentImage].alt;
    lightbox.classList.add("active");
}

// Open lightbox when image is clicked
images.forEach((image, index) => {
    image.addEventListener("click", () => {
        openImage(index);
    });
});

// Next image
nextButton.addEventListener("click", () => {
    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    openImage(currentImage);
});

// Previous image
prevButton.addEventListener("click", () => {
    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    openImage(currentImage);
});

// Close lightbox
closeButton.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

// Close when clicking outside image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

// Keyboard controls
document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextButton.click();
    }

    if (event.key === "ArrowLeft") {
        prevButton.click();
    }

    if (event.key === "Escape") {
        closeButton.click();
    }
});
// Image Filter

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        galleryItems.forEach(item => {

            const category = item.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});