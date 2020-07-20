var screenAnimateElement={
    '.screen-1':[
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow'
    ],
    '.screen-2':[
        '.screen-2__point',
        '.screen-2__point_i_1',
        '.screen-2__point_i_2',
        '.screen-2__point_i_3',
        '.screen-2__phone',
        '.screen-2__subheading',
        '.screen-2__heading'
    ],
    '.screen-3':[
        '.screen-3__phone',
        '.screen-3__features',
        '.screen-3__subheading',
        '.screen-3__heading'

    ],
    '.screen-4':[
        '.screen-4__subheading',
        '.screen-4__heading',
        '.screen-4__type__item_i_1',
        '.screen-4__type__item_i_2',
        '.screen-4__type__item_i_3',
        '.screen-4__type__item_i_4'
    ],
    '.screen-5':[
        '.screen-5__subheading',
        '.screen-5__bg',
        '.screen-5__heading'
    ]
}

function setScreenAnimate(screenCls){
    var screen=document.querySelector(screenCls);
    var animateElements=screenAnimateElement[screenCls];
    var isSetAnimateClass=false;//是否初始化子元素的样式
    var isAnimateDone=false;//当前屏幕下所有子元素的状态是否是done？

    screen.onclick=function() {
        //从A→init
        if(isSetAnimateClass===false){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute('class');
                element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_play_init');
            }
            isSetAnimateClass=true;
            return;
        }

        //从init→done
        if(isAnimateDone===false){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute('class');
                element.setAttribute('class',baseCls.replace('_play_init','_play_done'));
            }
            isAnimateDone=true;
            return;
        }

        //从done→init
        if(isAnimateDone===true){
            for(var i=0;i<animateElements.length;i++){
                var element=document.querySelector(animateElements[i]);
                var baseCls=element.getAttribute('class');
                element.setAttribute('class',baseCls.replace('_play_done','_play_init'));
            }
            isAnimateDone=false;
            return;
        }
    }
}

setScreenAnimate('.screen-5');