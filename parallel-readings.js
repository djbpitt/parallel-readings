"use strict";
/*
 * Mockup for displaying selected readings in one or two columns
 * 2022-03-25 djb
 *
 * Radio button set controls display of left, right, or both columns
 * Option list in each column loads content item via Ajax
 * Content items are valid, namespaced XHTML with <article> root element
 *   and no XML or doctype declaration
 */
function init() {
  // <option> elements in columns to load content via Ajax on change
  let dropDowns = document.getElementById('readings').getElementsByTagName('select');
  for (var i = 0, len = dropDowns.length; i < len; i++) {
    dropDowns[i].addEventListener('change', chooseReading, false);
  }
  
  // radio buttons determine display of left, right, or both columns
  let radios = document.querySelectorAll("input[name = 'display-option']");
  for (var i = 0, len = radios.length; i < len; i++) {
    radios[i].addEventListener('click', toggleColumns, false);
  }
}
function chooseReading() {
  // directory is hard-coded
  let directory = 'http://dev.obdurodon.org/sandbox/ajax-test/';
  // @value of selected option is base
  var filename = directory + this.value + '.xhtml';
  // @id of <section> element where new <article> content will be inserted
  var target = document.getElementById(this.parentNode.id + 'Content');
  // If document selected, load it
  // If "Select a reading:" dropdown header selected, clear panel
  if (this.value) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filename, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        target.innerHTML = xmlhttp.responseText;
      }
    }
  } else {
    target.innerHTML = '';
  }
}

function toggleColumns() {
  // https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
  // Value will be left, both, or right
  // constants for left and right columns
  let left = document.getElementById('left');
  let right = document.getElementById('right');
  
  let columns = Array. from (document.querySelectorAll("input[name = 'display-option']")).find(r => r.checked).value;
  if (columns == 'left') {
    // show left column, hide right
    left.style.display = 'block';
    right.style.display = 'none';
  } else if (columns == 'right') {
    // hide left column, show right
    left.style.display = 'none';
    right.style.display = 'block';
  } else {
    // show both columns
    left.style.display = 'block';
    right.style.display = 'block';
  }
}
window.addEventListener('DOMContentLoaded', init, false);