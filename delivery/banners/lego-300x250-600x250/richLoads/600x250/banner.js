(function () {
    "use strict";
    var Banner = function () {
        var t = this,
            $cta = myFT.$("#cta"),
            $close = myFT.$("#close"),
            $parallaxContainer = $('.parallax'),
            $bannerInner = $('#banner-inner'),
            $hotspots = $('.parallax-hotspot'),
            $videoContainer = $('.video-container'),
            $videoClose = $('.video-container__close'),
            $videos = $('.video-container__video'),
            $arrowTop = $('.arrow__top'),
            $snakes = $('.cta-snake'),
            $bgs = $('.vide-container__bg'),
            $arrowBottom = $('.arrow__bottom');

        this.videoContainerVisible = false;
        this.selectedVideo = null;
        this.selectedBackground = null;


        function bindEvents() {
            $hotspots.on('click', function () {
                t.selectedVideo = $videos[this.dataset.video];
                t.selectedBackground = $bgs[this.dataset.video];
                t.videoContainerVisible = true;
                TweenMax.set(t.selectedVideo, {zIndex: 4});
                TweenMax.to([$videoContainer, t.selectedBackground], 0.4, {autoAlpha: 1, onComplete: function () {

                    if (!(t.selectedVideo.hasAttribute('name'))) {
                        t.selectedVideo.name = t.selectedVideo.id;
                    } else {
                        t.selectedVideo.play();
                    }
                }});
            });

            $videoClose.on('click', function () {
                t.videoContainerVisible = false;
                TweenMax.to([$videoContainer, t.selectedBackground], 0.1, {autoAlpha: 0});
                TweenMax.set(t.selectedVideo, {zIndex: 1});

                //reset video
                if (!t.selectedVideo.paused) {
                    t.selectedVideo.pause();
                }
                if (t.selectedVideo.muted === true) {
                    t.selectedVideo.muted = false;
                }
                t.selectedVideo.currentTime = 0;
            });

            $cta.on('mouseenter', function () {
                TweenMax.to($cta, 0.2, {y: -6});
                TweenMax.staggerTo($snakes, 0.2, {x: '-100%'}, 0.1);
            });

            $cta.on('mouseleave', function () {
                TweenMax.to($cta, 0.2, {y: 0});
                TweenMax.staggerTo($snakes, 0.2, {x: '0%'}, 0.1);
            });

        }

        function bindFTEvents() {
            myFT.applyClickTag($cta);
            $close.on('click', function () {
                myFT.contract();
            });
        }

        function parallax() {
            var bannerContainer = $bannerInner[0],
                // Temporary ables to hold mouse x-y pos.s
                tempY = 0,
                windowHeight = 250,
                IE = document.all ? true : false,
                objectArray = [
                    // container
                    $parallaxContainer[0],
                    //inital position
                    -60,
                    //factor of movement
                    0.48
                ],
                yourDivPositionY = null;

            function moveDiv(tempY) {
                yourDivPositionY = objectArray[2] * (0.5 * windowHeight - tempY) + objectArray[1];
                objectArray[0].style.top = yourDivPositionY + 'px';

                if (yourDivPositionY < -105) {
                    TweenMax.to($arrowBottom, 0.1, {autoAlpha: 0});
                    TweenMax.to($arrowTop, 0.1, {autoAlpha: 1});
                } else if (yourDivPositionY > -10) {
                    TweenMax.to($arrowTop, 0.1, {autoAlpha: 0});
                    TweenMax.to($arrowBottom, 0.1, {autoAlpha: 1});
                } else {
                    TweenMax.to([$arrowBottom, $arrowTop], 0.1, {autoAlpha: 1});
                }
            }

            function getMouseXY(e) {
                if (t.videoContainerVisible) {
                    return;
                }

                if (IE) {
                    // grab the x-y pos.s if browser is IE
                    tempY = event.clientY + document.body.scrollTop;
                } else {
                    // grab the x-y pos.s if browser is NS
                    tempY = e.pageY;
                }
                // catch possible negative values in NS4
                if (tempY < 0) {tempY = 0; }

                moveDiv(tempY);

                return true;
            }

            function positionDivs() {
                objectArray[0].style.top = objectArray[1] + 'px';
            }

            positionDivs();

            // Set-up to use getMouseXY function onMouseMove
            bannerContainer.onmousemove = getMouseXY;
        }

        function init() {
            bindEvents();
            bindFTEvents();
            parallax();
        }

        t.dynamicLoad = function () {
            var imgArray = [
                    'arrow.png',
                    'bg.jpg',
                    'chopper.png',
                    'cta.png',
                    'flytrap.png',
                    'hotspot.png',
                    'kayak.png',
                    'large-truck.png',
                    'logo.png',
                    'man-2.png',
                    'man.png',
                    'snake.png',
                    'temple.png',
                    'truck.png',
                    'video-bg-1.png',
                    'video-bg-2.png',
                    'video-bg-3.png',
                    'video-border.png'
                ],
                i = 0,
                img = null,
                onDynamicLoad = function () {
                    if ((imgArray.length) === t.count) {
                        init();
                    }
                    t.count = t.count + 1;
                };
            t.count = 1;
            for (i; imgArray.length > i; i++) {
                img = new Image();

                img.src = "img/" + imgArray[i];
                img.onload = onDynamicLoad;
            }
        };
    };

/**************
 ****CAMILO****
 ****WAS*******
 ****HERE******
 **************/

    window.onload = function () {
        var banner = new Banner();
        banner.dynamicLoad();
    };
}());