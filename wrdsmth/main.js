(function () {
  // limit to 15 lines to fit in the page
  const quotes = [
    {
      lines: [
        "Make your",
        "mark on",
        "the world",
        "and don't",
        "be afraid",
        "to color outside",
        "the lines.",
      ],
      overflow: true,
      textSize: 90,
    },
    {
      lines: [
        "When the dust settles,",
        "we will forever know",
        "who we love",
        "what we need,",
        "and where we truly",
        "want to be.",
        "Wait for it . . .",
      ],
      overflow: false,
    },
    {
      lines: [
        "If you fear",
        "failure,",
        "you're",
        "already",
        "considering",
        "it an",
        "option.",
      ],
      overflow: false,
    },
    {
      lines: [
        "Create.",
        "Every day.",
        "And",
        "making",
        "excuses",
        "does not",
        "count.",
      ],
      overflow: false,
    },
    {
      lines: [
        "Follow",
        "your",
        "calling.",
        "Trust",
        "your",
        "talent.",
        "Chase",
        "your",
        "dream.",
        "Believe in",
        "yourself.",
      ],
      overflow: false,
    },
    {
      lines: [
        "Aspire",
        "to inspire",
        "others",
        "and the",
        "universe",
        "will take",
        "note.",
      ],
      overflow: false,
    },
    {
      lines: ["You are here.", "This is now.", "Enjoy every moment."],
      overflow: false,
    },
    {
      lines: [
        "All the",
        "wanderlust",
        "in the world",
        "cannot",
        "cure my",
        "wonderlust",
        "for you.",
      ],
      overflow: false,
    },
    {
      lines: [
        "I will",
        "forever be",
        "in love",
        "with you.",
        "And",
        "that's not",
        "fiction.",
      ],
      overflow: false,
    },
    {
      lines: ["Dream", "Bigger.", ""],
      overflow: true,
      textSize: 205,
    },
  ];

  const picture = document.getElementById("picture");
  const keys = document.querySelectorAll(".keys use");
  const bars = document.querySelectorAll(".bars path");
  const space = document.querySelector(".space-bar");
  const pageTextElements = document.querySelectorAll(".quote text");
  const overflowTextElements = document.querySelectorAll(
    ".overflow-quote text"
  );

  const height = 700;
  const width = 600;
  const margin = 10;
  const textArea = height - margin * 2;
  const textSizeWeighting = 1.5;

  let quoteIndex = 0;
  let quoteTimeout = null;
  let charTimeout = null;
  let currKey = 0;
  let nextLine = "";
  let lineIndex = 0;
  let charIndex = 0;

  let playing = true;
  let muted = true;

  const title = document.querySelector(".title");

  // input with event listeners
  const previousBtn = document.getElementById("previous-button");
  previousBtn.addEventListener("click", previousQuote);

  const nextBtn = document.getElementById("next-button");
  nextBtn.addEventListener("click", nextQuote);

  const playBtn = document.getElementById("play-button");
  playBtn.addEventListener("click", play);

  const stopBtn = document.getElementById("stop-button");
  stopBtn.addEventListener("click", stop);

  const muteBtn = document.getElementById("mute-button");
  muteBtn.addEventListener("click", mute);

  const volumeInput = document.getElementById("volume");
  volumeInput.addEventListener("click", adjustVolume);

  const typingPlusBtn = document.getElementById("typing-plus");
  typingPlusBtn.addEventListener("click", incrementTypingSpeed);

  const typingMinusBtn = document.getElementById("typing-minus");
  typingMinusBtn.addEventListener("click", decrementTypingSpeed);

  const quotePlusBtn = document.getElementById("quote-plus");
  quotePlusBtn.addEventListener("click", incrementQuotePause);

  const quoteMinusBtn = document.getElementById("quote-minus");
  quoteMinusBtn.addEventListener("click", decrementQuotePause);

  const downloadBtn = document.getElementById("download");
  downloadBtn.addEventListener("click", download);

  const typewriterColor = document.getElementById("typewriter-color");
  typewriterColor.addEventListener("input", setTypewriterColorProperty);

  const pageColor = document.getElementById("page-color");
  pageColor.addEventListener("input", setPageColorProperty);

  const textColor = document.getElementById("text-color");
  textColor.addEventListener("input", setTextColorProperty);

  const typingSpeedInput = document.querySelector("#typing-speed");
  typingSpeedInput.addEventListener("change", updateTypingSpeed);

  const quotePauseInput = document.querySelector("#quote-pause");
  quotePauseInput.addEventListener("change", updateQuotePause);

  const enableBg = document.getElementById("enable-bg");
  enableBg.addEventListener("input", setBackgroundColorProperty);

  const bgColor = document.getElementById("background-color");
  bgColor.addEventListener("input", setBackgroundColorProperty);

  let typingSpeed = 0;
  let quotePause = 0;

  let audioContext;
  let audioSource;
  let gainNode;
  let volume = 0;
  let audioRepeatTimeout;

  init();
  displayQuote();

  // values from HTML are what we use as defaults
  function init() {
    typingSpeed = typingSpeedInput.value; // in ms
    quotePause = quotePauseInput.value; // in ms
    volume = volumeInput.value;
    setBackgroundColorProperty();
    setTextColorProperty();
    setPageColorProperty();
    setTypewriterColorProperty();
    processQuotes();
    updateTitle();
    initAudio();
  }

  function initAudio() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    } catch (e) {
      alert("Web Audio API is not supported in this browser");
    }

    if (muted === true) {
      volume = 0;
    }

    if (playing === true) {
      playAudio();
    }
  }

  function playAudio() {
    audioSource = audioContext.createBufferSource();
    gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    audioSource.connect(gainNode).connect(audioContext.destination);

    if (typingSpeed <= 200) {
      playFastAudio();
    } else if (typingSpeed > 200 && typingSpeed <= 350) {
      playIntermediateAudio();
    } else {
      playSlowAudio();
    }
  }

  function playFastAudio() {
    // fetch("https://github.com/robole/artifice/raw/main/wrdsmth/audio/fast-typing-mono5s.mp3")

    fetch("./audio/fast-typing-mono5s.mp3")
      .then((resp) => resp.arrayBuffer())
      .then((buf) => audioContext.decodeAudioData(buf))
      .then((decoded) => {
        audioSource.buffer = decoded;
        audioSource.loop = true;
        audioSource.playbackRate.value = getAudioFastPlaybackRate();
        audioSource.start(0);
      });
  }

  function getAudioFastPlaybackRate() {
    let value = 1;

    if (typingSpeed > 125 && typingSpeed <= 200) {
      value = 0.95;
    } else if (typingSpeed > 80 && typingSpeed <= 125) {
      value = 1;
    } else if (typingSpeed > 60 && typingSpeed <= 80) {
      value = 1.1;
    } else if (typingSpeed > 40 && typingSpeed <= 60) {
      value = 1.25;
    } else if (typingSpeed <= 40) {
      value = 1.4;
    }

    return value;
  }

  function playIntermediateAudio() {
    // fetch("https://github.com/robole/artifice/raw/main/wrdsmth/audio/typing-200ms-freq.mp3")
    fetch("./audio/typing-200ms-freq.mp3")
      .then((resp) => resp.arrayBuffer())
      .then((buf) => audioContext.decodeAudioData(buf))
      .then((decoded) => {
        audioSource.buffer = decoded;
        audioSource.loop = true;
        audioSource.playbackRate.value = getAudioIntermediatePlaybackRate();
        audioSource.start(0);
      });
  }

  function getAudioIntermediatePlaybackRate() {
    let value = 1;

    if (typingSpeed > 200 && typingSpeed <= 250) {
      value = 1;
    } else if (typingSpeed > 250 && typingSpeed <= 275) {
      value = 0.85;
    } else if (typingSpeed > 275 && typingSpeed <= 300) {
      value = 0.75;
    } else if (typingSpeed > 300 && typingSpeed <= 350) {
      value = 0.6;
    }

    return value;
  }

  function playSlowAudio() {
    if (audioRepeatTimeout !== undefined) {
      return;
    }

    audioRepeatTimeout = setInterval(() => {
      audioSource = audioContext.createBufferSource();
      gainNode = audioContext.createGain();
      gainNode.gain.value = volume;
      audioSource.connect(gainNode).connect(audioContext.destination);

      let audioPath = getRandomKeyPressAudioPath();
      fetch(audioPath)
        .then((resp) => resp.arrayBuffer())
        .then((buf) => audioContext.decodeAudioData(buf))
        .then((decoded) => {
          audioSource.buffer = decoded;
          audioSource.playbackRate.value = 1;
          audioSource.start(0);
        });
    }, typingSpeed);
  }

  function getRandomKeyPressAudioPath() {
    let index = Math.floor(Math.random() * 3); // random integer from 0 to 3

    // let audio = [
    //   "https://github.com/robole/artifice/raw/main/wrdsmth/audio/single-keypress-280ms-freq.mp3",
    //   "https://github.com/robole/artifice/raw/main/wrdsmth/audio/single-keypress-300ms-freq-a.mp3",
    //   "https://github.com/robole/artifice/raw/main/wrdsmth/audio/single-keypress-300ms-freq-b.mp3",
    // ];

    let audio = [
      "./audio/single-keypress-280ms-freq.mp3",
      "./audio/single-keypress-300ms-freq-a.mp3",
      "./audio/single-keypress-300ms-freq-b.mp3",
    ];

    return audio[index];
  }

  function reloadAudio() {
    stopAudio();
    playAudio();
  }

  function updateTitle() {
    title.textContent = `Quote ${quoteIndex + 1} of ${quotes.length}`;
  }

  // adds metadata to quotes based on their content.
  function processQuotes() {
    quotes.forEach((quote) => {
      quote.length = calculateLength(quote);
      quote.maxLineLength = getMaxLineLength(quote);

      let lineHeight = getLineHeight(quote);
      let size = getTextSize(quote);

      // overflow quote should have a textSize provided already
      if (quote.textSize === undefined && size >= lineHeight) {
        quote.textSize = lineHeight - 2; // give a small bit of padding
      } else if (quote.textSize === undefined) {
        quote.textSize = size;
      }

      quote.lineHeight = lineHeight;
    });

    setTextSizeProperty(quotes[0].textSize);
  }

  function displayQuote() {
    if (quoteIndex >= 0 && quoteIndex < quotes.length) {
      let currQuote = quotes[quoteIndex];

      lineIndex = 0;
      charIndex = 0;

      if (quoteIndex > 0) {
        updateTitle();
        let prevQuote = quotes[quoteIndex - 1];

        if (prevQuote.overflow === true) {
          resetOverflowQuote();
        } else {
          resetQuote();
        }
      }

      nextLine = currQuote.lines[lineIndex];
      setTextSizeProperty(quotes[quoteIndex].textSize);
      writeLine();
    }
  }

  function writeLine() {
    let currQuote = quotes[quoteIndex];

    nextLine = currQuote.lines[lineIndex];

    if (nextLine) {
      let len = nextLine.length;

      if (currQuote.overflow === false) {
        setYCoordinate();
      } else {
        setYCoordinateOverflow();
      }

      if (charIndex < len) {
        writeCharacter();
      } else if (hasNextLine()) {
        lineIndex++;
        charIndex = 0;
        writeLine();
      } else if (playing === true) {
        stopAudio();
        writeNextQuote();
      }
    } else if (playing === true) {
      stop();
    }
  }

  function writeCharacter() {
    let currQuote = quotes[quoteIndex];
    let character = nextLine.substr(charIndex, 1);

    currKey = getRandomKeyIndex();

    toggleTypingAnimation(character, currKey);

    if (currQuote.overflow === false) {
      pageTextElements[lineIndex].textContent += character;
    } else {
      overflowTextElements[lineIndex].textContent += character;
    }

    charIndex++;

    if (playing === true) {
      charTimeout = setTimeout(() => {
        toggleTypingAnimation(character, currKey);
        writeLine();
      }, typingSpeed);
    } else {
      toggleTypingAnimation(character, currKey);
      writeLine();
    }
  }

  function hasNextLine() {
    let next = false;
    let nextLineIndex = lineIndex + 1;
    let currQuote = quotes[quoteIndex];

    if (nextLineIndex < currQuote.lines.length) {
      next = true;
    }
    return next;
  }

  function writeNextQuote() {
    quoteIndex++;

    if (quoteIndex < quotes.length) {
      currQuote = quotes[quoteIndex];

      quoteTimeout = setTimeout(() => {
        if (playing === true) {
          playAudio();
        }

        displayQuote();
      }, quotePause);
    }
  }

  function download() {
    let svgData = picture.outerHTML;
    let svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    let svgUrl = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "wrdsmth.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function nextQuote() {
    let nextQuoteIndex = quoteIndex + 1;

    if (nextQuoteIndex < quotes.length) {
      reset();
      quoteIndex = nextQuoteIndex;
      updateTitle();
      displayQuote();
    }
  }

  function previousQuote() {
    let prevQuoteIndex = quoteIndex - 1;

    if (prevQuoteIndex >= 0) {
      reset();
      quoteIndex = prevQuoteIndex;
      updateTitle();
      displayQuote();
    }
  }

  function play() {
    if (playing === false) {
      playing = true;
      playBtn.classList.add("selected");
      stopBtn.classList.remove("selected");

      let currQuoteIndex = quoteIndex;
      reset();
      quoteIndex = currQuoteIndex;

      displayQuote();
      reloadAudio();
    }
  }

  function stop() {
    if (playing === true) {
      playing = false;
      playBtn.classList.remove("selected");
      stopBtn.classList.add("selected");
      stopAudio();
    }
  }

  function stopAudio() {
    audioSource.stop();
    clearInterval(audioRepeatTimeout);
    audioRepeatTimeout = undefined;
  }

  function mute() {
    const volumeOff = document.querySelector(".volume-off");
    const volumeOn = document.querySelector(".volume-on");

    muteBtn.classList.toggle("selected");
    muted = !muted;

    volumeOff.classList.toggle("hidden");
    volumeOn.classList.toggle("hidden");

    if (playing === true) {
      // Chrome suspends the audioContext on startup, we must resume the audiocontext ourselves to avoid issues
      audioContext.resume();
    }

    if (muted) {
      volume = 0;
      gainNode.gain.value = volume;
    } else {
      volume = volumeInput.value;
      gainNode.gain.value = volume;
    }
  }

  function adjustVolume(event) {
    volume = event.target.value;
    gainNode.gain.value = volume;
  }

  function getLineHeight(quote) {
    let lineCount = quote.lines.length;
    return (textArea / lineCount).toFixed(2);
  }

  function calculateLength(quote) {
    return quote.lines.join("").length;
  }

  function getMaxLineLength(quote) {
    let max = 0;

    quote.lines.forEach((line) => {
      let len = line.length;

      if (len > max) {
        max = len;
      }
    });
    return max;
  }

  function getTextSize(quote) {
    let size = (width / quote.maxLineLength) * textSizeWeighting;
    return Math.floor(size);
  }

  function setTextSizeProperty(textSize) {
    picture.setAttribute("font-size", `${textSize}px`);
  }

  function resetQuote() {
    for (let i = 0; i < pageTextElements.length; i++) {
      let el = pageTextElements[i];
      const content = el.textContent;

      if (content !== "") {
        el.textContent = "";
      } else {
        break;
      }
    }
  }

  function resetOverflowQuote() {
    for (let i = 0; i < overflowTextElements.length; i++) {
      el = overflowTextElements[i];
      const content = el.textContent;

      if (content !== "") {
        el.textContent = "";
      } else {
        break;
      }
    }
  }

  function setYCoordinate() {
    if (charIndex === 0) {
      pageTextElements[lineIndex].setAttribute(
        "y",
        quotes[quoteIndex].lineHeight * (lineIndex + 1)
      );
    }
  }

  function setYCoordinateOverflow() {
    const pageYCoordinate = 65;

    if (charIndex === 0) {
      overflowTextElements[lineIndex].setAttribute(
        "y",
        quotes[quoteIndex].lineHeight * (lineIndex + 1) + pageYCoordinate
      );
    }
  }

  function toggleTypingAnimation(character) {
    if (character !== " ") {
      bars[currKey].classList.toggle("typing");
      keys[currKey].classList.toggle("typing");
    } else {
      space.classList.toggle("typing");
    }
  }

  function getRandomKeyIndex() {
    return Math.floor(Math.random() * keys.length);
  }

  function setBackgroundColorProperty() {
    if (enableBg.checked === false) {
      document.querySelector(".background").setAttribute("fill", "none");
    } else {
      document.querySelector(".background").setAttribute("fill", bgColor.value);
    }

    document.getElementById("bg-color-wrapper").style.background =
      bgColor.value;
  }

  function setTextColorProperty() {
    document.getElementById("text-color-wrapper").style.background =
      textColor.value;
    document.querySelector(".page").setAttribute("fill", textColor.value);
    document
      .querySelector(".overflow-quote")
      .setAttribute("fill", textColor.value);
  }

  function setPageColorProperty() {
    document.getElementById("page-color-wrapper").style.background =
      pageColor.value;
    document.querySelector(".page rect").setAttribute("fill", pageColor.value);
  }

  function setTypewriterColorProperty() {
    document.getElementById("typewriter-color-wrapper").style.background =
      typewriterColor.value;
    picture.setAttribute("fill", typewriterColor.value);
  }

  function updateTypingSpeed(event) {
    typingSpeed = event.target.value;
    updateTypingAnimation();

    if (playing === true) {
      resetCurrentQuote();
      displayQuote();
      reloadAudio();
    }
  }

  function updateQuotePause(event) {
    quotePause = event.target.value;
  }

  function updateTypingAnimation() {
    animSpeed = `${(typingSpeed / 1000).toFixed(3)}s`;
    document.documentElement.style.setProperty(
      "--animation-duration",
      animSpeed
    );
  }

  function reset() {
    quoteIndex = 0;
    nextLine = "";
    lineIndex = 0;
    charIndex = 0;
    clearTimeout(charTimeout);
    clearTimeout(quoteTimeout);
    resetKeys();
    resetQuote();
    resetOverflowQuote();
    updateTitle();
  }

  function resetCurrentQuote() {
    nextLine = "";
    lineIndex = 0;
    charIndex = 0;
    clearTimeout(charTimeout);
    clearTimeout(quoteTimeout);
    resetKeys();
    resetQuote();
    resetOverflowQuote();
    updateTitle();
  }

  function resetKeys() {
    bars[currKey].classList.remove("typing");
    keys[currKey].classList.remove("typing");
    space.classList.remove("typing");
  }

  function incrementTypingSpeed() {
    const max = parseInt(typingSpeedInput.getAttribute("max"));

    if (typingSpeed + 1 <= max) {
      typingSpeed = parseInt(typingSpeed) + 1;
      typingSpeedInput.value = typingSpeed;

      if (playing === true) {
        resetCurrentQuote();
        updateTypingAnimation();
        displayQuote();
        reloadAudio();
      }
    }
  }

  function decrementTypingSpeed() {
    const min = parseInt(typingSpeedInput.getAttribute("min"));

    if (typingSpeed - 1 >= min) {
      typingSpeed = parseInt(typingSpeed) - 1;
      typingSpeedInput.value = typingSpeed;

      if (playing === true) {
        resetCurrentQuote();
        updateTypingAnimation();
        displayQuote();
        reloadAudio();
      }
    }
  }

  function incrementQuotePause() {
    const max = parseInt(quotePauseInput.getAttribute("max"));

    if (quotePause + 1 <= max) {
      quotePause = parseInt(quotePause) + 1;
      quotePauseInput.value = quotePause;
      if (playing === true) {
        resetCurrentQuote();
        displayQuote();
      }
    }
  }

  function decrementQuotePause() {
    const min = parseInt(quotePauseInput.getAttribute("min"));

    if (quotePause - 1 >= min) {
      quotePause = parseInt(quotePause) - 1;
      quotePauseInput.value = quotePause;

      if (playing === true) {
        resetCurrentQuote();
        displayQuote();
      }
    }
  }
})();
