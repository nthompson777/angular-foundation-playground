import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  siteTitle = 'Site Home';
  name:string;
  list:any;
  selected :any;

  // Main Nav Links Array
  constructor() {
    this.list = ['About','Charts', 'Grid']; 
  }

  select(item) {
    this.selected = item; 
  };

  isActive(item) {
      return this.selected === item;
  };

}


/* Sticky Footer: https://github.com/coreysyms/foundationStickyFooter */
var MutationObserver = (function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
    for (var i=0; i < prefixes.length; i++) {
      if (prefixes[i] + 'MutationObserver' in window) {
         return window[prefixes[i] + 'MutationObserver'];
      }
    }
    return false;
}());

window.onload = function() {
  stickyFooter();

  if (MutationObserver) {
      observer.observe(target, config);
  } else {
    //old IE
      setInterval(stickyFooter, 500);
  }
};

//check for changes to the DOM
var target = document.body;
var observer;
var config = { attributes: true, childList: true, characterData: true, subtree:true };

if (MutationObserver) {
  // create an observer instance
  observer = new MutationObserver(mutationObjectCallback);
}

function mutationObjectCallback(mutationRecordsList) {	
  stickyFooter();
}
   

//check for resize event
window.onresize = function() {
  stickyFooter();
};

//lets get the marginTop for the <footer>
function getCSS(element, property) {

  var elem = document.getElementsByTagName(element)[0];
  var css = null;
  
  if (elem.currentStyle) {
    css = elem.currentStyle[property];
  
  } else if (window.getComputedStyle) {
  css = document.defaultView.getComputedStyle(elem, null).
  getPropertyValue(property);
  }
  
  return css;

}

function stickyFooter() {
  if (MutationObserver) {
    observer.disconnect();
  }
  document.body.setAttribute("style","height:auto");
  
  //only get the last footer
  var footer = document.getElementsByTagName("footer")[document.getElementsByTagName("footer").length-1];
      
  if (footer.getAttribute("style") !== null) {
    footer.removeAttribute("style");
  }
  
  if (window.innerHeight != document.body.offsetHeight) {
    var offset = window.innerHeight - document.body.offsetHeight;
    var current = getCSS("footer", "margin-top");
    
    if (isNaN(parseInt(current)) === true) {
      footer.setAttribute("style","margin-top:0px;");
      current = 0;
    } else {
      current = parseInt(current);
    }
            
    if (current+offset > parseInt(getCSS("footer", "margin-top"))) {			
      footer.setAttribute("style","margin-top:"+(current+offset)+"px;");
    }
  }
  
  document.body.setAttribute("style","height:100%");
  
  //reconnect
  if (MutationObserver) {
    observer.observe(target, config);
  }
}