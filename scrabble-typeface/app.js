const values = [{	letter:'A',	value: 1	}, {	letter:'B',	value: 3	}, {	letter:'C',	value: 3	}, {	letter:'D',	value: 2	}, {	letter:'E',	value: 1	}, {	letter:'F',	value: 4	}, {	letter:'G',	value: 2	}, {	letter:'H',	value: 4	}, {	letter:'I',	value: 1	}, {	letter:'J',	value: 8	}, {	letter:'K',	value: 5	}, {	letter:'L',	value: 1	}, {	letter:'M',	value: 3	}, {	letter:'N',	value: 1	}, {	letter:'O',	value: 1	}, {	letter:'P',	value: 3	}, {	letter:'Q',	value: 10	}, {	letter:'R',	value: 1	}, {	letter:'S',	value: 1	}, {	letter:'T',	value: 1	}, {	letter:'U',	value: 1	}, {	letter:'V',	value: 4	}, {	letter:'W',	value: 4	}, {	letter:'X',	value: 8	}, {	letter:'Y',	value: 4	}, {	letter:'Z',	value: 10	} ];
const target = document.querySelector('.scrabble');

//creates span for each character
const results = Splitting({ target: target, by: 'chars' });

makeTiles();

//a letter is styled as a tile, punctuation is left as it is.
function makeTiles(){
  for (const letterSpan of results[0].chars) {
    const letter = $(letterSpan).attr("data-char").toUpperCase();
    if(isLetter(letter)){
      $(letterSpan).addClass("tile");
      addValue(letterSpan);
    }
    else{
      $(letterSpan).addClass("punctuation");
    }
    $(letterSpan).addClass("show");
  }
}

//return boolean. is *str* a letter?
function isLetter(str){
  if(str.length === 1 && str.match(/[a-z]/i)){
    return true;
  }
  return false;
}

function addValue(span){
  const letter = $(span).attr("data-char").toUpperCase();
  for (const element of values){
    if(element.letter === letter){
      const valueSpan = document.createElement("span");
      $(valueSpan).text(element.value);
      $(valueSpan).addClass("value");
      $(span).append(valueSpan);
      break;
    }
  }
}
