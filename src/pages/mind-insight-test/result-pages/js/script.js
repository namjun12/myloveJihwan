
$(document).ready(function(){
    //헤더 푸터 컴포넌트
    $('#header').load('./components/header.html', function(){

        $('.sitemap-btn').click(function(){
            $(this).toggleClass('active');
            $('.sub-gnb-wrap').toggleClass('sitemap');
            $('.sitemap-bg').toggleClass('active');
        });

        $('.gnb-menu').click(function(){
            $('.gnb-menu').removeClass('active');
            $(this).addClass('active');
            $('.sub-gnb-wrap').removeClass('active');
            $(this).siblings('.sub-gnb-wrap').addClass('active');
        });

        $('.toggle-btn').click(function(){
            $('html, body').addClass('fixed');
            $('.gnb-wrap').addClass('active');
            $('.gnb-wrap-bg').addClass('active');
        });

        $('.toggle-close-btn').click(function(){
            $('html, body').removeClass('fixed');
            $('.gnb-wrap').removeClass('active');
            $('.gnb-wrap-bg').removeClass('active');
        });

    });

    $('#footer').load('./components/footer.html');
    $('#pagination').load('./components/pagination.html');

    //모달 닫기
    $('.modal-container .close-btn').click(function(){
        $(this).closest('.modal-container').hide();
    })

    $('.modal-container').click(function (e) {
        if (e.target === this) {
            $(".modal-container").hide();
        }
    });
})