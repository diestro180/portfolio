(function () {
    "use strict";
    var CollapsedBanner = function (settings) {
        var t = this,
            leafLeft = document.getElementsByClassName('leaf-left'),
            leafRight = document.getElementsByClassName('leaf-right'),
            gradient = document.getElementsByClassName('gradient'),
            txt1 = document.getElementsByClassName('txt-1'),
            puma = document.getElementsByClassName('puma'),
            txt2 = document.getElementsByClassName('txt-2'),
            txt2shadow = document.getElementsByClassName('txt-2-shadow'),
            guy = document.getElementsByClassName('guy'),
            txt3 = document.getElementsByClassName('txt-3'),
            txt3shadow = document.getElementsByClassName('txt-3-shadow'),
            flash = document.getElementsByClassName('flash'),
            endframe = document.getElementsByClassName('endframe'),
            cta = document.getElementsByClassName('cta'),
            master = new TimelineMax();
        function animation() {

            function act1() {
                var tl = new TimelineMax();
                tl.to(txt1, 0.5, {scale: 1, ease: Back.easeOut.config(1.7)});
                tl.add('start');
                tl.to(leafLeft, 0.1, {y: 1, yoyo: true, repeat: 15}, 'start');
                tl.to(leafRight, 0.1, {y: -1, yoyo: true, repeat: 15}, 'start');
                tl.to(leafLeft, 0.3, {x: '-100%'});
                tl.to(leafRight, 0.3, {x: '100%'}, '-=0.3');
                tl.to(gradient, 0.3, {opacity: 0}, 'wait1');
                tl.to(txt1, 0.3, {scale: 0}, 'wait1');
                return tl;
            }

            function act2() {
                var tl = new TimelineMax();
                tl.to(puma, 0.5, {x: 0});
                tl.add('puma');
                tl.to(puma, 2.5, {x: 20});
                tl.to(txt2, 0.5, {scale: 1, ease: Back.easeOut.config(1.7)}, 'puma');
                tl.to(txt2shadow, 0.5, {opacity: 1}, 'puma');
                tl.add('exit1');
                tl.to(puma, 0.5, {x: '-100%'}, 'exit1');
                tl.to(txt2, 0.5, {scale: 0}, 'exit1');
                tl.to(txt2shadow, 0.5, {opacity: 0}, 'exit1');
                tl.to(guy, 0.5, {x: 0});
                tl.add('guy');
                tl.to(guy, 3, {x: -15});
                tl.to(txt3, 0.5, {scale: 1, ease: Back.easeOut.config(1.7)}, 'guy');
                tl.to(txt3shadow, 0.5, {opacity: 1}, 'guy');
                return tl;
            }

            function act3() {
                var tl = new TimelineMax();
                tl.add('exit2');
                tl.to(guy, 0.3, {x: -400}, 'exit2');
                tl.to(txt3, 0.5, {scale: 0}, 'exit2');
                tl.to(txt3shadow, 0.5, {opacity: 0}, 'exit2');
                tl.to(flash, 0.3, {opacity: 1});
                tl.set(endframe, {opacity: 1});
                tl.to(flash, 0.3, {opacity: 0});
                tl.to(cta, 0.3, {y: 0});
                return tl;
            }

            master.add(act1());
            master.add(act2());
            master.add(act3());

            //cta hover
            cta[0].addEventListener('mouseenter', function () {
                TweenMax.to(cta, 0.3, {y: -5});
            });
            cta[0].addEventListener('mouseleave', function () {
                TweenMax.to(cta, 0.3, {y: 0});
            });
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
                'bg.jpg',
                'cta.png',
                'endframe.jpg',
                'guy.png',
                'leafs-left.png',
                'leafs-right.png',
                'logo.png',
                'puma.png',
                'txt-1.png',
                'txt-2-shadow.png',
                'txt-2.png',
                'txt-3-shadow.png',
                'txt-3.png'
            ]
        });
        collapsedBanner.dynamicLoad();
    };
}());