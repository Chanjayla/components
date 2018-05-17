function SliderObj(config) {
    this.position = 0;
    this.mousePos = {
        downX: 0,
        upX: 0
    }
    this.timer = null;
    this.init(config);
}

SliderObj.prototype = {
    init: function(config) {
        var defaultConfig = {
            imgNum: 0,
            imgArr: [],
            focusStyle: '',
            blurStyle: '',
            boxId: ''
        };
        for (var i in defaultConfig) {
            if (!config[i]) {
                config[i] = defaultConfig[i];
            }
        }
        this.config = config;
        document.getElementById(this.config.boxId).className = 'slider-box';
        document.getElementById(this.config.eventPanel).className = 'slider-event-panel';
        this.createElement();
        this.timer = setInterval(() => {
             this.switch(1);
        }, 5000);
        this.addMouseEvent();
    },
    createElement: function() {
        var htmlStr = '';
        if (this.config.imgNum >= 3) {
            htmlStr += '<div id="img'+(this.config.imgNum-1)+'" class="left-img"><img src="' + this.config.imgArr[this.config.imgNum-1] + '"></div>';
            htmlStr += '<div id="img0" class="middle-img"><img src="' + this.config.imgArr[0] + '"></div>';
            htmlStr += '<div id="img1" class="right-img"><img src="' + this.config.imgArr[1] + '"></div>';
            for (var i = 2; i < this.config.imgNum-1; ++i) {
                htmlStr += '<div id="img' + i + '" class="behind-img"><img src="' + this.config.imgArr[i] + '"></div>';
            }
            document.getElementById(this.config.boxId).innerHTML = htmlStr;
        }
        this.createPagation();
    },
    createPagation: function() {
        var htmlStr = '';
        for(var i=0;i<this.config.imgNum;++i) {
            if(i!==this.position) {
                htmlStr += '<span id="page_dot_'+i+'" onclick="globalApi.sliderObj.switchPage('+i+')"></span>';
            } else {
                htmlStr += '<span id="page_dot_'+i+'" onclick="globalApi.sliderObj.switchPage('+i+')" class="page-active"></span>';
            }
        }
        document.getElementById(this.config.pageId).innerHTML = htmlStr;
    },
    switch: function(_step) {
        document.getElementById('page_dot_'+this.position).className = '';
        if (_step < 0) {
            document.getElementById('img' + (this.position + 1 > this.config.imgNum - 1 ? 0 : this.position + 1)).className = 'behind-img';
            this.position = this.position - 1 < 0 ? this.config.imgNum - 1 : this.position - 1;
        } else {
            document.getElementById('img' + (this.position - 1 < 0 ? this.config.imgNum - 1 : this.position - 1)).className = 'behind-img';
            this.position = this.position + 1 > this.config.imgNum - 1 ? 0 : this.position + 1;
        }
        document.getElementById('page_dot_'+this.position).className = 'page-active';
        document.getElementById('img' + this.position).className = 'middle-img';
        document.getElementById('img' + (this.position - 1 < 0 ? this.config.imgNum - 1 : this.position - 1)).className = 'left-img';
        document.getElementById('img' + (this.position + 1 > this.config.imgNum - 1 ? 0 : this.position + 1)).className = 'right-img';
        this.restartLoop();
    },
    switchPage: function(index) {
        this.stopLoop();
        document.getElementById('page_dot_'+this.position).className = '';
        this.position = index;
        document.getElementById('page_dot_'+this.position).className = 'page-active';
        for(var i=0;i<this.config.imgNum;++i) {
            if(i===this.position) {
                document.getElementById('img'+i).className = 'middle-img';
            } else if(i===this.position-1 || (this.position===0&&i===this.config.imgNum-1)) {
                document.getElementById('img'+i).className = 'left-img';
            } else if(i===this.position+1 || (this.position===this.config.imgNum-1&&i===0)) {
                document.getElementById('img'+i).className = 'right-img';
            } else {
                document.getElementById('img'+i).className = 'behind-img';
            }
       }
       this.restartLoop();
    },
    stopLoop: function() {
        clearTimeout(this.timer);
    },
    restartLoop: function() {
        clearTimeout(this.timer);
        this.timer = setInterval(() => {
            this.switch(1);
       }, 5000);
    },
    addMouseEvent: function() {
        document.getElementById(this.config.eventPanel).onmousedown = (event) => {
            this.mousePos.upX = 0;
            this.mousePos.downX = event.clientX;
        };
        document.getElementById(this.config.eventPanel).onmouseup = (event) => {
            this.mousePos.upX = event.clientX;
            if (this.mousePos.upX - this.mousePos.downX > 30) {
                this.switch(-1);
            } else if (this.mousePos.upX - this.mousePos.downX < -30) {
                this.switch(1);
            }
        };
    }
}
