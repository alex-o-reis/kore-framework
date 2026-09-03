/**
 * Router — Single Page Application Routing Engine para Kore Framework
 */
class Router {
    constructor() {
        this.routes = [];
        this.menu = [];
        this.currentHash = ";
 this.params = {};
 }

 init(routes = [], menu = []) {
 this.routes = routes;
 this.menu = menu;
 let self = this;

 window.addEventListener(hashchange, function() {
 self.executeRoute();
 });

 jQuery(document).ready(function() {
 self.executeRoute();
 smartbox_bindEvents();
 });
 }

 getHash() {
 let hash = window.location.hash || #/;
 return hash.replace(/\/+$/, ) || #;
 }

 executeRoute() {
 let fullHash = this.getHash();
 let path = fullHash.replace(/^#\/?/, ).trim();
 let segments = path ? path.split(/) : [];

 let matched = false;

 for (let route of this.routes) {
 let routePattern = route.url.replace(/^#\/?/, ).trim();
 let routeSegments = routePattern ? routePattern.split(/) : [];

 if (routeSegments.length === segments.length) {
 let match = true;
 let params = {};

 for (let i = 0; i < routeSegments.length; i++) {
 if (routeSegments[i].startsWith(:)) {
 let paramName = routeSegments[i].substring(1);
 params[paramName] = segments[i];
 } else if (routeSegments[i].toLowerCase() !== segments[i].toLowerCase()) {
 match = false;
 break;
 }
 }

 if (match) {
 matched = true;
 this.params = params;
 this.dispatch(route.controller, params);
 break;
 }
 }
 }

 if (!matched) {
 Controller.route404();
 }
 }

 dispatch(controllerClass, params) {
 if (typeof window[controllerClass] === function) {
 let instance = new window[controllerClass](params);
 instance.execute();
 } else {
 console.error(Controller class  + controllerClass +  not found!);
 Controller.route404();
 }
 }

 createMenu() {
 let html = ;
 let currentGroup = ;

 for (let item of this.menu) {
 if (item.type === item) {
 html += 
 <li class=nav-item>
 <a href= class=nav-link>
 <i class=bi  me-2></i>
 <span></span>
 </a>
 </li>
 ;
 } else if (item.type === group || item.type === submenu) {
 html += 
 <li class=nav-item>
 <a href= class=nav-link>
 <i class=bi  me-2></i>
 <span></span>
 </a>
 </li>
 ;
 }
 }
 return html;
 }
}

var router = new Router();