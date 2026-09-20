// Animación fluida y constante de letras en ola
class LetterAnimation {
    constructor() {
        this.letters = document.querySelectorAll('.letter');
        this.init();
    }

    init() {
        // Asignar el índice CSS --i a cada letra para garantizar la sincronización perfecta
        this.letters.forEach((letter, index) => {
            letter.style.setProperty('--i', index);

            // Efecto interactivo al hacer clic o tocar una letra
            letter.addEventListener('click', (e) => {
                this.createSparkleBurst(e.clientX, e.clientY);
            });
        });
    }

    createSparkleBurst(x, y) {
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('span');
            sparkle.textContent = ['✨', '🌸', '💛', '⭐'][Math.floor(Math.random() * 4)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${x || window.innerWidth / 2}px`;
            sparkle.style.top = `${y || window.innerHeight / 2}px`;
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.fontSize = `${Math.random() * 12 + 16}px`;
            sparkle.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            sparkle.style.transform = 'translate(-50%, -50%) scale(1)';
            sparkle.style.opacity = '1';

            document.body.appendChild(sparkle);

            const destX = (Math.random() - 0.5) * 120;
            const destY = (Math.random() - 0.5) * 120 - 30;

            requestAnimationFrame(() => {
                sparkle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0.3)`;
                sparkle.style.opacity = '0';
            });

            setTimeout(() => {
                sparkle.remove();
            }, 850);
        }
    }
}

// Crear corazones flotantes
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 5) + 's';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }, 4000);
}

// Crear estrellas parpadeantes
function createTwinklingStars() {
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        document.body.appendChild(star);
    }
}

// Inicializar cuando se carga la página
onload = () =>{ 
    document.body.classList.remove("container"); 
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada, iniciando animaciones...');
    new LetterAnimation();
    createFloatingHearts();
    createTwinklingStars();
    
    // Funcionalidad del modal
    const signature = document.getElementById('signature');
    const modal = document.getElementById('messageModal');
    const closeModal = document.getElementById('closeModal');
    
    // Abrir modal al hacer clic en la firma
    signature.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });
    signature.addEventListener('touchend', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal al hacer clic en la X
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});