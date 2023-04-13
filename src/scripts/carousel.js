export function initCarousel() {
    
    bulmaCarousel.attach('#carousel-demo', {
        slidesToScroll: 1,
        slidesToShow: 5,
        pagination: false,
        infinite: true,
    });
}