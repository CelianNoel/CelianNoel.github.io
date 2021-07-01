/* global AFRAME */
AFRAME.registerComponent('envscore', {
    schema: {
      htmlSrc: {type: 'selector'},
      startOpened: {default: false},
      totalScore: {type: 'int', default: 0}
    },
    init: function () {

      var sceneEl = this.el.sceneEl;
      var messageEl = this.messageEl = document.createElement('div');
      var startOpened = this.data.startOpened;
      this.toggleInfoMessage = this.toggleInfoMessage.bind(this);
  
      messageEl.classList.add('a-score-pop-up');
      messageEl.setAttribute('aframe-injected', '');
  
      var closeButtonEl = this.closeButtonEl = document.createElement('button');
      closeButtonEl.innerHTML = 'X';
      closeButtonEl.classList.add('a-close-button-info');
      closeButtonEl.onclick = this.toggleInfoMessage;
  
      this.createScoresButton(this.toggleInfoMessage);
  
      this.addStyles();
      sceneEl.appendChild(messageEl);
  
      this.messageEl.style.display = startOpened ? '' : 'none';
      this.infoButton.style.display = startOpened ? 'none' : '';
    },
  
    update: function () {
      var messageEl = this.messageEl;
      messageEl.innerHTML = this.data.htmlSrc.data;
      messageEl.appendChild(this.closeButtonEl);
    },
  
    addStyles: function () {
      var css =
       // '@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css);' +

       '@import url(https://kit.fontawesome.com/200bb4af22.js);' +
        '.a-score-pop-up{border-radius: 25px; position: absolute; width: 400px;' +
        'height: 600px; background-color: white; border: 0px solid rgba(0,0,0,.75);' +
        'top: 100px; left: 50px; color: rgb(51, 51, 51); padding: 20px 15px 0 15px;' +
        'font-size: 11pt; line-height: 20pt;}' +
  
        '.a-score-pop-up a{border-bottom: 1px solid rgba(53,196,232,.15); color: #1497b8;' +
        'position: relative; text-decoration: none; transition: .05s ease;}' +
          
        '@media only screen and (min-width: 1200px) {' +
        '.a-score-pop-up {font-size: 12pt}}' +
  
        '@media only screen and (max-width: 600px) {' +
        '.a-score-pop-up {left: 20px; right: 20px; bottom: 60px; width: auto}}' +
          
        '@media only screen and (max-height: 600px) {' +
        '.a-score-pop-up {left: 20px; bottom: 20px; height: 250px}}' +
  
        '.a-close-button-info{width: 25px; height: 25px; padding: 0;' +
        'top: 15px; right: 15px; position: absolute; color: #404040; background-color: white;'  +
        'font-size: 30px; line-height: 12px; border: none;' +
        'border-radius: 5px; font-weight: medium}' +
  
        '.a-close-button-info:hover{ color:  #080808}' +
        '.a-scores-container {position: absolute; top: 25px; left: 20px; }' +
        
        '.a-env-score-button {background: rgba(0, 0, 0, 0); color: #92d050; min-width: 58px; min-height: 34px; border-radius: 8px; border: 0px solid #92d050; font-size: 30px; padding: 10px; font-weight: bold; cusor: pointer;}'+
        '.a-env-score-button:hover {color: #68a12b;}'+
        '.a-env-score-button:before { content: "\\f4d8"; display: inline-block; font: normal normal normal 14px/1 FontAwesome;  font-size: inherit;  text-rendering: auto; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }'
        ;

      var style = document.createElement('style');
  
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
  
      document.getElementsByTagName('head')[0].appendChild(style);
    },
  
    toggleInfoMessage: function () {
        var display = this.messageEl.style.display;
        var socScoreButton = document.querySelector('.a-soc-score-pop-up');
        if (display == 'none' && socScoreButton.style.display == '') {
          this.messageEl.style.display = '';
          socScoreButton.style.display = 'none';
        }
        else {
          display = display === 'none' ? '' : 'none';
          this.messageEl.style.display = display;
        }
    },
  
    createScoresButton: function (onClick) {
      var infoButton;
      var wrapper;
  
      // Create elements.
      wrapper = document.createElement('div');
      wrapper.classList.add('a-scores-container');
      this.infoButton = infoButton = document.createElement('button');
      //infoButton.className = 'a-info-message-button';
      infoButton.className = 'a-env-score-button';
      //infoButton.innerText = " 97";
      infoButton.innerText = " " + this.data.totalScore;
      infoButton.setAttribute('title', 'Environmental impact score');
      // Insert elements.
      wrapper.appendChild(infoButton);
      infoButton.addEventListener('click', function (evt) {
        onClick();
        evt.stopPropagation();
      });
      this.el.sceneEl.appendChild(wrapper);
    },

    updateScore: function (part, value) {
      this.data.totalScore = value;
      //console.log(this.data.totalScore);
      this.infoButton.innerText = " " + this.data.totalScore;

      var score = document.querySelector('.env-score');
      score.innerHTML = this.data.totalScore;
    },
  });
  