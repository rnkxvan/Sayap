
// ========================== Scroll animation ==========================

const animItems = document.querySelectorAll('.anim-items')

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 3;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('anim-no-active')) {
                    animItem.classList.remove('_active');
                }

            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }
    setTimeout(() => {
        animOnScroll();
    }, 200);

}

// ========================== Header menu ==========================


$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        if (!$('.menu_box').hasClass('floating')) {
            $('.menu_box').addClass('floating');
        }
    } else {
        $('.menu_box').removeClass('floating');
    }
});

// ========================== Logo animation ==========================


$('.logo').hover(function () {
    $(this).addClass('animate__jello');

}, function () {
    $(this).removeClass('animate__jello');
});


// ========================== Portfolio script ==========================



$(function () {

    $('.portfolio_link').click(function (e) {
        e.preventDefault();

        $('.portfolio_box').each(function (index, element) {
            if ($(element).css('display') === 'block') {
                $(this).css('display', 'none');
            }
        });

        if ($(e.currentTarget).attr('id') === 'vera_portfolio') {

            $('.vera_portfolio').fadeIn('slow');
            $('#vera_card').removeClass('disabled');
            $('.designer_card:not(#vera_card)').addClass('disabled');
        }

        if ($(e.currentTarget).attr('id') === 'marina_portfolio') {

            $('.marina_portfolio').fadeIn('slow');
            $('#marina_card').removeClass('disabled');
            $('.designer_card:not(#marina_card)').addClass('disabled');
        }

        if ($(e.currentTarget).attr('id') === 'natali_portfolio') {

            $('.natali_portfolio').fadeIn('slow');
            $('#natali_card').removeClass('disabled');
            $('.designer_card:not(#natali_card)').addClass('disabled');
        }

        if ($(e.currentTarget).attr('id') === 'daria_portfolio') {

            $('.daria_portfolio').fadeIn('slow');
            $('#daria_card').removeClass('disabled');
            $('.designer_card:not(#daria_card)').addClass('disabled');
        }

    })
    
    //=============================== Viewer script ============================

    var Viewer = window.Viewer;
    const gallery_vera = new Viewer(document.getElementById('images_vera'));
    const gallery_marina = new Viewer(document.getElementById('images_marina'));
    const gallery_natali = new Viewer(document.getElementById('images_natali'));
    const gallery_daria = new Viewer(document.getElementById('images_daria'));


})
