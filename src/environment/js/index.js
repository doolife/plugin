import environment from './util/environment';
import urlPath from './util/url-path';

document.querySelector("body").innerText = urlPath[environment()];