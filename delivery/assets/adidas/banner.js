(function () {
    "use strict";
    var CollapsedBanner = function (settings) {
        var t = this,
            banner = document.getElementById('html5banner'),
            logo = document.getElementsByClassName('logo-container'),
            logoTxt = document.getElementsByClassName('logo__words'),
            stripe1 = document.getElementsByClassName('logo__stripe-1'),
            stripe3 = document.getElementsByClassName('logo__stripe-3'),
            stripes = document.getElementsByClassName('logo-stripes'),
            arrow = document.getElementsByClassName('arrow'),
            heroContainer = document.getElementsByClassName('hero-image-container'),
            hero = document.getElementsByClassName('hero-image'),
            images = document.getElementsByClassName('block'),
            image1 = document.getElementsByClassName('image-1'),
            image2 = document.getElementsByClassName('image-2'),
            image3 = document.getElementsByClassName('image-3'),
            image4 = document.getElementsByClassName('image-4'),
            txt = document.getElementsByClassName('txt'),
            cta = document.getElementsByClassName('cta'),
            ctaArrow = document.getElementsByClassName('cta-arrow'),
            master = new TimelineMax();
        function animation() {

            function hover() {
                banner.addEventListener('mouseenter', function () {
                    TweenMax.to(ctaArrow, 0.2, {x: 2, yoyo: true, repeat: -1});
                });

                banner.addEventListener('mouseleave', function () {
                    TweenMax.to(ctaArrow, 0.2, {x: 0});
                });
            }

            function act1() {
                var tl = new TimelineMax();
                tl.set(banner, {opacity: 1});
                tl.to([logo, heroContainer], 1, {opacity: 1});
                tl.add('start', '+=0.5');
                tl.to(logo, 1, {opacity: 0}, 'start');
                tl.to(heroContainer, 1.5, {scaleX: 0.5, scaleY: 0.596, y: -1}, 'start');
                tl.to(hero, 1.5, {scaleX: 1.25, scaleY: 1.1, x: -48, y: -6}, 'start');
                tl.staggerTo(images, 1.5, {opacity: 1}, 0.4, '-=1');
                tl.to(txt, 0.7, {opacity: 1}, '-=0.8');
                tl.set(logo, {x: 77, y: -7});
                tl.to(logo, 0.3, {opacity: 1, scale: 0.5});
                tl.add('move-arrows', '+=0.3');
                tl.to(stripe1, 0.5, {x: '7%'}, 'move-arrows');
                tl.to(stripe3, 0.5, {x: '-7%'}, 'move-arrows');
                tl.to(logoTxt, 0.2, {opacity: 0}, 'move-arrows');
                tl.add('spin');
                tl.to(stripes, 0.5, {rotation: '360deg', scale: 0}, 'arrow');
                tl.to(arrow, 0.5, {rotation: '360deg', scale: 4}, 'arrow');
                tl.set(logo, {opacity: 0});
                tl.set(logoTxt, {opacity: 1});
                tl.set([stripe1, stripe3], {clearProps: 'x'});
                tl.set(stripes, {clearProps: "rotation, scale"});
                tl.add('cta');
                tl.to(arrow, 0.5, {scale: 1, y: 56, x: 26}, 'cta');
                tl.to(logo, 0.5, {opacity: 1}, 'cta');
                tl.add('arrow-switch');
                tl.to(arrow, 0.2, {opacity: 0}, 'arrow-switch');
                tl.to(cta, 0.2, {opacity: 1}, 'arrow-switch');
                return tl;
            }

            function act2() {
                var tl = new TimelineMax();
                tl.add('box-animation');
                tl.from(image1, 4, {y: -10, ease: Power0.easeNone}, 'box-animation');
                tl.from(image2, 3, {scale: 1.1, ease: Power0.easeNone}, 'box-animation+=3');
                tl.from(image3, 7, {x: -10, ease: Power0.easeNone}, 'box-animation+=1.6');
                tl.to(image4, 3, {opacity: 1}, 'box-animation+=6');
                tl.timeScale(1.3);
                return tl;
            }

            master.add(act1(), '0.5');
            master.add(act2(), '-=6.5');
            master.call(hover);
            master.timeScale(1.3);

        }
        function init() {
            animation();
        }
        t.dynamicLoad = function () {
            t.count = 1;
            var imgArray = settings.images,
                i = 0,
                img = null,
                onDynamicLoad = function () {
                    if ((imgArray.length) === t.count) {
                        init();
                    }
                    t.count = t.count + 1;
                };

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
        var collapsedBanner = new CollapsedBanner({
            images: [
                'hero.jpg',
                'image-1.jpg',
                'image-2.jpg',
                'image-3.jpg',
                'image-4.jpg',
                'txt.png'
            ]
        });
        collapsedBanner.dynamicLoad();
    };
}());