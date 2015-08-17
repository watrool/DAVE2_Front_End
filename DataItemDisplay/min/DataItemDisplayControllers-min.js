!function(){"use strict";function e(e,t,a){var l=this}function t(e,t,a,l,s,o,n,i){function m(){if(l.remove("dataItemListTableColumns"),void 0===l.getObject("dataItemListTableColumns")&&l.putObject("dataItemListTableColumns",C.dataItemListTableColumns),C.dataItemListTableColumns=l.getObject("dataItemListTableColumns"),C.avaliableDataItemTableColumns=l.getObject("avaliableDataItemTableColumns")||[],s.emit("requestDataItemList"),C.promiseToSolve=t(function(){for(var e=!1,t=0;t<C.alerts.length;t++)"Loading Importer List Failed. Please Check Your Internet Connection."===C.alerts[t].msg&&(e=!0);e||C.alerts.push({type:"danger",msg:"Loading Importer List Failed. Please Check Your Internet Connection."}),C.systemStatus="Error"},5e3),n.writeState("hasMenu",!1),C.options=e.options?JSON.parse(e.options):{},console.log(C.options),0!==C.options.length)for(var a in C.options)C[a]=C.options[a],console.log(C[a])}function d(e,t){0!==C.avaliableDataItemTableColumns.length&&(C.dataItemListTableColumns[e.index-1].status=!0,C.avaliableDataItemTableColumns.splice(t,1),l.putObject("dataItemListTableColumns",C.dataItemListTableColumns),l.putObject("avaliableDataItemTableColumns",C.avaliableDataItemTableColumns))}function r(e,t,a){if(console.log(t),13===e.keyCode)if(t.index===t.newIndex)C.addTableColumn(t,a);else{t.newIndex>C.dataItemListTableColumns.length&&(t.newIndex=C.dataItemListTableColumns.length),t.newIndex<1&&(t.newIndex=1),C.dataItemListTableColumns[t.index-1].index=t.newIndex-1,C.dataItemListTableColumns[t.newIndex-1].index=t.index-1;var s=C.dataItemListTableColumns[t.index-1];C.dataItemListTableColumns[t.index-1]=C.dataItemListTableColumns[t.newIndex-1],C.dataItemListTableColumns[t.newIndex-1]=s,t.index=t.newIndex,console.log(t),console.log(C.avaliableDataItemTableColumns),console.log(C.dataItemListTableColumns),C.addTableColumn(t,a)}l.putObject("dataItemListTableColumns",C.dataItemListTableColumns),l.putObject("avaliableDataItemTableColumns",C.avaliableDataItemTableColumns)}function c(){C.multipleSelectionMode=!1,i.clearDataItems(),C.selectedDataItems=[]}function u(e){angular.element("div.alert.animated#dataItemList"+e).removeClass("fadeInDown"),angular.element("div.alert.animated#dataItemList"+e).addClass("fadeOutUp"),C.alerts.splice(e,1)}function I(e){for(var t=e-1;t>=0;t--)if(C.dataItemListTableColumns[t].status){var a=C.dataItemListTableColumns[e];a.index=t,C.dataItemListTableColumns[t].index=e,C.dataItemListTableColumns[e]=C.dataItemListTableColumns[t],C.dataItemListTableColumns[t]=a;break}}function p(e){for(var t=e+1;t<C.dataItemListTableColumns.length;t++)if(C.dataItemListTableColumns[t].status){var a=C.dataItemListTableColumns[e];a.index=t,C.dataItemListTableColumns[t].index=e,C.dataItemListTableColumns[e]=C.dataItemListTableColumns[t],C.dataItemListTableColumns[t]=a;break}}function g(e){C.dataItemListTableColumns[e].status=!1,C.avaliableDataItemTableColumns.push({index:e+1,value:C.dataItemListTableColumns[e].name,newIndex:e+1}),console.log(C.avaliableDataItemTableColumns),l.putObject("dataItemListTableColumns",C.dataItemListTableColumns),l.putObject("avaliableDataItemTableColumns",C.avaliableDataItemTableColumns)}function D(t){if(console.log(C.multipleSelectionMode),C.multipleSelectionMode)-1===C.selectedDataItems.indexOf(t)?C.selectedDataItems.push(t):C.selectedDataItems.splice(C.selectedDataItems.indexOf(t),1);else if(i.recordToDoItems([t]),0===angular.element("dave-data-item-display-page").length){var l=e.$parent.$new(!0);o.DestroyDirectiveService("dave-data-item-display-list-page",e),o.AddDirectiveService(".dataItemDisplayContainer",'<dave-data-item-display-page class="angular-directive"></dave-data-item-display-page>',l,a)}}function h(){if(console.log(C.selectedDataItems.length),0!==C.selectedDataItems.length&&(i.recordToDoItems(C.selectedDataItems),console.log(i.readToDoItems()),0===angular.element("dave-data-item-display-page").length)){var t=e.$parent.$new(!0);o.DestroyDirectiveService("dave-data-item-display-list-page",e),o.AddDirectiveService(".dataItemDisplayContainer",'<dave-data-item-display-page class="angular-directive"></dave-data-item-display-page>',t,a)}}function v(){angular.element(".js-layout").toggleClass("hidden")}function b(){o.EnterSearchMode("dave-data-item-display-list-page","<dave-data-item-display-list-page></dave-data-item-display-list-page>",".dataItemDisplayContainer",e,a)}var C=this;C.activate=m,C.addTableColumn=d,C.addTableColumnKeyPress=r,C.cancelMultipleDataItems=c,C.closeAlert=u,C.decreaseColumnIndex=I,C.increaseColumnIndex=p,C.removeColumn=g,C.requestDataItem=D,C.requestMultipleDataItems=h,C.toggleLayOutMenu=v,C.toggleSearchMode=b,C.alerts=[],C.avaliableDataItemTableColumns=[],C.dataItemList=[],C.dataItemListCurrentPage=1,C.dataItemListTableColumns=[{name:"name",status:!0,index:0},{name:"location",status:!0,index:1},{name:"note",status:!0,index:2},{name:"precision",status:!0,index:3},{name:"unit",status:!0,index:4}],C.disableSetUpButton=!1,C.disableMultipleSelectionMode=!1,C.multipleSelectionMode=!1,C.promiseToSolve="",C.search={},C.selectedDataItems=[],C.systemStatus="Normal",C.loading=!0,e.$on("socket:ipDataItemListResponse",function(e,a){console.log(e.name),"Normal"===C.systemStatus&&(t.cancel(C.promiseToSolve),1!==a.completeState?C.dataItemList=C.dataItemList.concat(a.list_out):(C.dataItemList=C.dataItemList.concat(a.list_out),C.loading=!1))}),e.$on("ok",function(){console.log("ok"),C.requestMultipleDataItems()}),C.activate()}function a(e,t,a,l,s,o,n,i,m){function d(){D.loading=!0;for(var e=m.readToDoItems(),t=0;t<e.length;t++)o.emit("requestDataItem",e[t]),m.clearToDoItem(e[t]),D.dataItemsData[e[t].name]=[],D.dataItemsToWait.push(e[t]),D.dataItemsToLoadIntoHighcharts.push(e[t].name),console.log(D.dataItemsToWait),D.currentDataItemsStatus.push(!0);if(D.currentDataItems=m.readCurrentDataItems(),void 0===h.highcharts()){var a={chart:{zoomType:"x",type:"spline"},title:{text:"Data Items"},tooltip:{pointFormat:' | <span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',positioner:function(){return{x:0,y:0}},hideDelay:1e5,crosshairs:{color:"black",hideDelay:1e5}},plotOptions:{series:{tooltip:{dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L"}},marker:{states:{hover:{}}},animation:!0,states:{hover:!1},lineWidth:2,gapSize:2}},xAxis:{type:"datetime",dateTimeLabelFormats:{day:"%e  %b %Y",month:"%b"},events:{afterSetExtremes:function(){}},minRange:1e4},navigator:{},scrollbar:{liveRedraw:!0},rangeSelector:{enabled:!0,buttonTheme:{fill:"orange",stroke:"none","stroke-width":0,r:8,style:{color:"#000",fontWeight:"bold"},states:{hover:{},select:{fill:"black",style:{color:"white"}}}},buttons:[{type:"second",count:30,text:"30s"},{type:"minute",count:1,text:"1m"},{type:"minute",count:30,text:"30m"},{type:"hour",count:1,text:"1h"},{type:"hour",count:3,text:"3h"},{type:"all",text:"All"}],selected:2}};h.highcharts("StockChart",a)}}function r(){var e=s.open({templateUrl:"DataItemDisplay/DataItemModalViews/addDataItem.html",controller:"AddDataItemModalCtrl as addDataItemModalCtrl",size:"lg",resolve:{currentDataItems:function(){return D.currentDataItems}}});e.result.then(function(e){console.log(e),"success"===e&&D.activate()})}function c(){var t=e.$parent.$new(!0);n.DestroyDirectiveService("dave-data-item-display-page",e),n.AddDirectiveService(".dataItemDisplayContainer",'<dave-data-item-display-list-page  class="angular-directive"></dave-data-item-display-list-page>',t,a),m.clearDataItems()}function u(e){angular.element("div.alert.animated#dataItem"+e).removeClass("fadeInDown"),angular.element("div.alert.animated#dataItem"+e).addClass("fadeOutUp"),D.alerts.splice(e,1)}function I(e,t,a){if(h.highcharts()){var l=0;h.highcharts().series.forEach(function(t,a,s){t.name===e.name&&(l=a)}),D.currentDataItemsStatus[t]=a,a?h.highcharts().series[l].show():h.highcharts().series[l].hide()}}function p(e){var t=s.open({templateUrl:"DataItemDisplay/DataItemModalViews/dataItemSetting.html",controller:"DataItemSettingModalCtrl as dataItemSettingModalCtrl",resolve:{currentDataItem:function(){return D.currentDataItems[e]}}});t.result.then(function(e){console.log(e)})}function g(){n.EnterSearchMode("dave-data-item-display-page","<dave-data-item-display-page></dave-data-item-display-page>",".dataItemDisplayContainer",e,a)}var D=this;D.activate=d,D.addDataItem=r,D.backToDataItemList=c,D.closeAlert=u,D.changeDataItemStatusTo=I,D.openSettingModal=p,D.toggleSearchMode=g,D.alerts=[],D.completeStates=[],D.dataItemsData=[],D.currentDataItems=m.readCurrentDataItems(),D.currentDataItemsStatus=[],D.dataItemsToWait=[],D.dataItemsToLoadIntoHighcharts=[],D.loading=!0,D.systemStatus="Normal",D.waitingMessage="Loading Data From Server";var h=angular.element("#container");e.$on("socket:ipDataItemResponse",function(e,t){if(console.log(t),"ERROR"===t.reply){D.loading=!1;for(var a=!1,l=0;l<D.alerts.length;l++)"Loading Data Item Failed. Please Check Your Internet Connection."===D.alerts[l].msg&&(a=!0);a||D.alerts.push({type:"danger",msg:"Loading Data Item Failed. Please Check Your Internet Connection."}),D.systemStatus="Error"}else if(console.log(t.payload.name),t.completeState){if(void 0===D.completeStates[t.payload.name]&&(D.completeStates[t.payload.name]=0),1!==t.completeState)100*t.completeState-D.completeStates[[t.payload.name]]>5&&(D.completeStates[t.payload.name]=100*t.completeState),D.dataItemsData[t.payload.name]=D.dataItemsData[t.payload.name].concat(t.list_out);else if(D.completeState=100*t.completeState,D.dataItemsData[t.payload.name]=D.dataItemsData[t.payload.name].concat(t.list_out),console.log(D.dataItemsData[t.payload.name].length),console.log("First Value: "+D.dataItemsData[t.payload.name][0]),console.log("Last Value: "+D.dataItemsData[t.payload.name][D.dataItemsData[t.payload.name].length-1]),D.dataItemsToWait.forEach(function(e,a,l){e.name===t.payload.name&&l.splice(a,1)}),0===D.dataItemsToWait.length){var s=[];for(var o in D.dataItemsToLoadIntoHighcharts)s.push({name:D.dataItemsToLoadIntoHighcharts[o],data:D.dataItemsData[D.dataItemsToLoadIntoHighcharts[o]]});s.forEach(function(e,t,a){h.highcharts().addSeries(e)}),D.loading=!1,D.dataItemsToLoadIntoHighcharts=[]}}else if(t.list_out)for(var n=0;n<t.list_out.length;n++)for(var i=0;i<h.highcharts().series.length;i++)h.highcharts().series[i].name===t.payload.name&&h.highcharts().series[i].addPoint(t.list_out[n],!0,!0)}),e.$on("socket:ipAsychLoadingDataResponse",function(e,t){console.log(e.name),h.highcharts().series[0].setData(t),h.highcharts().hideLoading()}),e.$on("$destroy",function(){o.emit("stopDataItemConnection")}),D.activate()}function l(e,t,a,l){function s(){console.log(a)}function o(){e.$broadcast("ok"),t.close("success")}function n(){console.log("called"),t.dismiss("cancel")}var i=this;i.activate=s,i.ok=o,i.cancel=n,i.activate()}function s(e,t,a,l){function s(){}function o(){console.log("called"),t.dismiss("cancel")}var n=this;n.activate=s,n.cancel=o}angular.module("Dave2.DataItemDisplay").controller("DataItemDisplayCtrl",e).controller("DaveDataItemDisplayListPageCtrl",t).controller("DaveDataItemDisplayPageCtrl",a).controller("AddDataItemModalCtrl",l).controller("DataItemSettingModalCtrl",s),e.$inject=["$scope","$timeout","DataItemDisplaySocket"],t.$inject=["$scope","$timeout","$compile","$cookies","DataItemDisplaySocket","DirectiveService","generalStateWRS","DataItemDisplayRegistryService"],a.$inject=["$scope","$timeout","$compile","$cookies","$modal","DataItemDisplaySocket","DirectiveService","generalStateWRS","DataItemDisplayRegistryService"],l.$inject=["$scope","$modalInstance","currentDataItems","DataItemDisplaySocket"],s.$inject=["$scope","$modalInstance","currentDataItem","DataItemDisplaySocket"]}();