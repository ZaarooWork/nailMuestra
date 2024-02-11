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
    var images = document.querySelectorAll(".book1 img");
    var prevButton = document.getElementById("prevButton");
    var nextButton = document.getElementById("nextButton");

    var currentImageIndex = 0;
    var touchStartX = 0;
    var touchEndX = 0;

    function showCurrentImage() {
        images.forEach(function (image) {
            image.style.display = "none";
        });

        images[currentImageIndex].style.display = "block";
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showCurrentImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showCurrentImage();
    }

    prevButton.addEventListener("click", showPrevImage);
    nextButton.addEventListener("click", showNextImage);

    // Event listeners para eventos táctiles
    document.addEventListener("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
    });

    document.addEventListener("touchmove", function (event) {
        // Obtén la posición de X al mover
        var touchMoveX = event.touches[0].clientX;

        // Calcula la distancia entre touchStartX y touchMoveX
        var swipeDistance = touchMoveX - touchStartX;

        // Ajusta este umbral según tus necesidades
        var zoomThreshold = 10;

        // Si la distancia es mayor al umbral, considera que es un zoom
        if (Math.abs(swipeDistance) > zoomThreshold) {
            // No hagas nada si es un gesto de zoom
            return;
        }

        // Evita el comportamiento predeterminado del gesto de cambio de imagen
        event.preventDefault();
    });

    document.addEventListener("touchend", function (event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        var swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > 50) {
            // Deslizar hacia la derecha
            showPrevImage();
        } else if (swipeDistance < -50) {
            // Deslizar hacia la izquierda
            showNextImage();
        }
    }

    showCurrentImage();
});


/* document.addEventListener("DOMContentLoaded", function () {
    // Obtén las imágenes y los botones
    let images = document.querySelectorAll(".book1 img");
    let prevButton = document.getElementById("prevButton");
    let nextButton = document.getElementById("nextButton");

    // Inicializa el índice de la imagen actual
    let currentImageIndex = 0;
	let touchStartX = 0;
    let touchEndX = 0;

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
    });

    document.addEventListener("touchend", function (event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        let swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > 50) {
            // Deslizar hacia la derecha
            showPrevImage();
        } else if (swipeDistance < -50) {
            // Deslizar hacia la izquierda
            showNextImage();
        }
    }

    // Muestra la primera imagen al cargar la página
    showCurrentImage();
}); */
