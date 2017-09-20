(function() {
    var banner = {
        cancelBubble: function(e) {
            var evt = e ? e:window.event;
            if (evt.stopPropagation)    evt.stopPropagation();
            if (evt.cancelBubble!=null) evt.cancelBubble = true;
        },
        dom: {
            expandedExit: $('#expanded-exit'),
            expandedContent: $('#expanded-state'),
            collapsedContent: $('#collapsed-state'),
            collapseButton: $('#collapse-button'),
            expandButton: $('#collapsed-state .cta'),

            //collapsed DOM

            reebokLogoFaded : $('#collapsed-state .reebok-logo-faded'),
            reebok1Faded : $('#collapsed-state .reebok-1-faded'),
            reebok2Faded : $('#collapsed-state .reebok-2-faded'),
            reebok3Faded : $('#collapsed-state .reebok-3-faded'),
            reebok4Faded : $('#collapsed-state .reebok-4-faded'),
            reebokLogo : $('#collapsed-state .reebok-logo'),
            reebok4 : $('#collapsed-state .reebok-4'),
            txt1 : $('#collapsed-state .txt-1'),
            bg : $('#collapsed-state .bg'),
            logo1 : $('#collapsed-state .logo-1'),
            logo2 : $('#collapsed-state .logo-2'),
            logo3 : $('#collapsed-state .logo-3'),
            txt2 : $('#collapsed-state .txt-2'),
            txt3 : $('#collapsed-state .txt-3'),
            cta : $('#collapsed-state .cta'),
            outline : $('#collapsed-state .outline'),
            fill : $('#collapsed-state .fill'),
            dust1 : $('#collapsed-state .dust-1'),
            dust2 : $('#collapsed-state .dust-2'),

            //expanded DOM

            detailName : $('.detail-name'),
            overlay: $('.overlay')

        },
        preInit: function () {
            //setupDom();

            if (Enabler.isInitialized()) {
                banner.init();
            } else {
                Enabler.addEventListener(
                    studio.events.StudioEvent.INIT,
                    banner.init
                );
            }
        },
        init: function () {
            Enabler.setStartExpanded(false);
            banner.addListeners();
            // Polite loading

            if (Enabler.isVisible()) {
                banner.show();
            }
            else {
                Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, banner.show);
            }
        },
        addListeners: function () {
            Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, banner.expandStartHandler);
            Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, banner.expandFinishHandler);
            Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, banner.collapseStartHandler);
            Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, banner.collapseFinishHandler);
            Enabler.addEventListener(studio.events.StudioEvent.EXIT, banner.studioExitHandler);
            banner.dom.collapsedContent.on('click', banner.onExpandHandler);
            banner.dom.collapseButton.on('click', function(e) {
                banner.cancelBubble(e);
                banner.onCollapseClickHandler();
            });
            banner.dom.expandedExit.on('click', banner.exitClickHandler,false);
        },
        studioExitHandler: function(){
            banner.onCollapseClickHandler();
        },
        show: function () {
            banner.dom.expandedContent.hide();
            banner.dom.collapsedContent.show();
            TweenLite.to(banner.dom.collapsedContent, 0.5, {alpha: 1});
            banner.collapsedAnimation(true);
        },
        expandStartHandler: function () {
            // Show expanded content.
            banner.dom.expandedContent.show();
            banner.dom.collapsedContent.hide();
            Enabler.finishExpand();
        },
        expandFinishHandler: function () {
            banner.isExpanded = true;
            banner.expandedAnimation(true);
        },
        collapseStartHandler: function () {
            // Perform collapse animation.
            banner.dom.expandedContent.hide();
            banner.dom.collapsedContent.show();
            // When animation finished must call
            Enabler.finishCollapse();
        },
        collapseFinishHandler: function () {
            banner.isExpanded = false;
        },
        onCollapseClickHandler: function () {
            /*Remove preRoll if it's around*/

            $('#html5banner').toggleClass('expanded');
            Enabler.requestCollapse();
            Enabler.stopTimer('Panel Expansion');
        },
        onExpandHandler: function () {
           
            Enabler.requestExpand();

            Enabler.startTimer('Panel Expansion');

            $('#html5banner').toggleClass('expanded');
        },
        exitClickHandler: function () {
            Enabler.requestCollapse();
            Enabler.stopTimer('Panel Expansion');
            Enabler.exit('Expanded Exit');
        },
        collapsedAnimation: function () {
            function scene1(){
                TweenLite.to(banner.dom.reebokLogo, 0.1, {opacity:0.5});
                TweenLite.to(banner.dom.reebokLogo, 0.1, {opacity:0, delay: 0.2});
                TweenLite.to(banner.dom.reebokLogo, 0.1, {opacity:0.7, delay: 0.3});
                TweenLite.to(banner.dom.reebok4, 0.1, {opacity:0, delay: 0.4});
                TweenLite.to(banner.dom.reebok4, 0.1, {opacity:1, delay: 0.5});
                TweenLite.to(banner.dom.reebokLogo, 0.1, {opacity:0.7, delay:0.6});
                TweenLite.to(banner.dom.reebokLogo, 0.1, {opacity:0.5, delay:0.7});
                TweenLite.to(banner.dom.reebokLogo, 0.1, {opacity:0, delay:0.8});
                TweenLite.to(banner.dom.reebokLogoFaded, 0.1, {opacity:0.7, delay:0.9});
                TweenLite.to(banner.dom.reebokLogoFaded, 0.1, {opacity:0, delay:1});
                TweenLite.to(banner.dom.reebokLogoFaded, 0.1, {opacity:0.5, delay:1.1});
                TweenLite.to(banner.dom.reebokLogoFaded, 0.1, {opacity:1, delay:1.2});
                TweenLite.to(banner.dom.reebokLogoFaded, 0.1, {opacity:0.8, delay:1.3});
                TweenLite.to(banner.dom.reebok4Faded, 0.1, {opacity:0, delay: 1.4});
                TweenLite.to(banner.dom.reebok4Faded, 0.1, {opacity:1, delay: 1.5});
                TweenLite.to([banner.dom.reebok1Faded, banner.dom.reebok4Faded, banner.dom.reebok2Faded], 0.1, {opacity:0, delay: 1.6});
                TweenLite.to(banner.dom.reebok3Faded, 0.1, {opacity:0, delay: 1.7});
                TweenLite.to(banner.dom.reebok1Faded, 0.1, {opacity:1, delay: 1.7});
                TweenLite.to(banner.dom.reebok1Faded, 0.1, {opacity:0, delay: 1.8});
                TweenLite.delayedCall(2.3, scene2);
            }
            function scene2(){
                TweenLite.to(banner.dom.txt1, 0.1, {opacity:0.7});
                TweenLite.to(banner.dom.txt1, 0.1, {opacity:0.3, delay: 0.2});
                TweenLite.to(banner.dom.txt1, 0.1, {opacity:1, delay: 0.3});
                TweenLite.to(banner.dom.txt1, 0.1, {opacity:0.3, delay: 1.4});
                TweenLite.to(banner.dom.txt1, 0.1, {opacity:1, delay: 1.5});
                TweenLite.to(banner.dom.txt1, 0.1, {opacity:0, delay: 1.6});
                TweenLite.delayedCall(1.9, scene3);               
            }

            function scene3(){
                TweenLite.to([banner.dom.bg, banner.dom.logo1, banner.dom.dust1, banner.dom.dust2], 0.6, {opacity:1});
                TweenLite.to(banner.dom.bg, 5, {x:-22});
                TweenLite.to(banner.dom.dust1, 7, {x:-80, y:-30, ease: Power4.easeOut});
                TweenLite.to(banner.dom.dust2, 7, {x:-40, y:-60, ease: Power4.easeOut});
                TweenLite.to(banner.dom.bg, 0.1, {opacity:0.3, delay:0.2});
                TweenLite.to(banner.dom.bg, 0.1, {opacity:1, delay:0.3});
                TweenLite.to(banner.dom.bg, 0.1, {opacity:0.5, delay:0.4});
                TweenLite.to(banner.dom.bg, 0.1, {opacity:1, delay:0.5});
                TweenLite.to(banner.dom.txt2, 0.3, {opacity:1, delay:1.1});
                TweenLite.to(banner.dom.txt3, 0.3, {opacity:1, delay:1.8});
                TweenLite.to([banner.dom.cta, banner.dom.logo3], 0.3, {opacity:1, delay: 2.5});
                TweenLite.to(banner.dom.logo2, 0.3, {opacity:1, delay: 3.1});
                TweenLite.to(banner.dom.outline, 0.3, {opacity:1, delay: 3.4});
                TweenLite.to(banner.dom.fill, 0.1, {opacity:0.7, delay: 3.8});
                TweenLite.to(banner.dom.fill, 0.1, {opacity:0.3, delay: 3.9});
                TweenLite.to(banner.dom.fill, 0.1, {opacity:1, delay: 4});
            }
           scene1();
        },
        expandedAnimation: function () {

            banner.dom.detailName.on('click', function(){

                    if(banner.dom.expandedContent.attr('class') == null){
                        currentDetail = 0;
                    }else{
                        currentDetail = banner.dom.expandedContent.attr('class').substr(banner.dom.expandedContent.attr('class').length - 1)
                    }
                    
                    banner.dom.expandedContent.attr('class', '');

                    if(!(currentDetail == $(this).data('detail'))){
                        banner.dom.expandedContent.addClass('detail-show-' + $(this).data('detail'));
                    }      

            });
            banner.dom.overlay.on('click', function(){
                banner.dom.expandedContent.attr('class', '');
            })


        }
    };
    window.addEventListener('load', banner.preInit);
})();