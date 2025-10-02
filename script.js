const menuButton = document.querySelector("#menuButton");
const closeButton = document.querySelector("#closeButton");
const mobileMenu = document.querySelector("#mobileMenu");
// Dados dos cursos EAD
const cursos = {
    // Cursos de Graduação EAD
    graduacao: [
        { 
            titulo: "Letras", 
            img: "src/cursos/letras.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=11",
        },
        { 
            titulo: "Pedagogia", 
            img: "src/cursos/pedagogia.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=3"
        },
        { 
            titulo: "Educação Especial", 
            img: "src/cursos/ed-especial.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=7"
        },
         { 
            titulo: "História", 
            img: "src/cursos/historia.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=1"
        },
         { 
            titulo: "Educação Física", 
            img: "src/cursos/ed-fisica.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=8"
        },
    ],
    // Cursos de Pós-Graduação EAD
    posGraduacao: [
        // { 
            // titulo: "Educação Especial e Inclusiva", 
            // img: "src/cursos/ed-inclusiva.jpg",
        // },
        // { 
            // titulo: "Psicopedagogia e Ludopedagogia", 
            // img: "",
        // },
        { 
            titulo: "Alfabetização e Letramento", 
            img: "",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=9"
        },
    ],
    // Cursos de Tecnólogo EAD
    tecnologo: [
        { 
            titulo: "Logística", 
            img: "src/cursos/logistica.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=2"
        },
        { 
            titulo: "Processos Gerenciais", 
            img: "src/cursos/p-gerais.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=4"
        },
        { 
            titulo: "Gestão Ambiental", 
            img: "src/cursos/g-ambiental.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=6"
        },
        { 
            titulo: "Gestão de Recursos Humanos", 
            img: "src/cursos/rh.jpg",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=5"
        },
        { 
            titulo: "Gestão Financeira", 
            img: "",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=10"
        },
    ]
};
function createCard(curso) {
    return `
        <div class="card">
            <div class="img-placeholder" ${curso.img ? `style="background: url('${curso.img}') center/cover;"` : ''}>
                ${curso.img ? '' : 'Espaço para imagem'}
            </div>
            <h2>${curso.titulo}</h2>
            <a href="${curso.url}" class="saiba-mais">
                 <button class="saiba-mais-btn">Saiba Mais</button>
            </a>
           
        </div>
    `;
}
// Função para carregar cards por categoria
function loadCategoryCards(category, containerId) {
    const container = document.getElementById(containerId);
    category.forEach(curso => {
        container.insertAdjacentHTML('beforeend', createCard(curso));
    });
}

// Configuração do Slideshow
const slides = [
    { img: 'src/slides/slide1.png', alt: 'Slide 1' },
    { img: 'src/slides/slide2.png', alt: 'Slide 2' },
    { img: 'src/slides/slide3.png', alt: 'Slide 3' }
];

let slideIndex = 1;
let slideInterval;

function initializeSlideshow() {
    const slideContainer = document.querySelector('.slide-container');
    const dotsContainer = document.querySelector('.dots');

    // Criar slides
    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide fade';
        slideDiv.innerHTML = `<img src="${slide.img}" alt="${slide.alt}">`;
        slideContainer.appendChild(slideDiv);

        // Criar dots
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => currentSlide(index + 1);
        dotsContainer.appendChild(dot);
    });

    // Adicionar eventos aos botões
    document.querySelector('.prev').onclick = () => changeSlide(-1);
    document.querySelector('.next').onclick = () => changeSlide(1);

    showSlides(slideIndex);
    startAutoSlide();
}

function changeSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex += n);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    startAutoSlide();
}

function showSlides(n) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    // Atualiza a posição do slide-container
    const slideContainer = document.querySelector('.slide-container');
    slideContainer.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
    
    // Atualiza os dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    dots[slideIndex-1].classList.add('active');
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000); // Muda slide a cada 7 segundos
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Adicione ao evento DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', () => {
    loadCategoryCards(cursos.graduacao, 'graduacao-list');
    loadCategoryCards(cursos.posGraduacao, 'pos-graduacao-list');
    loadCategoryCards(cursos.tecnologo, 'tecnologo-list');
    initializeSlideshow();
});

menuButton.addEventListener("click", function() {
    mobileMenu.classList.add("flex");
});

closeButton.addEventListener("click", function() {
    mobileMenu.classList.remove("flex");
});