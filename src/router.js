const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  "/": "/src/home.html",
  "/play": "/src/play.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || route[404];
  const html = await fetch(route).then((data) => data.text());
  document.querySelector("#app").innerHTML = html;
  const script = document.createElement("script");
  script.src = "./src/index.js";
  document.head.appendChild(script);
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
