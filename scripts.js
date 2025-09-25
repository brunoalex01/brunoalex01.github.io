// Dados dos cursos EAD
const cursos = {
    // Cursos de Graduação EAD
    graduacao: [
        { 
            titulo: "História - Licenciatura", 
            desc: "Curso de História com foco em metodologias ativas.", 
            img: "img/cursos/historia.png",
        },
        { 
            titulo: "Pedagogia - Licenciatura", 
            desc: "Formação completa em Pedagogia, com professores renomados.", 
            img: "img/cursos/pedagogia.png",
        },
        { 
            titulo: "Educação Especial - Licenciatura", 
            desc: "Educação Especial com ênfase em inclusão social.", 
            img: "img/cursos/educacaoespecial2.png",
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
            img: "img/cursos/logistica.png",
        },
        { 
            titulo: "Processos Gerenciais", 
            desc: "Gestão de pessoas e empresas para o futuro.", 
            img: "img/cursos/processosgerenciais.png",
        },
        { 
            titulo: "Gestão de Recursos Humanos", 
            desc: "Gestão de pessoas para empresas de todos os tamanhos.", 
            img: "img/cursos/rh.png",
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

// Função de inicialização atualizada
document.addEventListener('DOMContentLoaded', () => {
    // Carrega cards para cada categoria
    loadCategoryCards(cursos.graduacao, 'graduacao-list');
    loadCategoryCards(cursos.posGraduacao, 'pos-graduacao-list');
    loadCategoryCards(cursos.tecnologo, 'tecnologo-list');
});

// Configuração do Slideshow
const slides = [
    { img: '', alt: 'Slide 1' },
    { img: '', alt: 'Slide 2' },
    { img: '', alt: 'Slide 3' }
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
    }, 5000); // Muda slide a cada 5 segundos
}

// Inicializa o footer
function initializeFooter() {
    const footerContent = document.querySelector('.footer-content');
    
    // Elementos do footer
    const footerHTML = `
        <div class="footer-right">
            <img src="img/emec.png" alt="e-MEC" class="emec-qr">
        </div>
        <div class="footer-bot">
            <span>&copy; ${new Date().getFullYear()} FAESMA. Todos os direitos reservados.</span>
            <img src="img/FAESMA SEM FUNDO LETRA BRANCA.png" alt="FAESMA logo" class="footer-logo">
        </div>
    `;
    
    footerContent.innerHTML = footerHTML;
}

// Adicione ao evento DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', () => {
    initializeSlideshow();
    initializeFooter();
});

        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Verifica se há preferência salva
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Salva a preferência do usuário
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', null);
        }
    });