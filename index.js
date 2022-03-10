$(document).ready(function () {
    fullPage();
    Click();
});

function fullPage() {
    const pageNumber = $("#page > .fullsection").size();

    for (let i = 0; i < pageNumber; i++) {
        $("#page > .quick > ul").append("<li></li>");
    }

    $("#page .quick ul :first-child").addClass("on");

    $(window).on("mousewheel", function (event) {
        let page = $(".quick ul li.on");

        if ($("body").find("#page:animated").length > 0) return false;

        // 아래로 휠
        if (event.originalEvent.deltaY > 0) {
            const thisPage = parseInt(page.index() + 1);
            const lastPage = parseInt($(".quick ul li").size());

            if (page.index() <= $(".quick ul li").size()) {
                page.next().addClass("on").siblings(".on").removeClass("on");
            }
            if (thisPage < lastPage) {
                let pageLength = 0;
                for (let i = 0; i < thisPage + 1; i++) {
                    pageLength += $(".full" + i).height();
                }
                $("#page").animate({
                    top: -pageLength + "px"
                }, 500, "swing");
            }

            if (thisPage == 1) {
                $('.full2 .letter').css({
                    left: 10 + "px"
                });
                setTimeout(function () {
                    $('.full2 .box1').css({ animation: "wavy 1s infinite" })
                }, 100);
                setTimeout(function () {
                    $('.full2 .box2').css({ animation: "wavy 1s infinite" })
                }, 200);
                setTimeout(function () {
                    $('.full2 .box3').css({ animation: "wavy 1s infinite" })
                }, 300);
                setTimeout(function () {
                    $('.full2 .box4').css({ animation: "wavy 1s infinite" })
                }, 400);
                
            } else {
                $('.full2 .letter').css({
                    left: 400 + "px"
                });
            }
            // 위로 휠
        } else {
            const backPage = page.index();

            if (page.index() >= 0) page.prev().addClass("on").siblings(".on").removeClass("on");
            let pageLength = 0;
            for (let i = 0; i < backPage; i++) {
                pageLength += $(".full" + i).height();
            }

            if (page.index() > 0) {
                // page = page.index() - 1;
                $("#page").animate({
                    top: -pageLength + "px"
                }, 500, "swing");
            }

            if (backPage == 2) {
                $('.full2 .letter').css({
                    left: 10 + "px"
                });
            } else {
                $('.full2 .letter').css({
                    left: -400 + "px"
                });
            }
        }

    });

    $(window).resize(function () {
        const resizeIndex = $(".quick ul li.on").index() + 1;

        let pageLength = 0;
        for (let i = 1; i < resizeIndex; i++) {
            pageLength += $(".full" + i).height();
        }

        $("#page").animate({
            top: -pageLength + "px"
        }, 0);
    })
}

function Click() {
    $("#navigator span").click(function () {

        $(".quick ul li:nth-child(" + this.id + ")").addClass("on").siblings(".on").removeClass("on");
        
        $('.full2 .letter').css({
            left: 10 + "px"
        });

        $('#page').animate({
            top: +100 - 100 * this.id + "%"
        }, 500, "swing");
        return false;
    })


    $(".quick li").click(function () {
        const index = $(this).index() + 1;

        let length = 0;
        for (let i = 1; i < index; i++) {
            length += $(".full" + i).height();
        }
        console.log(length);
        if ($("body").find("#page:animated").length >= 1) return false;
        $(this).addClass("on").siblings("li").removeClass("on");

        if (index == 2) {
            $('.full2 .letter').css({
                left: 10 + "px"
            });
        } else {
            $('.full2 .letter').css({
                left: -400 + "px"
            });
        }

        $("#page").animate({
            top: -length + "px"
        }, 500, "swing");
        return false;
    });

}