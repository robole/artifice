const bubble = document.getElementById("bubble");

saySomething();

setInterval(() => {
  saySomething();
}, 3000);

function saySomething() {
  fetch("https://api.kanye.rest/")
    .then((response) => response.json())
    .then((data) => {
      bubble.textContent = data.quote;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
