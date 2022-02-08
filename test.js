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

        if (event.originalEvent.deltaY > 0) {
            const nextPage = parseInt(page.index() + 1);
            const lastPage = parseInt($(".quick ul li").size());

            if (page.index() <= $(".quick ul li").size() - 1) {
                page.next().addClass("on").siblings(".on").removeClass("on");
            }
            if (nextPage < lastPage) {
                let pageLength = 0;
                for (let i = 1; i < nextPage + 1; i++) {
                    pageLength += $(".full" + i).height();
                }
                $("#page").animate({
                    top: -pageLength + "px"
                }, 500, "swing");
            }
        } else {
            const before = page.index();
            if (page.index() >= 0) page.prev().addClass("on").siblings(".on").removeClass("on");
            let pageLength = 0;
            for (let i = 1; i < before; i++) {
                pageLength += $(".full" + i).height();
            }

            if (page.index() > 0) {
                page = page.index() - 1;
                $("#page").animate({
                    top: -pageLength + "px"
                }, 500, "swing");
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
    $(".quick li").click(function () {
        const index = $(this).index() + 1;
        let length = 0;
        for (let i = 1; i < index; i++) {
            length += $(".full" + i).height();
        }
        if ($("body").find("#page:animated").length >= 1) return false;
        $(this).addClass("on").siblings("li").removeClass("on");

        $("#page").animate({
            top: -length + "px"
        }, 500, "swing");
        return false;
    });
}