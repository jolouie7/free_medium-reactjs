// This file sets backendHost to either dev, test, or production environment
let backendHost: string;

const hostname = window && window.location && window.location.hostname;

if (hostname === "free-medium-reactjs.vercel.app/") {
  backendHost = "https://free-medium-mern.herokuapp.com";
} else if (/^qa/.test(hostname)) {
  backendHost = `https://api.${hostname}`;
} else {
  backendHost =
    "https://free-medium-mern.herokuapp.com" || "http://localhost:5000";
}

export default backendHost;
