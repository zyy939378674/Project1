/*封装常用函数，简便使用*/
/**查找元素 */
var getElem=function (selector) {
    return document.querySelector(selector);
}

/**查找全部元素 */
var getAllElem=function (selector) {
    return document.querySelectorAll(selector);
}

/*获取元素的样式 */
var getCls=function(element){
    return element.getAttribute('class');
}

/*设置元素的样式 */
var setCls=function(element,cls){
    return element.setAttribute('class',cls);
}

/**给元素添加样式 */
var addCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls) === -1){
        setCls(element,baseCls+' '+cls)
    }
}

/**删除元素样式 */
var delCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)>1){
        setCls(element,baseCls.split(cls).join(' ').replace(/s+/g,' '));
    }
}

//页面载入完成后，所有动画初始化
var screenAnimateElements={
    '.screen-1':[
        '.screen-1__heading',
        
    ],
    '.screen-2':[
        '.screen-2__work__date',
        '.screen-2_right',
        '.screen-2__heading'
    ],
    '.screen-3':[
        '.screen-3__heading',
        '.screen-3__content__left',
        '.screen-3__content__right',
        '.screen-3__footer',
        '.screen-3__content__progress__bar_1',
        '.screen-3__content__progress__bar_2',
        '.screen-3__content__progress__bar_3',
        '.screen-3__content__progress__bar_4',
        '.screen-3__content__progress__bar_5',
        '.screen-3__content__progress__bar_6'
    ],
    '.screen-4':[
        '.screen-4__heading',
    ]
}

var navItems=document.querySelectorAll('.header_wrap__nav-item');
var outLineItems=document.querySelectorAll('.outline__nav-item');
var bannerH2=document.querySelector('.banner__content__right__h2');
var bannerH2Animate=bannerH2.getAttribute('class');

//banner部分Hello动画设置
 setInterval(function(){
    if(getCls(bannerH2).indexOf('banner__content__right__h2_init')>-1){
        bannerH2.setAttribute('class',bannerH2Animate.replace('_init','_done'));
    }else{
        bannerH2.setAttribute('class',bannerH2Animate+' '+bannerH2Animate+'_init');
    }
   
},1000);


//初始化函数，播放函数设置
var setScreenAnimateInit = function(screenCls){
    var animateElements=screenAnimateElements[screenCls];
    
    for(var i=0;i<animateElements.length;i++){
        var element=document.querySelectorAll(animateElements[i]);
        if(element.length==="1"){
            var baseCls=element.getAttribute('class');
            element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_play_init');
        }else{
            for(var j=0;j<element.length;j++){
                var baseCls=element[j].getAttribute('class');
                element[j].setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_play_init');
            }
        }
        
    }
}
setScreenAnimateInit('.screen-1');
var playScreenAnimateDone=function(screenCls){
    var animateElements=screenAnimateElements[screenCls];
    
    for(var i=0;i<animateElements.length;i++){
        var element=document.querySelectorAll(animateElements[i]);
        if(element.length==="1"){
            var baseCls=element.getAttribute('class');
            element.setAttribute('class',baseCls.replace('_play_init','_play_done'));
        }else{
            for(var j=0;j<element.length;j++){
                var baseCls=element[j].getAttribute('class');
                element[j].setAttribute('class',baseCls.replace('_play_init','_play_done'));
            }
        }
        
       
    }
}

//加载事件，滚动事件
window.onload=function(){
    for(k in screenAnimateElements){
        if(k == '.screen-1'){
            continue;
          }
          setScreenAnimateInit(k);
    }
    

}
setTimeout(function(){playScreenAnimateDone('.screen-1');},100)

//点击导航条跳转到相应界面
var setNavJump=function(i,lib){
    lib[i].addEventListener('click',function(){
        document.documentElement.scrollTop=469+i*800||(document.body.scrollTop=469+i*800);
    })
}
for(var i=0;i<navItems.length;i++){
    setNavJump(i,navItems);
    
}
for(var i=0;i<outLineItems.length;i++){
    setNavJump(i,outLineItems);
}

//点击相应导航条变红
var  switchNavItemsActive=function(index){
    for(var i=0;i<navItems.length;i++){
        delCls(navItems[i],'header_wrap__nav-item_status_active');
    }
    addCls(navItems[index],'header_wrap__nav-item_status_active');

    for(var i=0;i<outLineItems.length;i++){
        delCls(outLineItems[i],'outline__nav-item_status_active');
    }
    addCls(outLineItems[index],'outline__nav-item_status_active');
}

//鼠标滚动事件
window.onscroll=function(){ 
    var top=document.documentElement.scrollTop||document.body.scrollTop;
    console.log(top);
    if(top>384){
        addCls(getElem('.header'),'header_status_back');
        addCls(getElem('.outline'),'outline_status_in');
        switchNavItemsActive(0);
    }else{
        delCls(getElem('.header'),'header_status_back');
        delCls(getElem('.outline'),'outline_status_in');
    }
    if(top>1124){
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
    }
    if(top>(1985-100)){
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2);
    }
    if(top>(2785-100)){
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3);
    }
    if(top>(3585-100)){
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4);
    }
    setTip();
}

//导航滑动门特效
var navTip=getElem('.header_nav-tip');
var activeIndex=0;
var setTip=function(){
    for(var i=0;i<navItems.length;i++){
        if(navItems[i].getAttribute('class').indexOf('header_wrap__nav-item_status_active')>-1){
            activeIndex=i;
            break;
        }
    }
    navTip.style.left=(activeIndex*226)+'px';
} 
for(let i=0;i<navItems.length;i++){
    navItems[i].onmouseover=function(){
        navTip.style.left=(i*226)+'px';
    }

    navItems[i].onmouseout=function(){
        setTip();
    }
}