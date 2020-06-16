const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button.right');
const prevBtn = document.querySelector('.carousel__button.left');
const carouselNav = document.querySelector('.carousel__nav');
const dots = Array.from(carouselNav.children);
const sliderWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = sliderWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
}

const toggleArrows = (slides, prevBtn, nextBtn, targetIndex) => {
    if (targetIndex === 0) {
        prevBtn.classList.add('is-hidden');
        nextBtn.classList.remove('is-hidden');
    } else if ( targetIndex === slides.length - 1) {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.add('is-hidden');
    } else {
        prevBtn.classList.remove('is-hidden');
        nextBtn.classList.remove('is-hidden');
    }
}

prevBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = carouselNav.querySelector('.current_slide');
    const targetDot = currentDot.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, targetDot);
    toggleArrows(slides, prevBtn, nextBtn, targetIndex)
})

nextBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = carouselNav.querySelector('.current_slide');
    const targetDot = currentDot.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, targetDot);
    toggleArrows(slides, prevBtn, nextBtn, targetIndex)
});

carouselNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) {return;}
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current_slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    
    toggleArrows(slides, prevBtn, nextBtn, targetIndex);
})