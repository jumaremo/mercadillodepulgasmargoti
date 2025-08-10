// Datos de productos de ejemplo
const productosSegundaMano = [
    {
        id: 1,
        nombre: "Laptop Dell Inspiron",
        descripcion: "Laptop en excelente estado, ideal para trabajo y estudio.",
        precio: "$850.000",
        categoria: "electronica",
        imagen: "fas fa-laptop"
    },
    {
        id: 2,
        nombre: "Mesa de Comedor",
        descripcion: "Mesa de madera sólida para 6 personas, muy bien conservada.",
        precio: "$320.000",
        categoria: "hogar",
        imagen: "fas fa-table"
    },
    {
        id: 3,
        nombre: "Chaqueta de Cuero",
        descripcion: "Chaqueta de cuero genuino, talla M, como nueva.",
        precio: "$180.000",
        categoria: "ropa",
        imagen: "fas fa-user-tie"
    },
    {
        id: 4,
        nombre: "Colección de Libros",
        descripcion: "Set de 20 libros clásicos de literatura universal.",
        precio: "$150.000",
        categoria: "libros",
        imagen: "fas fa-books"
    },
    {
        id: 5,
        nombre: "iPhone 12",
        descripcion: "iPhone 12 de 128GB, desbloqueado, sin rayones.",
        precio: "$1.200.000",
        categoria: "electronica",
        imagen: "fas fa-mobile-alt"
    },
    {
        id: 6,
        nombre: "Sofá 3 Puestos",
        descripcion: "Sofá cómodo en excelente estado, color beige.",
        precio: "$450.000",
        categoria: "hogar",
        imagen: "fas fa-couch"
    },
    {
        id: 7,
        nombre: "Zapatos Nike",
        descripcion: "Zapatos deportivos Nike Air Max, talla 42, poco uso.",
        precio: "$120.000",
        categoria: "ropa",
        imagen: "fas fa-running"
    },
    {
        id: 8,
        nombre: "Enciclopedia Médica",
        descripcion: "Enciclopedia médica completa, 15 tomos, edición 2020.",
        precio: "$280.000",
        categoria: "libros",
        imagen: "fas fa-book-medical"
    },
    {
        id: 9,
        nombre: "Smart TV 55\"",
        descripcion: "Televisor Samsung 55 pulgadas, Smart TV, 4K.",
        precio: "$980.000",
        categoria: "electronica",
        imagen: "fas fa-tv"
    },
    {
        id: 10,
        nombre: "Juego de Ollas",
        descripcion: "Set completo de ollas acero inoxidable, 8 piezas.",
        precio: "$95.000",
        categoria: "hogar",
        imagen: "fas fa-utensils"
    },
    {
        id: 11,
        nombre: "Vestido Elegante",
        descripcion: "Vestido de fiesta talla S, usado una vez, color azul.",
        precio: "$85.000",
        categoria: "ropa",
        imagen: "fas fa-female"
    },
    {
        id: 12,
        nombre: "Libros de Cocina",
        descripcion: "Colección de 10 libros de recetas internacionales.",
        precio: "$75.000",
        categoria: "libros",
        imagen: "fas fa-utensil-spoon"
    }
];

// Variables globales
let productosVisibles = 8;
let filtroActual = 'all';
let productosFiltrados = [...productosSegundaMano];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const productosGrid = document.getElementById('productos-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const contactForm = document.getElementById('contact-form');
const tipicoBtns = document.querySelectorAll('.tipico-btn');

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función principal de inicialización
function initializeApp() {
    setupNavigation();
    setupProductFilters();
    renderProducts();
    setupContactForm();
    setupWhatsAppButtons();
    setupSmoothScroll();
    setupScrollAnimations();
    setupCategoryCards();
}

// Configuración de navegación móvil
function setupNavigation() {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Configuración de filtros de productos
function setupProductFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener categoría del filtro
            filtroActual = this.getAttribute('data-filter');
            
            // Filtrar productos
            filtrarProductos();
            
            // Resetear productos visibles
            productosVisibles = 8;
            
            // Renderizar productos
            renderProducts();
        });
    });

    // Configurar botón "Cargar más"
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            productosVisibles += 4;
            renderProducts();
        });
    }
}

// Filtrar productos por categoría
function filtrarProductos() {
    if (filtroActual === 'all') {
        productosFiltrados = [...productosSegundaMano];
    } else {
        productosFiltrados = productosSegundaMano.filter(producto => 
            producto.categoria === filtroActual
        );
    }
}

