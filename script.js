const menuButton = document.querySelector("#menuButton");
const closeButton = document.querySelector("#closeButton");
const mobileMenu = document.querySelector("#mobileMenu");
// Dados dos cursos EAD
const cursos = {
    // Cursos de Graduação EAD
    graduacao: [
        { 
            titulo: "Letras", 
            img: "src/cursos/letras.jpg", alt: "Curso de Letras",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=11",
        },
        { 
            titulo: "Pedagogia", 
            img: "src/cursos/pedagogia.jpg", alt: "Curso de Pedagogia",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=3"
        },
        { 
            titulo: "Educação Especial", 
            img: "src/cursos/ed-especial.jpg", alt:"Curso de Educação Especial",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=7"
        },
         { 
            titulo: "História", 
            img: "src/cursos/historia.jpg", alt:"Curso de História",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=1"
        },
         { 
            titulo: "Educação Física", 
            img: "src/cursos/ed-fisica.jpg", alt:"Curso de Educação Física",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=8"
        },
    ],
    // Cursos de Pós-Graduação EAD
    posGraduacao: [
        { 
            titulo: "Alfabetização e Letramento", 
            img: "src/cursos/alfabetizacao.jpg", alt:"Pós-Graduação em Alfabetização e Letramento",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=9"
        },
    ],   
    // Cursos de Tecnólogo EAD
    tecnologo: [
        { 
            titulo: "Logística", 
            img: "src/cursos/logistica.jpg", alt:"Curso de Logística",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=2"
        },
        { 
            titulo: "Processos Gerenciais", 
            img: "src/cursos/p-gerais.jpg", alt:"Curso de Processos Gerenciais",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=4"
        },
        { 
            titulo: "Gestão Ambiental", 
            img: "src/cursos/g-ambiental.jpg", alt:"Curso de Gestão Ambiental",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=6"
        },
        { 
            titulo: "Gestão de Recursos Humanos", 
            img: "src/cursos/rh.jpg", alt: "Curso de Gestão em Recursos Humanos",
            url: "https://app.faesma.com.br/captacao/public/v2/pre-cadastro?cd_oferta=5"
        },
        { 
            titulo: "Gestão Financeira", 
            img: "src/cursos/financeira.jpg", alt:"Curso de Gestão Financeira",
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
    { img: 'src/slides/1.jpg', alt: 'Faesma matricule-se já', loading: 'lazy' },
    { img: 'src/slides/2.jpg', alt: 'Faculdade Faesma com número de contato', loading: 'lazy' },
    { img: 'src/slides/3.jpg', alt: 'Faesma chamada para curso Pedagogia', loading: 'lazy' },
    { img: 'src/slides/4.jpg', alt: 'Quem Somos, por FAESMA', loading: 'lazy' }
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
    }, 5000); // Muda slide a cada 5 segundos
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

//Clique dos botões menu mobile
menuButton.addEventListener("click", function() {
    mobileMenu.classList.add("flex");
});

closeButton.addEventListener("click", function() {
    mobileMenu.classList.remove("flex");
});

//Botão Acessibilidade
//const toggleContrastButton = document.getElementById('toggleContrast');
//const body = document.body;

//toggleContrastButton.addEventListener('click', () => {
    //body.classList.toggle('high-contrast');
//});
