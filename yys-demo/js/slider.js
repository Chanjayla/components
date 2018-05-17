function SliderObj(config) {
    this.position = 1;
    this.mousePos = {
        downX: 0,
        upX: 0
    }
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
        $(this.config.boxId).className = 'slider-box';
        $(this.config.eventPanel).className = 'slider-event-panel';
        this.createElement();
        // setInterval(() => {
        //     this.switch(1);
        // }, 1000);
        this.addMouseEvent();
    },
    createElement: function() {
        var htmlStr = '';
        if (this.config.imgNum >= 3) {
            htmlStr += '<div id="img0" class="left-img"><img src="' + this.config.imgArr[0] + '"></div>';
            htmlStr += '<div id="img1" class="middle-img"><img src="' + this.config.imgArr[1] + '"></div>';
            htmlStr += '<div id="img2" class="right-img"><img src="' + this.config.imgArr[2] + '"></div>';
            for (var i = 3; i < this.config.imgNum; ++i) {
                htmlStr += '<div id="img' + i + '" class="behind-img"><img src="' + this.config.imgArr[i] + '"></div>';
            }
            $(this.config.boxId).innerHTML = htmlStr;
        }
    },
    switch: function(_step) {
        if (_step < 0) {
            $('img' + (this.position + 1 > this.config.imgNum - 1 ? 0 : this.position + 1)).className = 'behind-img';
            this.position = this.position - 1 < 0 ? this.config.imgNum - 1 : this.position - 1;

        } else {
            $('img' + (this.position - 1 < 0 ? this.config.imgNum - 1 : this.position - 1)).className = 'behind-img';
            this.position = this.position + 1 > this.config.imgNum - 1 ? 0 : this.position + 1;
        }
        $('img' + this.position).className = 'middle-img';
        $('img' + (this.position - 1 < 0 ? this.config.imgNum - 1 : this.position - 1)).className = 'left-img';
        $('img' + (this.position + 1 > this.config.imgNum - 1 ? 0 : this.position + 1)).className = 'right-img';
    },
    addMouseEvent: function() {
        $(this.config.eventPanel).onmousedown = (event) => {
            this.mousePos.upX = 0;
            this.mousePos.downX = event.clientX;
        };
        $(this.config.eventPanel).onmouseup = (event) => {
            this.mousePos.upX = event.clientX;
            if (this.mousePos.upX - this.mousePos.downX > 30) {
                this.switch(-1);
            } else if (this.mousePos.upX - this.mousePos.downX < -30) {
                this.switch(1);
            }
        };
    }
}

function $(id) {
    return document.getElementById(id);
}