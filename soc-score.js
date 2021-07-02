/* global AFRAME */
AFRAME.registerComponent('socscore', {
    schema: {
      htmlSrc: {type: 'selector'},
      startOpened: {default: false}
    },
    init: function () {

      var sceneEl = this.el.sceneEl;
      var messageEl = this.messageEl = document.createElement('div');
      var startOpened = this.data.startOpened;
      var socButton = this.socButton = document.createElement('button');
      this.toggleInfoMessage = this.toggleInfoMessage.bind(this);
  
      messageEl.classList.add('a-soc-score-pop-up');
      messageEl.setAttribute('aframe-injected', '');
  
      var closeButtonEl = this.closeButtonEl = document.createElement('button');
      closeButtonEl.innerHTML = 'X';
      closeButtonEl.classList.add('a-close-button-info');
      closeButtonEl.onclick = this.toggleInfoMessage;
  
      this.createScoresButton(this.toggleInfoMessage);
  
      this.addStyles();
      sceneEl.appendChild(messageEl);
  
      this.messageEl.style.display = startOpened ? '' : 'none';
      this.socButton.style.display = startOpened ? 'none' : '';
    },
  
    update: function () {
      var messageEl = this.messageEl;
      messageEl.innerHTML = this.data.htmlSrc.data;
      messageEl.appendChild(this.closeButtonEl);
    },
  
    addStyles: function () {
      var css =
        '.a-soc-score-pop-up{border-radius: 25px; position: absolute; width: 400px;' +
        'height: 600px; background-color: white; border: 0px solid rgba(0,0,0,.75);' +
        'top: 100px; left: 50px; color: rgb(51, 51, 51); padding: 20px 15px 0 15px;' +
        'font-size: 11pt; line-height: 20pt;}' +
  
        '.a-soc-score-pop-up a{border-bottom: 1px solid rgba(53,196,232,.15); color: #1497b8;' +
        'position: relative; text-decoration: none; transition: .05s ease;}' +
          
        '@media only screen and (min-width: 1200px) {' +
        '.a-soc-score-pop-up {font-size: 12pt}}' +
  
        '@media only screen and (max-width: 600px) {' +
        '.a-soc-score-pop-up {left: 20px; right: 20px; bottom: 60px; width: auto}}' +
          
        '@media only screen and (max-height: 600px) {' +
        '.a-soc-score-pop-up {left: 20px; bottom: 20px; height: 250px}}' +
  
        '.a-close-button-info{width: 25px; height: 25px; padding: 0;' +
        'top: 15px; right: 15px; position: absolute; color: #404040; background-color: white;'  +
        'font-size: 30px; line-height: 12px; border: none;' +
        'border-radius: 5px; font-weight: medium}' +
  

        '.a-soc-scores-container {position: absolute; top: 25px; left: 100px;}' +
        
        '.a-soc-score-button {background: rgba(0, 0, 0, 0); color: #00ccff; min-width: 58px; min-height: 34px; border-radius: 8px; border: 0px solid #4CAF50; font-size: 30px; padding: 10px; font-weight: bold;}'+
        '.a-soc-score-button:hover {color: #008fb3;}'+
        '.a-soc-score-button::before { content: "\\f4be"; display: inline-block; font: normal normal normal 14px/1 FontAwesome;  font-size: inherit;  text-rendering: auto; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }'
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
      var envScoreButton = document.querySelector('.a-score-pop-up');
      if (display == 'none' && envScoreButton.style.display == '') {
        this.messageEl.style.display = '';
        envScoreButton.style.display = 'none';
      }
      else {
        display = display === 'none' ? '' : 'none';
        this.messageEl.style.display = display;
      }
    },
  
    createScoresButton: function (onClick) {
      var socButton;
      var wrapper;    
      // Create elements.
      wrapper = document.createElement('div');
      wrapper.classList.add('a-soc-scores-container');
      this.socButton = socButton = document.createElement('button');
      socButton.className = 'a-soc-score-button';
      socButton.innerText = " 0"
      socButton.setAttribute('title', 'Social impact score');
      // Insert elements.
      wrapper.appendChild(socButton);
      socButton.addEventListener('click', function (evt) {
        onClick();
        evt.stopPropagation();
      });
      this.el.sceneEl.appendChild(wrapper);
    },

    updateScore: function (id) {

      var score = document.querySelector('.soc-score');
      var workingCondition = document.querySelector('.workingCondition');
      var animalTreatement = document.querySelector('.animalTreatement');


      
      var url = "https://serene-headland-54515.herokuapp.com/materials/"
      fetch(url + id)
        .then((resp) => resp.json())
        .then(function(data) {
          console.log(data);
          this.socButton.innerHTML = " " + data.socialScore.total;
          score.innerHTML = data.socialScore.total;
          workingCondition.innerHTML = data.socialScore.workingCondition;
          animalTreatement.innerHTML = data.socialScore.animalTreatement;
        })
        .catch(function(error) {
          console.log(error);
        });
      },
  });
  