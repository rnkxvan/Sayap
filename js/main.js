// ===================== Vanilla card script ==========================

VanillaTilt.init(document.querySelector(".card"), {
    max: 20,
    speed: 150
});
VanillaTilt.init(document.querySelectorAll(".card"));




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
    }, 1500);

}

$(function () {



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






    // ========================== Preloader ==========================

    $(window).on('load', function () {
        setTimeout(function () {
            $('.preloader_box').fadeOut(700);
        }, 0);
    })






    // ========================== Slider ==========================


    $('.bxslider').bxSlider({
        mode: 'fade',
        speed: 600,
        captions: true,
        slideWidth: 1280,
    });




    //==========================  Link reset properties ==========================


    $('a#drop_kitchen_link').click(function (e) {
        e.preventDefault();
        return false;
    });
    $('a#toggleBtn').click(function (e) {
        e.preventDefault();
        return false;
    });





    // ========================== Dropdown start ==========================


    $('#drop_kitchen_link').click(function () {
        if (!$('.kitchen_dropdown').hasClass('kitchen_dropdown_open')) {
            $('.kitchen_dropdown').addClass('kitchen_dropdown_open');
        } else {
            $('.kitchen_dropdown').removeClass('kitchen_dropdown_open');
        }
    });





    // ========================== Showmore cards ==========================



    $('#show_more').click(function () {


        if ($('.card').length <= 18) {
            for (i = 1; i <= 3; i++) {

                $('.card').eq(Math.floor(Math.random() * 3)).clone().appendTo('.cards_box');
            }
            if ($('.card').length >= 18) {
                $(this).text('СКРЫТЬ')
            }
        }
        if ($('.card').length >= 21) {
            $('.card').slice(-9).remove();
            $(this).text('ПОКАЗАТЬ ЕЩЕ')
        }



        $('.price_calc').click(function () {
            window.location.href = "/calc.html";
        })
        console.log($('.card').length);
    })



    // ========================== Typing text ==========================


    $(".warranty_text").typeWrite({
        speed: 50
    });


    // ========================== Side menu ==========================

    $('.switch').click(function () {
        if ($('.catalog_box_menu').hasClass('hide')) {
            $('.catalog_box_menu').removeClass('hide');
            $('.switch').removeClass('hide');
        } else {
            $('.catalog_box_menu').addClass('hide');
            $('.switch').addClass('hide');

        }
    })

    // ========================== Button up ==========================

    var button = $('#button-up');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            button.fadeIn();
        } else {
            button.fadeOut();
        }
    });
    button.on('click', function () {
        $('body, html').animate({
            scrollTop: 0
        }, 300);
        return false;
    });

    // ========================== Mask input ==========================


    $('.user_phone').maskInput('(999) 999-9999');
    $('.user_name').keyup(function () {
        this.value = this.value.replace(/[^а-яА-ЯёЁa-zA-Z]/i, "");
    });


    // ========================== Img viewer ==========================


    $(".img_box img").click(function () {
        $("#full-image").attr("src", $(this).attr("src"));
        $('#image-viewer').show();
    });

    $("#image-viewer .close").click(function () {
        $('#image-viewer').hide();
    });

    $('.price_calc').click(function () {
        window.location.href = "calc.html";
    })


    // ========================== Form validation ==========================
    var files;
    $('#myfile').change(function (e) {
        e.preventDefault();
        files = this.files;
        console.log(files);
        uploadfile()
        console.log(files);

    });

    function uploadfile() {

        var filename = $("#myfile").val();
        var aux = filename.split('.');
        var extension = aux[aux.length - 1].toUpperCase();
        console.log(extension);

        if (extension === 'JPEG' ||
            extension === 'JPG' ||
            extension === 'PDF'
        ) {
            $('.dwnload_file_name').css({
                border: 'none',
                visibility: 'visible'
            }).text(files[0].name);
        } else {
            filename = '';
            $('.dwnload_file_name').css({
                border: 'none',
                visibility: 'hidden'
            })
            Swal.fire({
                icon: 'error',
                title: 'Ууупс...',
                text: 'Неверный формат файла',
            })
        }
        if (files[0].size > 1 * 1024 * 1024) {
            filename = '';
            $('.dwnload_file_name').css({
                border: 'none',
                visibility: 'hidden'
            })
            Swal.fire({
                icon: 'error',
                title: 'Ууупс...',
                text: 'Размер файла не должен превышать 1 Мб',
            })
        }
    }
    
    
    
    

    $('#submit_btn').click(function (e) {
        e.preventDefault();
        
        let name = $('#user_name_f1').val();
        let phone = $('#user_phone_f1').val();
        let download = $('#myfile').val();
        let politic = $('#politic_conf').is(':checked');

        var data = new FormData();
        var formData = $('#project_form').serializeArray();
        console.log(formData);
        $.each(formData, function (key, input) {
            data.append(input.name, input.value);
            console.log(data.append);
        });

        var fileData = $('input[name="myfile"]')[0].files;
        for (var i = 0; i < fileData.length; i++) {
            data.append("myfile[]", fileData[i]);
        }
        
        console.log(fileData);
        

        $('.error').css('visibility', 'hidden');

        if (name.length < 3 && name.length != 0) {
            $(".name_error").css('visibility', 'visible').text('Поле должно содержать больше 3-х символов');
            $('#user_name_f1').val('');
            return false;
        } else if (name.length == 0) {
            $(".name_error").css('visibility', 'visible').text('Поле обязательно для заполнения');
            return false;
        } else if (phone.length == 0) {
            $(".phone_error").css('visibility', 'visible').text('Поле обязательно для заполнения');
            return false;
        } else if (!politic) {
            $(".politic_error").css('visibility', 'visible').text('Ознакомтесь с условиями');
            return false;
        } else if (download === '') {
            $(".dwnload_file_name").css('visibility', 'visible').text('Загрузите файл проекта');
            return false;
        } else {
            $(".dwnload_file_name").css('visibility', 'visible');
        }
            
        $.ajax({
            url: $('#project_form').attr('action'),
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('#submit_btn').prop('disabled', true);
            },
            success: function () {
                $('#submit_btn').prop('disabled', false);
                Swal.fire({
                    icon: 'success',
                    title: 'УРА!',
                    text: 'Ваша заявка отправлена',
                })
                $('#project_form').trigger('reset');
                $('.dwnload_file_name').css({
                    border: 'none',
                    visibility: 'hidden'
                });
            }
        })

    })
    $('#send_btn').click(function (e) {
        e.preventDefault();
        var $data;
        let name = $('#user_name_f2').val();
        let phone = $('#user_phone_f2').val();

        if ($(this).attr('data-method') == 'serialize') {
            $data = $(this).parent('form').serialize();
            console.log($(this).parent('form'));
        }
        console.log($data);

        $('.name_error_form2').css('visibility', 'hidden');
        $('.phone_error_form2').css('visibility', 'hidden');

        if (name.length < 3 && name.length != 0) {
            $(".name_error_form2").css('visibility', 'visible').text('Поле должно содержать больше 3-х символов');
            $('#user_name_f2').val('');
            return false;
        } else if (name.length == 0) {
            $(".name_error_form2").css('visibility', 'visible').text('Поле обязательно для заполнения');
            return false;
        } else if (phone.length == 0) {
            $(".phone_error_form2").css('visibility', 'visible').text('Поле обязательно для заполнения');
            return false;
        }
            
        $.ajax({
            url: $('#consult_form').attr('action'),
            type: 'POST',
            data: $data,
            cache: false,
            beforeSend: function () {
                $('#send_btn').prop('disabled', true);
            },
            success: function () {
                $('#send_btn').prop('disabled', false);
                Swal.fire({
                    icon: 'success',
                    title: 'УРА!',
                    text: 'Мы скоро Вам перезвоним!',
                })
                $('#consult_form').trigger('reset');
            }
        })

    })


});
