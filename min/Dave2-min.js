!function(){"use strict";function e(e){e.when("/Import",{templateUrl:"Importer/importer.html",controller:"ImporterUploadCtrl",controllerAs:"importerUploadCtrl"}),e.when("/DataItemDisplay",{templateUrl:"DataItemDisplay/DataItemDisplay.html",controller:"DataItemDisplayCtrl",controllerAs:"dataItemDisplayCtrl"})}angular.module("Dave2",["ngRoute","Dave2.Importer","Dave2.DataItemDisplay","ui.bootstrap","btford.socket-io"]).config(e),e.$inject=["$routeProvider"],particlesJS("particles-js",{particles:{number:{value:150,density:{enable:!0,value_area:800}},color:{value:"#000000"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.5,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:3,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#000000",opacity:.4,width:1},move:{enable:!0,speed:1,direction:"right",random:!0,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"grab"},onclick:{enable:!1,mode:"push"},resize:!1},modes:{grab:{distance:140,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})}();