// Renderizar productos en la grid
function renderProducts() {
    if (!productosGrid) return;

    const productosAMostrar = productosFiltrados.slice(0, productosVisibles);
    
    productosGrid.innerHTML = '';
    
    productosAMostrar.forEach(producto => {
        const productoCard = createProductCard(producto);
        productosGrid.appendChild(productoCard);
    });

    // Mostrar/ocultar botón "Cargar más"
    if (loadMoreBtn) {
        if (productosVisibles >= productosFiltrados.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Animar cards al aparecer
    animateProductCards();
}

// Crear card de producto
function createProductCard(producto) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
        <div class="producto-image">
            <i class="${producto.imagen}"></i>
        </div>
        <div class="producto-content">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="price">${producto.precio}</div>
            <button class="btn btn-primary" onclick="contactarVendedor('${producto.nombre}')">
                <i class="fab fa-whatsapp"></i> Contactar
            </button>
        </div>
    `;
    return card;
}

// Animar cards de productos
function animateProductCards() {
    const cards = document.querySelectorAll('.producto-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Función para contactar vendedor
function contactarVendedor(nombreProducto) {
    const mensaje = `Hola! Me interesa el producto: ${nombreProducto}. ¿Podrías darme más información?`;
    const numeroWhatsApp = '573001234567'; // Cambiar por el número real
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Configuración de formulario de contacto
function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const nombre = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const mensaje = this.querySelector('textarea').value;
        
        // Validar campos
        if (!nombre || !email || !mensaje) {
            mostrarNotificacion('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Simular envío de formulario
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            mostrarNotificacion('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Configuración de botones WhatsApp para productos típicos
function setupWhatsAppButtons() {
    tipicoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const producto = this.getAttribute('data-producto');
            let mensaje = '';
            
            switch(producto) {
                case 'achiras':
                    mensaje = 'Hola! Me interesan las achiras. ¿Qué variedades tienen disponibles y cuáles son los precios?';
                    break;
                case 'corcho':
                    mensaje = 'Hola! Quisiera pedir corcho paisa. ¿Cuánto cuesta y cómo puedo hacer el pedido?';
                    break;
                case 'bizcochos':
                    mensaje = 'Hola! Me gustaría ordenar bizcochos. ¿Qué cantidad mínima manejan y cuál es el precio?';
                    break;
                case 'pan-arroz':
                    mensaje = 'Hola! Me interesa el pan de arroz. ¿Está fresco y cuáles son los precios?';
                    break;
                default:
                    mensaje = 'Hola! Me interesan sus productos típicos. ¿Podrían darme más información?';
            }
            
            const numeroWhatsApp = '573001234567'; // Cambiar por el número real
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        });
    });
}

// Configuración de scroll suave
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configuración de animaciones en scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos que queremos animar
    const animateElements = document.querySelectorAll(
        '.category-card, .tipico-card, .testimonio-card, .contacto-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Configuración de cards de categorías
function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoria = this.getAttribute('data-category');
            
            // Scroll a la sección de productos
            const productosSection = document.getElementById('segunda-mano');
            if (productosSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = productosSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Activar filtro correspondiente
                setTimeout(() => {
                    const filterBtn = document.querySelector(`[data-filter="${categoria}"]`);
                    if (filterBtn) {
                        filterBtn.click();
                    }
                }, 500);
            }
        });
    });
}

// Mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = `
        <div class="notificacion-content">
            <i class="fas ${tipo === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${mensaje}</span>
        </div>
        <button class="notificacion-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notificacion {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                animation: slideInRight 0.3s ease;
            }
            
            .notificacion-success {
                border-left: 4px solid #00b894;
            }
            
            .notificacion-error {
                border-left: 4px solid #d63031;
            }
            
            .notificacion-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notificacion-success i {
                color: #00b894;
            }
            
            .notificacion-error i {
                color: #d63031;
            }
            
            .notificacion-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #666;
                margin-left: 15px;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Configurar botón de cerrar
    const closeBtn = notificacion.querySelector('.notificacion-close');
    closeBtn.addEventListener('click', () => {
        cerrarNotificacion(notificacion);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notificacion)) {
            cerrarNotificacion(notificacion);
        }
    }, 5000);
}

// Cerrar notificación
function cerrarNotificacion(notificacion) {
    notificacion.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (document.body.contains(notificacion)) {
            document.body.removeChild(notificacion);
        }
    }, 300);
}

// Efecto de scroll en header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Preloader simple
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});

// Funciones de utilidad
const utils = {
    // Formatear precio
    formatPrice: (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    },
    
    // Debounce para optimizar eventos
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Validar email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};