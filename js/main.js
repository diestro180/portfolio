(function () {
    "use strict";
    var Portfolio = function () {
        var //$bg = document.getElementsByClassName('background')[0],
            $bgSvg = document.getElementById('background-animation'),
            $bgCircle = document.getElementById('background-animation__circle'),
            $bgSquare = document.getElementById('background-animation__square'),
            $menuIcon = document.getElementById('menu-icon'),
            $menuLineNemu = document.getElementsByClassName('menu-icon-line__menu'),
            $menuLineClose = document.getElementsByClassName('menu-icon-line__close'),
            $menuItem = document.getElementsByClassName('menu-item'),
            // $sectionMain = document.getElementsByClassName('section-main'),
            $sectionWork = document.getElementsByClassName('section__work'),
            $sectionAbout = document.getElementsByClassName('section__about'),
            $sectionContact = document.getElementsByClassName('section__contact'),
            $sections = document.getElementsByClassName('section'),
            menuOpen = false;

        this.bindEvents = function () {
            var i = 0,
                menuClick = document.createEvent('Event');
            menuClick.initEvent('menuClick', true, true);

            //background control
            function openSection(e) {
                var scale = window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth,
                    color = null,
                    section = null,
                    tl = new TimelineMax();
                switch (e.target.dataset.section) {
                case "work":
                    color = '#fec133';
                    section = $sectionWork;
                    break;
                case "about":
                    color = '#9724a7';
                    section = $sectionAbout;
                    break;
                case "contact":
                    color = '#17265f';
                    section = $sectionContact;
                    break;
                }

                e.target.dispatchEvent(menuClick);

                tl.set($bgSquare, {morphSVG: $bgCircle, fill: color});
                tl.to($bgSquare, 1, {morphSVG: $bgSquare});
                tl.to($bgSvg, 0.5, {scale: (scale / 144)}, '-=0.5');
                tl.set($sections, {autoAlpha: 0, zIndex: 1});
                tl.set(section, {autoAlpha: 5});
                tl.to($bgSvg, 0.5, {autoAlpha: 0});
                tl.set($bgSvg, {scale: 0, autoAlpha: 1});
            }

            for (i; i < $menuItem.length; i++) {
                $menuItem[i].addEventListener('click', openSection);
            }

            //menu control
            $menuIcon.addEventListener('click', function () {
                if (menuOpen) {
                    TweenMax.to($menuLineClose, 0.1, {drawSVG: "50% 50%"});
                    TweenMax.to($menuLineNemu, 0.1, {drawSVG: "0% 100%"});
                    TweenMax.staggerTo($menuItem, 0.1, {x: "0%"}, 0.1);
                    menuOpen = false;
                } else {
                    TweenMax.to($menuLineNemu, 0.1, {drawSVG: "50% 50%"});
                    TweenMax.to($menuLineClose, 0.1, {drawSVG: "0% 100%"});
                    TweenMax.staggerTo($menuItem, 0.1, {x: "140%"}, 0.1);
                    menuOpen = true;
                }
            });
        };
        this.init = function () {
            TweenMax.set($menuLineClose, {drawSVG: "50% 50%"});
            TweenMax.to($bgSquare, 0.5, {morphSVG: $bgCircle, delay: 0.5});
            TweenMax.to($bgSvg, 1, {scale: 0});
            this.bindEvents();

        };
    };

    window.onload = function () {
        var portfolio = new Portfolio();

        portfolio.init();
    };
}());


(function () {
    "use strict";
    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width / 2, y: height / 2};

        largeHeader = document.getElementsByClassName('section__main')[0];
        largeHeader.style.height = height + 'px';

        canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        var x,
            y,
            i,
            j,
            k,
            c,
            m,
            px,
            py,
            p,
            closest,
            p1,
            p2,
            placed;

        // Util
        function getDistance(p1, p2) {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        }

        function Circle(pos, rad, color) {
            var that = this;

            // constructor
            (function () {
                that.pos = pos || null;
                that.radius = rad || null;
                that.color = color || null;
            }());

            this.draw = function () {
                if (!that.active) {
                    return;
                }
                ctx.beginPath();
                ctx.arc(that.pos.x, that.pos.y, that.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(156,217,249,' + that.active + ')';
                ctx.fill();
            };
        }

        // create points
        points = [];
        for (x = 0; x < width; x = x + width / 20) {
            for (y = 0; y < height; y = y + height / 20) {
                px = x + Math.random() * width / 20;
                py = y + Math.random() * height / 20;
                p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for (i = 0; i < points.length; i++) {
            closest = [];
            p1 = points[i];
            for (j = 0; j < points.length; j++) {
                p2 = points[j];
                if (!(p1 === p2)) {
                    placed = false;
                    for (k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] === undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (k = 0; k < 5; k++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }


        // assign a circle to each point
        for (m = 0; m < points.length; m++) {
            c = new Circle(points[m], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
            points[m].circle = c;
        }
    }

    function mouseMove(e) {
        var posx, posy;
        posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if (document.body.scrollTop > height) {
            animateHeader = false;
        } else {
            animateHeader = true;
        }
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    // Event handling
    function addListeners() {
        if (!(window.hasOwnProperty('ontouchstart'))) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
        window.addEventListener('menuClick', function () {
            animateHeader = false;
        });
    }

    // animation

    // Canvas manipulation
    function drawLines(p) {
        var i;
        if (!p.active) {
            return;
        }
        for (i = 0; i < p.closest.length; i++) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
            ctx.stroke();
        }
    }

    function animate() {

        // Util
        function getDistance(p1, p2) {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        }

        var i;
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (i = 0; i < points.length; i++) {
                // detect points in range
                if (Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        var time = 1 + Math.random();
        TweenMax.to(p, time, {x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100, ease: Circ.easeInOut,
            onComplete: function () {
                shiftPoint(p);
            }});
    }

    function initAnimation() {
        var i;
        animate();
        for (i = 0; i < points.length; i++) {
            shiftPoint(points[i]);
        }
    }

    // Main
    initHeader();
    initAnimation();
    addListeners();

}());