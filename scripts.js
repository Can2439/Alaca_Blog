// scripts.js

// Sabit Header
window.onscroll = function() {
    const header = document.querySelector('header');
    if (window.pageYOffset > 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
};

// Diğer fonksiyonlar ve kullanıcı etkileşimleri burada olabilir.
