(function () {
    "use strict";
    var Portfolio = function () {
        var $scrollLinks = document.getElementsByClassName('scroll__link'),
            $iframes = document.getElementsByClassName('campaign__iframe'),
            $campaignLink = document.getElementsByClassName('link__campaign'),
            iframesLink = ['banners/lego', 'banners/adidas', 'banners/reebok'];
        this.bindEvents = function () {

            var i = 0,
                j = 0;

            function scrollToSection(e) {
                e.preventDefault();
                var dest = document.getElementsByClassName(e.target.dataset.section)[0].offsetTop;
                TweenMax.to(window, 1, {scrollTo: {y: dest}});
            }

            function campaignClick(e) {
                $iframes[e.target.dataset.campaign].src = iframesLink[e.target.dataset.campaign];
                TweenMax.to($iframes[e.target.dataset.campaign], 0.3, {autoAlpha: 1});
            }

            for (i; i < $scrollLinks.length; i++) {
                $scrollLinks[i].addEventListener('click', scrollToSection);
            }

            for (j; j < $campaignLink.length; j++) {
                $campaignLink[j].addEventListener('click', campaignClick);
            }
        };

        this.instafeed = function () {
            var feed = new Instafeed({
                get: 'user',
                userId: '29586907',
                clientId: '6be499327b054e889399f69adbed21a1',
                accessToken: '29586907.6be4993.bfabd07a67c9494bb786d9b3114afc48',
                resolution: 'standard_resolution',
                limit: 3,
                template: '<div class="insta-feed--container"><img class="insta-feed--image" src="{{image}}" /></div>'
            });
            feed.run();
        };


        this.init = function () {
            this.bindEvents();
            this.instafeed();
        };
    };

    window.onload = function () {
        var portfolio = new Portfolio();
        portfolio.init();
    };
}());


(function () {
    "use strict";
    var width, height, canvas, ctx, points, target, animateHeader = true;

    function initHeader() {
        width = window.outerWidth;
        height = window.outerHeight;
        target = {x: width / 2, y: height / 2};

        canvas = document.getElementById('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        var x, y, i, j, k, c, m, px, py, p, closest, p1, p2, placed;

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

    function scrollCheck() {
        if (document.body.scrollTop > height) {
            animateHeader = false;
        } else {
            animateHeader = true;
        }
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
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