const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    handleLocation();
};

const routes = {
    404 : '/pages/404.html',
    '/' : 'pages/home.html',
    '/about' : 'pages/about.html',
    '/contact' : 'pages/contact.html'
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || route[404];
    const html = await fetch(route).then((data) => data.text());
    document.querySelector('.app').innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();