let currentPlan = 'mensal';

function setPlan(plan) {
    currentPlan = plan;
    const selector = document.getElementById('selector-bg');
    const btnM = document.getElementById('btn-mensal');
    const btnA = document.getElementById('btn-anual');
    const priceBox = document.getElementById('price-content');
    const title = document.getElementById('plan-title');
    const features = document.getElementById('features-list');

    if (plan === 'anual') {
        // Movimento do seletor (Animação de arrastar)
        selector.style.transform = 'translateX(126px)';
        btnA.classList.add('active');
        btnM.classList.remove('active');
        
        // Update Conteúdo
        title.innerText = "PLANO ANUAL";
        priceBox.innerHTML = `
            <div class="price-main">R$ 33,25<span>/mês</span></div>
            <span class="price-annual-info">R$ 399,00 cobrados anualmente</span>
        `;
        features.innerHTML = `
            <li>✓ 2 Meses de Desconto</li>
            <li>✓ Domínio .com.br Incluso</li>
            <li>✓ Suporte Prioritário</li>
            <li>✓ Configuração de E-mail</li>
        `;
    } else {
        selector.style.transform = 'translateX(0px)';
        btnM.classList.add('active');
        btnA.classList.remove('active');
        
        title.innerText = "PLANO MENSAL";
        priceBox.innerHTML = `
            <div class="price-main">R$ 39,90<span>/mês</span></div>
        `;
        features.innerHTML = `
            <li>✓ Hospedagem Premium</li>
            <li>✓ Segurança SSL Inclusa</li>
            <li>✓ Suporte via WhatsApp</li>
            <li>✓ Sem fidelidade</li>
        `;
    }
}

function sendWhatsAppPlan() {
    const phone = "5561994415759"; // COLOQUE SEU NÚMERO AQUI
    const msg = `Olá Gabryel! Tenho interesse no plano  ${currentPlan.toUpperCase()} da Aquiles Softwares.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// --- LÓGICA DO FORMULÁRIO (Redirecionamento) ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const btn = this.querySelector('.btn-submit');
        btn.innerText = "ENVIANDO...";
        
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            window.location.href = 'obrigado.html'; // Redireciona para sua página
        } else {
            alert('Erro ao enviar. Tente o WhatsApp!');
            btn.innerText = "Enviar Proposta";
        }
    });
}

// --- LÓGICA DOS COOKIES (Corrigida) ---
const banner = document.getElementById('cookie-banner');
const btnAceitar = document.getElementById('aceitar-cookie');

if (banner && btnAceitar) {
    // Só mostra se não houver a chave no localStorage
    if (!localStorage.getItem('cookiesAceitos')) {
        banner.style.display = 'flex';
    }

    btnAceitar.onclick = () => {
        localStorage.setItem('cookiesAceitos', 'true');
        banner.style.display = 'none';
    };
}