let front = document.querySelector('.face-front');
let back = document.querySelector('.face-back');
let flip = document.querySelector('.book-content');
let uno = document.querySelectorAll('.book');
let portada = document.querySelectorAll('#portada');

let contZindex = 2;
let customZindex = 1;

for (var i = 0; i < uno.length; i++) {
	uno[i].style.zIndex = customZindex;
	customZindex--;

	uno[i].addEventListener('click', function(e){

		let tgt = e.target;
		let unoThis = this;

		unoThis.style.zIndex = contZindex;
		contZindex++;

		if (tgt.getAttribute('class') == 'face-front') {
			unoThis.style.zIndex = contZindex;
			contZindex +=20;
			setTimeout(function(){
				unoThis.style.transform = 'rotateY(-180deg)';
			}, 500);
		}
		if (tgt.getAttribute("class") == 'face-back') {
			unoThis.style.zIndex = contZindex; 
			contZindex +=20;

			setTimeout(function(){
				unoThis.style.transform = 'rotateY(0deg)';
			}, 500);
		}

		if (tgt.getAttribute('id') == 'portada') {
			flip.classList.remove("trnsf-reset");
			flip.classList.add("trnsf");
		}
		if (tgt.getAttribute('id') == 'trsf') {
			flip.classList.remove("trnsf");
			flip.classList.add("trnsf-reset");
		}

	});
}

document.addEventListener("DOMContentLoaded", function () {
    // Obtén las imágenes y los botones
    let images = document.querySelectorAll(".book1 img");
    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    // Inicializa el índice de la imagen actual
    let currentImageIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let swipeThreshold = 30; // Ajusta según sea necesario

    // Función para mostrar la imagen actual
    function showCurrentImage() {
        // Oculta todas las imágenes
        images.forEach(function (image) {
            image.style.display = "none";
        });

        // Muestra la imagen actual
        images[currentImageIndex].style.display = "block";
    }

    // Función para mostrar la siguiente imagen
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showCurrentImage();
    }

    // Función para mostrar la imagen anterior
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showCurrentImage();
    }

    // Agrega event listeners a los botones
    prevButton.addEventListener("click", showPrevImage);
    nextButton.addEventListener("click", showNextImage);

    // Event listeners para eventos táctiles
    document.addEventListener("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    document.addEventListener("touchend", function (event) {
        touchEndX = event.changedTouches[0].clientX;
        touchEndY = event.changedTouches[0].clientY;
        handleSwipe();
    });

    function handleSwipe() {
        let swipeDistanceX = touchEndX - touchStartX;
        let swipeDistanceY = touchEndY - touchStartY;
        let verticalSwipeThreshold = 30; // Ajusta según sea necesario

        // Verifica si el movimiento es principalmente horizontal y el movimiento vertical es insignificante
        if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) &&
            Math.abs(swipeDistanceY) < verticalSwipeThreshold) {
            if (swipeDistanceX > swipeThreshold) {
                // Deslizar hacia la derecha
                showPrevImage();
            } else if (swipeDistanceX < -swipeThreshold) {
                // Deslizar hacia la izquierda
                showNextImage();
            }
        }
    }

    // Muestra la primera imagen al cargar la página
    showCurrentImage();
});


