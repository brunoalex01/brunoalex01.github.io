// Dados dos cursos EAD
const cursos = {
    // Cursos de Graduação EAD
    graduacao: [
        { 
            titulo: "Letras - Licenciatura", 
            desc: "Curso de Letras com foco em metodologias ativas.", 
            img: "src/cursos/letras.png",
        },
        { 
            titulo: "Pedagogia - Licenciatura", 
            desc: "Formação completa em Pedagogia, com professores renomados.", 
            img: "src/cursos/pedagogia.png",
        },
        { 
            titulo: "Educação Especial - Licenciatura", 
            desc: "Educação Especial com ênfase em inclusão social.", 
            img: "src/cursos/educacaoespecial1.png",
        },
    ],
    // Cursos de Pós-Graduação EAD
    posGraduacao: [
        { 
            titulo: "Educação Especial e Inclusiva", 
            desc: "Especialização completa em Educação Especial e Inclusiva.", 
            img: "",
        },
        { 
            titulo: "Psicopedagogia e Ludopedagogia", 
            desc: "Especialização completa em Psicopedagogia e Ludopedagogia.", 
            img: "",
        },
        { 
            titulo: "Educação Física Escolar e Interdisciplinaridade", 
            desc: "Especialização completa em Educação Física Escolar e Interdisciplinaridade.", 
            img: "",
        },
    ],
    // Cursos de Tecnólogo EAD
    tecnologo: [
        { 
            titulo: "Logística", 
            desc: "Tecnologia e inovação em logística.", 
            img: "src/cursos/logistica.png",
        },
        { 
            titulo: "Processos Gerenciais", 
            desc: "Gestão de pessoas e empresas para o futuro.", 
            img: "src/cursos/processosgerenciais.png",
        },
        { 
            titulo: "Gestão Ambiental", 
            desc: "Gestão de recursos naturais e sustentabilidade.", 
            img: "src/cursos/gestaoamb.png",
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
            <p>${curso.desc}</p>
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

let slideIndex = 1.5;
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
    }, 7000); // Muda slide a cada 7 segundos
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