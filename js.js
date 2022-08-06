(function () {

    // VARIABLES
    const timeline = document.querySelector(".timeline ol"),
        elH = document.querySelectorAll(".timeline li > div"),
        arrows = document.querySelectorAll(".timeline .arrows .arrow"),
        arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
        arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
        firstItem = document.querySelector(".timeline li:first-child"),
        lastItem = document.querySelector(".timeline li:last-child"),
        xScrolling = 500,
        disabledClass = "disabled";

    // START
    window.addEventListener("load", init);

    function init() {
        setEqualHeights(elH);
        animateTl(xScrolling, arrows, timeline);
        setSwipeFn(timeline, arrowPrev, arrowNext);
        setKeyboardFn(arrowPrev, arrowNext);
    }

    // SET EQUAL HEIGHTS
    function setEqualHeights(el) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            const singleHeight = el[i].offsetHeight;

            if (counter < singleHeight) {
                counter = singleHeight;
            }
        }

        for (let i = 0; i < el.length; i++) {
            el[i].style.height = `${counter}px`;
        }
    }

    // CHECK IF AN ELEMENT IS IN VIEWPORT
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // SET STATE OF PREV/NEXT ARROWS
    function setBtnState(el, flag = true) {
        if (flag) {
            el.classList.add(disabledClass);
        } else {
            if (el.classList.contains(disabledClass)) {
                el.classList.remove(disabledClass);
            }
            el.disabled = false;
        }
    }

    // ANIMATE TIMELINE
    function animateTl(scrolling, el, tl) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener("click", function () {
                if (!arrowPrev.disabled) {
                    arrowPrev.disabled = true;
                }
                if (!arrowNext.disabled) {
                    arrowNext.disabled = true;
                }
                const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
                if (counter === 0) {
                    tl.style.transform = `translateX(-${scrolling}px)`;
                } else {
                    const tlStyle = getComputedStyle(tl);
                    // add more browser prefixes if needed here
                    const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
                    const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
                    tl.style.transform = `translateX(${values}px)`;
                }

                setTimeout(() => {
                    isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
                    isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
                }, 1100);

                counter++;
            });
        }
    }

    // ADD SWIPE SUPPORT FOR TOUCH DEVICES
    function setSwipeFn(tl, prev, next) {
        const hammer = new Hammer(tl);
        hammer.on("swipeleft", () => next.click());
        hammer.on("swiperight", () => prev.click());
    }

    // ADD BASIC KEYBOARD FUNCTIONALITY
    function setKeyboardFn(prev, next) {
        document.addEventListener("keydown", (e) => {
            if ((e.which === 37) || (e.which === 39)) {
                const timelineOfTop = timeline.offsetTop;
                const y = window.pageYOffset;
                if (timelineOfTop !== y) {
                    window.scrollTo(0, timelineOfTop);
                }
                if (e.which === 37) {
                    prev.click();
                } else if (e.which === 39) {
                    next.click();
                }
            }
        });
    }

})();


// --------------------------------------------------------------------------

var elem = document.getElementById("example")
var headroom = new Headroom(elem, {
    // 參數設定[註1]
    "offset": 200, // 當捲軸到哪時，取消固定
    "scroller": window, // 捲軸
    "classes": {
        "initial": "animate__animated", // 初始的類別
        "pinned": "animate__fadeInDown", // 固定時新增的類別(這裡運用Animate.css的類別)
        "unpinned": "animate__fadeInUp", // 取消固定時新增的類別(這裡運用Animate.css的類別)
        "top": "headroom--top", // 當捲軸在最上面時新增的類別
        "top": "navbar-dark", // 當捲軸在最上面時新增的類別
        "notTop": "headroom--not-top", // 當捲軸不在最上面時新增的類別
        "notTop": "bg-light", // 當捲軸不在最上面時新增的類別
        "bottom": "headroom--bottom", // 當捲軸在最下面時新增的類別
        "notBottom": "headroom--not-bottom" // 當捲軸不在最下面時新增的類別
    },
    onPin: function () {
        // 固定時觸發的事件
    },
    onUnpin: function () {
        // 取消固定時觸發的事件
    },
    onTop: function () {
        // 當捲軸在最上面時觸發的事件
    },
    onNotTop: function () {
        // 當捲軸不在最上面時觸發的事件
    },
    onBottom: function () {
        // 當捲軸在最下面時觸發的事件
    },
    onNotBottom: function () {
        // 當捲軸不在最下面時事件
    }
});
headroom.init();

// 大logo
var logo1 = document.getElementById("logo1")
var headroomlogo1 = new Headroom(logo1, {
    // 參數設定[註1]
    "offset": 200, // 當捲軸到哪時，取消固定
    "scroller": window, // 捲軸
    "classes": {
        "initial": "animate__animated", // 初始的類別
        "pinned": "animate__shake", // 固定時新增的類別(這裡運用Animate.css的類別)
        "unpinned": "animate__fadeInUp", // 取消固定時新增的類別(這裡運用Animate.css的類別)
        "top": "headroom--top", // 當捲軸在最上面時新增的類別
        "notTop": "d-none", // 當捲軸不在最上面時新增的類別
        "bottom": "headroom--bottom", // 當捲軸在最下面時新增的類別
        "notBottom": "headroom--not-bottom" // 當捲軸不在最下面時新增的類別
    },
    onPin: function () {
        // 固定時觸發的事件
    },
    onUnpin: function () {
        // 取消固定時觸發的事件
    },
    onTop: function () {
        // 當捲軸在最上面時觸發的事件
    },
    onNotTop: function () {
        // 當捲軸不在最上面時觸發的事件
    },
    onBottom: function () {
        // 當捲軸在最下面時觸發的事件
    },
    onNotBottom: function () {
        // 當捲軸不在最下面時事件
    }
});
headroomlogo1.init();

// 小logo
var logo2 = document.getElementById("logo2")
var headroomlogo2 = new Headroom(logo2, {
    // 參數設定[註1]
    "offset": 200, // 當捲軸到哪時，取消固定
    "scroller": window, // 捲軸
    "classes": {
        "initial": "animate__animated", // 初始的類別
        "pinned": "animate__fadeInDown", // 固定時新增的類別(這裡運用Animate.css的類別)
        "unpinned": "animate__fadeInUp", // 取消固定時新增的類別(這裡運用Animate.css的類別)
        "top": "d-none", // 當捲軸在最上面時新增的類別
        "notTop": "bg-light", // 當捲軸不在最上面時新增的類別
        "bottom": "headroom--bottom", // 當捲軸在最下面時新增的類別
        "notBottom": "headroom--not-bottom" // 當捲軸不在最下面時新增的類別
    },
    onPin: function () {
        // 固定時觸發的事件
    },
    onUnpin: function () {
        // 取消固定時觸發的事件
    },
    onTop: function () {
        // 當捲軸在最上面時觸發的事件
    },
    onNotTop: function () {
        // 當捲軸不在最上面時觸發的事件
    },
    onBottom: function () {
        // 當捲軸在最下面時觸發的事件
    },
    onNotBottom: function () {
        // 當捲軸不在最下面時事件
    }
});
headroomlogo2.init();


