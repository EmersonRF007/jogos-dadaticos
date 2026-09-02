// 1. Banco de Dados atualizado: Agora com a propriedade "area"
const jogos = [
    {
        id: 1,
        titulo: "Corrida da Fatoração",
        area: "Matemática",
        tags: ["Fatoração", "Álgebra", "Competitivo"], // Note que tirei a tag "Matemática" pois já é a área
        link: "./jogos/corrida-fatoracao/index.html",
        imagem: "./assets/capa-fatoracao.jpg"
    },
    {
        id: 2,
        titulo: "Jogo do MMC e MDC",
        area: "Matemática",
        tags: ["MMC", "Aritmética", "Lógica"],
        link: "./jogos/jogo-mmc/index.html",
        imagem: "./assets/capa-mmc.png"
    },
    {
        id: 3,
        titulo: "Gráfico de Logaritimo",
        area: "Matemática",
        tags: ["Fatoração", "Lógica", "Logaritimos"],
        link: "./jogos/grafico-logaritmo/index.html",
        imagem: "https://placehold.co/600x400/c0392b/ffffff?text=Gráfico_Log"
    },
    {
        id: 4,
        titulo: "Leis de Newton no Espaço",
        area: "Física",
        tags: ["Mecânica", "Dinâmica", "Aventura"],
        link: "#",
        imagem: "https://placehold.co/600x400/8e44ad/ffffff?text=Leis+de+Newton"
    },
    {
        id: 5,
        titulo: "Resolvendo Logaritimos",
        area: "Matemática",
        tags: ["Fatoração", "Lógica", "Logaritimos"],
        link: "./jogos/pratica-logaritmos/index.html",
        imagem: "https://placehold.co/600x400/c0392b/ffffff?text=Logaritimos"
    }
];

// Seletores
const gamesGrid = document.getElementById('gamesGrid');
const areaContainer = document.getElementById('areaContainer');
const tagContainer = document.getElementById('tagContainer');
const searchInput = document.getElementById('searchInput');

// Estados dos filtros
let areaAtual = 'Todas';
let tagAtual = 'Todas';

// 2. Extrair Áreas únicas
function extrairAreas() {
    const areas = [...new Set(jogos.map(jogo => jogo.area))];
    return ["Todas", ...areas.sort()];
}

// 3. Extrair Tags únicas baseadas na Área atual
function extrairTagsPorArea() {
    let tags = new Set();
    jogos.forEach(jogo => {
        if (areaAtual === 'Todas' || jogo.area === areaAtual) {
            jogo.tags.forEach(tag => tags.add(tag));
        }
    });
    return ["Todas", ...Array.from(tags).sort()];
}

// 4. Renderizar botões de Áreas
function renderizarAreas() {
    const areas = extrairAreas();
    areaContainer.innerHTML = '';

    areas.forEach(area => {
        const btn = document.createElement('button');
        btn.className = `btn-filter btn-area ${area === areaAtual ? 'active' : ''}`;
        btn.innerText = area;
        
        btn.addEventListener('click', () => {
            areaAtual = area;
            tagAtual = 'Todas'; // Reseta a tag ao mudar de área
            renderizarAreas();  // Re-renderiza para atualizar classe 'active'
            renderizarTags();   // Atualiza as tags disponíveis
            filtrarJogos();     // Atualiza os jogos na tela
        });
        
        areaContainer.appendChild(btn);
    });
}

// 5. Renderizar botões de Tags
function renderizarTags() {
    const tags = extrairTagsPorArea();
    tagContainer.innerHTML = '';

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = `btn-filter ${tag === tagAtual ? 'active' : ''}`;
        btn.innerText = tag;
        
        btn.addEventListener('click', () => {
            tagAtual = tag;
            renderizarTags(); // Re-renderiza para atualizar classe 'active'
            filtrarJogos();   // Atualiza os jogos na tela
        });
        
        tagContainer.appendChild(btn);
    });
}

// 6. Renderizar os cards na tela
function renderizarJogos(listaDeJogos) {
    gamesGrid.innerHTML = '';

    if (listaDeJogos.length === 0) {
        gamesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem;">Nenhum jogo encontrado com estes filtros.</p>';
        return;
    }

    listaDeJogos.forEach(jogo => {
        const card = document.createElement('div');
        card.className = 'card';

        const tagsHTML = jogo.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <img src="${jogo.imagem}" alt="${jogo.titulo}" class="card-img">
            <div class="card-content">
                <span class="card-area-badge">${jogo.area}</span>
                <h3 class="card-title">${jogo.titulo}</h3>
                <div class="card-tags">
                    ${tagsHTML}
                </div>
                <a href="${jogo.link}" class="btn-jogar">Jogar Agora</a>
            </div>
        `;
        
        gamesGrid.appendChild(card);
    });
}

// 7. Lógica central de filtragem
function filtrarJogos() {
    const termoBusca = searchInput.value.toLowerCase();

    const jogosFiltrados = jogos.filter(jogo => {
        const correspondeBusca = jogo.titulo.toLowerCase().includes(termoBusca);
        const correspondeArea = areaAtual === 'Todas' || jogo.area === areaAtual;
        const correspondeTag = tagAtual === 'Todas' || jogo.tags.includes(tagAtual);
        
        return correspondeBusca && correspondeArea && correspondeTag;
    });

    renderizarJogos(jogosFiltrados);
}

// 8. Event Listener da busca
searchInput.addEventListener('input', filtrarJogos);

// Inicialização do site
renderizarAreas();
renderizarTags();
renderizarJogos(jogos);