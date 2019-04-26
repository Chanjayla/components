(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {  
            var clientWidth = docEl.clientWidth;       
            if (!clientWidth) return;
            var size =  clientWidth / 7.5;
            docEl.style.fontSize = (size>70?70:size) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  
})(document, window);