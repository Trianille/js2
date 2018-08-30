function carousel() {
    const form = new FormData();
    form.append('json', JSON.stringify({
        id_user: '123'
    }));

    fetch('http://localhost:3000/cart.get', {
        method: 'POST',
        body: form
    }).then((response) => {
        return response.text();
    }).then((data) => {
        const obj = JSON.parse(data);
        $('.container').append('<div class="swiper-container"><div class="swiper-wrapper"></div></div>');
        for (let item of obj.basket) {
            $('.swiper-wrapper').append('<div class="swiper-slide">' + item.id_product + '</div>');
        }
        const mySwiper = new Swiper('.swiper-container', {
            loop: true,
            slidesPerView: 3
        });
    });
}