// Detección de capacidades del dispositivo
// Función original restaurada + optimizaciones
const isLowEndDevice = () => {
  return navigator.hardwareConcurrency <= 2 || 
         navigator.deviceMemory <= 2 ||
         /Android.*Chrome\/[.0-9]*/.test(navigator.userAgent);
};

// Configuración adaptativa de animaciones
const configureAnimations = () => {
  const root = document.documentElement;
  
  if (isLowEndDevice()) {
    // Reducir animaciones en dispositivos débiles
    root.style.setProperty('--fl-speed', '1.2s');
    
    // Reducir algunas flores en dispositivos muy débiles
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach((flower, index) => {
      if (index > 3) flower.style.display = 'none';
    });
  }
};

// API de visibilidad para pausar animaciones
const handleVisibilityChange = () => {
  const flowers = document.querySelector('.flowers');
  
  if (document.hidden) {
    // Pausar animaciones cuando no está visible
    if (flowers) {
      flowers.style.animationPlayState = 'paused';
      document.querySelectorAll('.flower, .flower__light, .flower__leaf').forEach(el => {
        el.style.animationPlayState = 'paused';
      });
    }
  } else {
    // Reanudar animaciones
    if (flowers) {
      flowers.style.animationPlayState = 'running';
      document.querySelectorAll('.flower, .flower__light, .flower__leaf').forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }
  }
};

// ¡FUNCIÓN CRÍTICA RESTAURADA!
onload = () => {
    // Esta línea es ESENCIAL para que aparezcan las flores
    document.body.classList.remove("container");
    
    // Añadir optimizaciones sin romper la funcionalidad original
    configureAnimations();
    
    // Event listeners para optimización
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Optimización para touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
};

// Cleanup en unload
window.addEventListener('beforeunload', () => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});