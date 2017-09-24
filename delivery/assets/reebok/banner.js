(function() {
    var banner = {
        imgArray:null,
        oImg:null,
        loadcount:1,
        dom: {
            //collapsed DOM
            reebokLogoFaded : document.getElementsByClassName('reebok-logo-faded'),
            reebok1Faded : document.getElementsByClassName('reebok-1-faded'),
            reebok2Faded : document.getElementsByClassName('reebok-2-faded'),
            reebok3Faded : document.getElementsByClassName('reebok-3-faded'),
            reebok4Faded : document.getElementsByClassName('reebok-4-faded'),
            reebokLogo : document.getElementsByClassName('reebok-logo'),
            reebok1 : document.getElementsByClassName('reebok-1'),
            reebok2 : document.getElementsByClassName('reebok-2'),
            reebok3 : document.getElementsByClassName('reebok-3'),
            reebok4 : document.getElementsByClassName('reebok-4'),
            txt1 : document.getElementsByClassName('txt-1'),
            bg : document.getElementsByClassName('bg'),
            logo1 : document.getElementsByClassName('logo-1'),
            logo2 : document.getElementsByClassName('logo-2'),
            txt2 : document.getElementsByClassName('txt-2'),
            cta : document.getElementsByClassName('cta'),
            outline : document.getElementsByClassName('outline'),
            fill : document.getElementsByClassName('fill'),
            dust1 : document.getElementsByClassName('dust-1'),
            dust2 : document.getElementsByClassName('dust-2')

        },
        init: function () {
            banner.imgArray = [
                'img/bg.jpg',
                'img/cta.png',
                'img/dust-1.png',
                'img/dust-2.png',
                'img/logo-1.png',
                'img/logo-2.png',
                'img/reebok-1-faded.png',
                'img/reebok-1.png',
                'img/reebok-2-faded.png',
                'img/reebok-2.png',
                'img/reebok-3-faded.png',
                'img/reebok-3.png',
                'img/reebok-4-faded.png',
                'img/reebok-4.png',
                'img/txt-1.png',
                'img/txt-2.png'
            ];
            banner.dynamicLoad(banner.imgArray);
        },
        dynamicLoad: function(imgArray){
          //this function will check to see if certain images on the screen have loaded.
          //Once they've loaded, we fade in the banner
          var newImgArray = [];
          banner.oImg = '';
          for(var i = 0; banner.imgArray.length > i; i++){
            var imgSrc = banner.imgArray[i];
            banner.oImg = new Image();
            banner.oImg.src = imgSrc;
            banner.oImg.onload = banner.onDynamicImgLoad;
            newImgArray.push(banner.oImg);
          }
        },
        onDynamicImgLoad: function(){
          if((banner.imgArray.length) == banner.loadcount){
            banner.animation();
          }
          banner.loadcount = banner.loadcount+1;
        },
        animation: function () {
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
                TweenLite.to(banner.dom.bg, 5, {x:-11});
                TweenLite.to(banner.dom.dust1, 7, {x:-80, y:-30, ease: Power4.easeOut});
                TweenLite.to(banner.dom.dust2, 7, {x:-40, y:-60, ease: Power4.easeOut});
                TweenLite.to(banner.dom.bg, 0.1, {opacity:0.3, delay:0.2});
                TweenLite.to(banner.dom.bg, 0.1, {opacity:1, delay:0.3});
                TweenLite.to(banner.dom.bg, 0.1, {opacity:0.5, delay:0.4});
                TweenLite.to(banner.dom.bg, 0.1, {opacity:1, delay:0.5});
                TweenLite.to(banner.dom.txt2, 0.3, {opacity:1, delay:1.1});
                TweenLite.to(banner.dom.cta, 0.3, {opacity:1, delay: 2});
                TweenLite.to(banner.dom.logo2, 0.3, {opacity:1, delay: 2.6});
                TweenLite.to(banner.dom.outline, 0.3, {opacity:1, delay: 2.9});
                TweenLite.to(banner.dom.fill, 0.1, {opacity:0.7, delay: 3.3});
                TweenLite.to(banner.dom.fill, 0.1, {opacity:0.3, delay: 3.4});
                TweenLite.to(banner.dom.fill, 0.1, {opacity:1, delay: 3.5});
            }

           scene1();

        }
    };
    window.onload = function() {
        banner.init();
    }
})();