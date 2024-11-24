
$(document).ready(function () {
    //헤더 푸터 컴포넌트
    $('.sitemap-btn').click(function () {
        $(this).toggleClass('active');
        $('.gnb').toggleClass('sitemap');
        $('.sitemap-bg').toggleClass('active');
        $('.mb-gnb').toggleClass('active');
    });

    $('.gnb-menu').click(function () {
        $('.gnb-menu').removeClass('active');
        $(this).addClass('active');
        $('.sub-gnb-wrap').removeClass('active');
        $(this).siblings('.sub-gnb-wrap').addClass('active');
    });

    $('.toggle-btn').click(function () {
        $('html, body').addClass('fixed');
        $('.gnb-wrap').addClass('active');
        $('.gnb-wrap-bg').addClass('active');
    });

    $('#footer').load('./components/footer.html');
    $('#top_menu').load('./components/top_menu.html');
    $('#pagination').load('./components/pagination.html');

    //모달 닫기
    $('.modal-container .close-btn').click(function () {
        $(this).closest('.modal-container').hide();
    })

    $('.modal-container').click(function (e) {
        if (e.target === this) {
            $(".modal-container").hide();
        }
    });

    //이미지 클릭 시 팝업
    $('.img-container').click(function () {
        $('.modal_slide').show();
    });
})