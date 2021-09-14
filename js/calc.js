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
    if ($(this).scrollTop() > 150) {
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


// ========================== Calc script ==========================


$(function () {
    $('input[name=kitchen]').change(function () {
        var width = $('input[name=width]');
        var angle = +($(this).val());
        if (angle) {
            width.css('display', 'block');
        } else {
            width.css('display', 'none');
            width.val('');
        }
    });


    $.ajax({
        url: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
        success: function (response) {
            currency = response;
        }
    });


    $('#sum').click(function (e) {
        e.preventDefault();
        var obj = {
            'lenght': +$('input[name=lenght]').val(),
            'width': +$('input[name=width]').val(),
            "facade": +$('input[name=facade]:checked').val(),
            "corps": +$('input[name=furniture]:checked').val(),
            "complect": +$('input[name=complect]:checked').val(),
            "desktop": +$('input[name=desktop]:checked').val(),
        }
        console.log(obj.lenght);
        if (obj.lenght < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Ууупс...',
                text: 'Введите положительные значения',
            })
            return
        }
        if (obj.lenght === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Ууупс...',
                text: 'Введите размеры кухни',
            })
            return
        }
        if ($('input[id=angle]').is(':checked') && obj.width === 0)  {
            Swal.fire({
                icon: 'error',
                title: 'Ууупс...',
                text: 'Введите размер "б"',
            })
            return
        }
        var usdCurrency = currency[0].sale;
        console.log(usdCurrency);




        var sumUah = (obj.lenght + obj.width) * (obj.facade + obj.corps + obj.desktop) * obj.complect;
        var sumUsd = Math.round(sumUah / usdCurrency);
        Swal.fire({
            title: 'Ориентировочная стоимость выбранной кухни',
            html: sumUah + ' uah ' + '<br>' + 'или' + '<br>' + sumUsd + ' $',
            icon: 'success',
            confirmButtonText: 'Закрыть'
        })



    });



})