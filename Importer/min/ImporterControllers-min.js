!function(){"use strict";function e(e,t,o,a,r,n,l){function i(){l.emit("requestImporterList"),angular.element(".importerContainerRightPanel").addClass("fadeIn"),L.importerList=[],L.promiseToSolve=e(function(){for(var e=!1,t=0;t<L.alerts.stepOne.length;t++)"Loading Importer List Failed. Please Check Your Internet Connection."===L.alerts.stepOne[t].msg&&(e=!0);e||L.alerts.stepOne.push({type:"danger",msg:"Loading Importer List Failed. Please Check Your Internet Connection."}),L.systemStatus="Error"},5e3)}function s(){if(0!==L.avaliableTableColumns.length){var e=L.avaliableTableColumns.pop();L.importerListTableColumns.splice(e.index,0,e.value)}}function m(){L.stepOne=!0,L.stepTwo=!1,L.stepTwoB=!1,L.stepThree=!1,L.activate()}function p(){L.formModel={}}function c(){L.stepOne=!0,L.stepTwo=!1,L.stepTwoB=!1,L.stepThree=!1,L.fileUploadProgress=0,L.waitingMessage="File Uploading"}function u(e){var t=a.open({templateUrl:"Importer/changeDataItemModal.html",controller:["$scope","$modalInstance",function(t,o){t.dataItem=e,t.type="text",t.ok=function(){o.close({name:t.dataItem.name,value:t.dataItem.value})},t.cancel=function(){o.dismiss("cancel")}}]});t.result.then(function(e){console.log(e)})}function d(e){L.currentDataItem=e,L.importerDataItemData=L.importerDataItemToDisplay[L.currentDataItem.fieldName]}function f(e,t){angular.element("div.alert.animated#"+t+e).removeClass("fadeInDown"),angular.element("div.alert.animated#"+t+e).addClass("fadeOutUp"),L.alerts[t].splice(e,1)}function g(){var e=[];console.log(L.stepThreeFormCollection);for(var t in L.stepThreeFormCollection){var o={availableOptions:{}};for(var a in L.stepThreeFormCollection[t])switch(a){case"fields":break;case"checked":o.checked=L.stepThreeFormCollection[t][a];break;default:o.availableOptions[a]={name:a,value:L.stepThreeFormCollection[t][a]}}o.fieldName=t,e.push(o)}console.log(e),l.emit("decideImporterCreation",{location:L.importerCreationMeta.location,importerName:L.importerCreationMeta.importerName,userName:L.importerCreationMeta.userName,files:L.importerCreationMeta.files,data:e,description:L.importerCreationMeta.description}),L.stepOne=!1,L.stepTwo=!0,L.stepTwoB=!1,L.stepThree=!1}function T(e){var t=L.importerListTableColumns.indexOf(e);if(t>0){var o=L.importerListTableColumns[t-1];L.importerListTableColumns[t]=o,L.importerListTableColumns[t-1]=e}}function h(e){var t=L.importerListTableColumns.indexOf(e);if(t<L.importerListTableColumns.length-1){var o=t+1,a=L.importerListTableColumns[o];L.importerListTableColumns[t]=a,L.importerListTableColumns[t+1]=e}console.log(L.importerListTableColumns)}function C(e){var t=L.importerListTableColumns.indexOf(e);L.importerListTableColumns.splice(t,1),L.avaliableTableColumns.push({index:t,value:e}),console.log(e),console.log(L.importerListTableColumns)}function D(e){var t=L.formModel.Browse.indexOf(e);-1!==t&&(L.formModel.Browse.splice(t,1),console.log(L.formModel))}function I(t){console.log(t),L.importerToDisplay=t,l.emit("requestImporter",t),"Normal"===L.systemStatus&&null===L.requestImporterPromiseToSolve&&(L.requestImporterPromiseToSolve=e(function(){-1===L.alerts.stepOne.indexOf({type:"danger",msg:"Timeout"})&&L.alerts.stepOne.push({type:"danger",msg:"Timeout"}),L.systemStatus="Error"},1500))}function y(){L.stepOne=!1,L.stepTwo=!0,L.stepTwoB=!1,L.stepThree=!1;var e=L.formModel.Browse;if(console.log(e),e!=={}){for(var t={importerName:L.formModel.Name,files:[],location:L.formModel.Location,description:L.formModel.Description,userName:"troy"},o=0;o<L.formModel.Browse.length;o++)t.files.push({fileName:L.formModel.Browse[o].name});r.upload({url:"/Importer/uploadFile",file:e,fields:{uploadInfo:{name:L.formModel.Name,filename:L.formModel.Browse[0].name,location:L.formModel.Location,description:L.formModel.Description}}}).progress(function(e){var t=parseInt(100*e.loaded/e.total);console.log(t),L.fileUploadProgress=t,t>=100&&(L.waitingMessage="Waiting response from server",console.log(L.waitingMessage))}).success(function(e,o,a,r){l.emit("createNewImporter",t),console.log("uploadSuccess")}).error(function(e){alert(e)})}else alert("Please Browse")}function v(){angular.element(".js-layout").toggleClass("hidden")}function w(){angular.element(".importerContainerLeftMenu").toggleClass("noExpanded"),angular.element(".importerContainerRightPanel").toggleClass("expanded"),angular.element("#js-expand-arrow").toggleClass("glyphicon-arrow-left  animated flipInY"),angular.element("#js-expand-arrow").toggleClass("glyphicon-arrow-right  animated flipInY")," Expand"===angular.element("#js-expand-sign").html()?angular.element("#js-expand-sign").html(" Collapse"):" Collapse"===angular.element("#js-expand-sign").html()&&angular.element("#js-expand-sign").html(" Expand")}function M(){L.stepOneSearchMode=L.stepOneSearchMode?!1:!0,angular.element("#js-pagination").toggleClass("rotateInUpLeft"),angular.element("#js-pagination").toggleClass("rotateOutDownLeft")}var L=this;L.activate=i,L.addTableColumn=s,L.backToImporterList=m,L.cancelFile=p,L.cancelImport=c,L.changeDataItemConfig=u,L.chooseDataItem=d,L.closeAlert=f,L.decideImport=g,L.decreaseColumnIndex=T,L.increaseColumnIndex=h,L.requestImporter=I,L.removeFile=D,L.removeColumn=C,L.submitFile=y,L.toggleLayOutMenu=v,L.toggleLeftMenu=w,L.toggleSearchMode=M,L.alerts={stepOne:[],stepTwoB:[]},L.avaliableTableColumns=[],L.currentDataItem="Fermenter Sample HPLC Ethanol",L.formModel={},L.fileUploadProgress=0,L.importerList=[],L.importerListCurrentPage=1,L.stepOneSearchMode=!1,L.stepOneSearchModeInput={},L.importerToDisplay={},L.importerToDisplayContent=[],L.importerDataItemToDisplay={},L.importerDataItemData=[],L.importerListTableColumns=["importerName","location","ownerName","type","description"],L.promiseToSolve=null,L.requestImporterPromiseToSolve=null,L.stepOne=!0,L.stepTwo=!1,L.stepTwoB=!1,L.stepThree=!1,L.stepOneLoading=!0,L.stepThreeFormCollection=[],L.sampleDataQuantity=50,L.sampleDataReduction=50,L.search={},L.search2={fieldName:""},L.systemStatus="Normal",L.optionStatus={firstOpen:!0,secondOpen:!1,thirdOpen:!1,fourthOpen:!1},L.formFields=[{type:"input",key:"Name"},{type:"input",key:"Location"},{type:"textarea",key:"Description"},{type:"input3",key:"Browse",data:{inputType:"file"},ngModelAttrs:{fileAccept:{attribute:"accept"},fileUploaderMarkup:{attribute:"ngf-select"},fileUploaderMultipleMarkup:{attribute:"ngf-multiple"}},templateOptions:{fileAccept:".csv",fileUploaderMarkup:"",fileUploaderMultipleMarkup:!0},expressionProperties:{"templateOptions.disabled":"!(model.Name || model.Location || model.Description)"}}],L.waitingMessage="File Uploading",o.$watch(function(){return L.stepOne},function(e){e===!0?o.$emit("dynamicBackground"):e===!1&&o.$emit("removeDynamicBackground")}),l.on("importerListData",function(t){"Normal"===L.systemStatus&&(e.cancel(L.promiseToSolve),console.log("called"),0!==t.length?(L.importerList=L.importerList.concat(t),L.stepOneLoading=!1,angular.element(".js-layout").addClass("hidden")):console.log(L.importerList))}),l.on("importerData",function(t){if("Normal"===L.systemStatus)if(e.cancel(L.requestImporterPromiseToSolve),0!==t.length)L.currentDataItem=t[0],console.log(t[0]),L.stepOne=!1,L.stepTwo=!1,L.stepTwoB=!0,L.stepThree=!1,L.importerToDisplayContent=t;else if(0===t.length&&(console.log(L.importerToDisplayContent),L.importerToDisplayContent.forEach(function(e,t,o){l.emit("requestImporterDataItemData",{fieldName:e.fieldName,location:L.importerToDisplay.location})}),0===L.importerToDisplayContent.length)){for(var o=!1,a=0;a<L.alerts.stepOne.length;a++)"Received Empty Importer"===L.alerts.stepOne[a].msg&&(o=!0);o||L.alerts.stepOne.push({type:"warning",msg:"Received Empty Importer"})}}),l.on("importerDataItemData",function(e){"Normal"===L.systemStatus&&(0!==e.data.length?(L.importerDataItemToDisplay[e.name]||(L.importerDataItemToDisplay[e.name]=[]),L.importerDataItemToDisplay[e.name]=L.importerDataItemToDisplay[e.name].concat(e.data)):0===e.data.length&&L.importerDataItemToDisplay[L.currentDataItem.fieldName].length&&0===L.importerDataItemData.length&&(L.importerDataItemData=L.importerDataItemToDisplay[L.currentDataItem.fieldName],console.log(L.importerDataItemData)))});var O=[];l.on("importerCreationResponse",function(e){"Normal"===L.systemStatus&&(0!==e.data.length?O=O.concat(e.data):(console.log(L.stepThreeFormCollection),L.stepThreeFormCollection=n(O),L.importerCreationMeta={importerName:e.importerName,location:e.location,userName:e.userName,files:e.files,description:e.description},O=[],L.stepOne=!1,L.stepTwo=!1,L.stepTwoB=!1,L.stepThree=!0))}),l.on("importerCreationFinalResponse",function(e){if("Normal"===L.systemStatus&&"SUCCESS"===e.reply)if(0!==e.list_out)L.importerToDisplay={importerName:e.importerName,location:e.location,ownerName:e.ownerName},L.currentDataItem=e.list_out[0],L.stepOne=!1,L.stepTwo=!1,L.stepTwoB=!0,L.stepThree=!1,L.importerToDisplayContent=e.list_out,L.importerToDisplayContent.forEach(function(e,t,o){l.emit("requestImporterDataItemData",{fieldName:e.fieldName,location:L.importerToDisplay.location})});else if(0===L.importerToDisplayContent.length){for(var t=!1,o=0;o<L.alerts.stepThree.length;o++)"Created Empty Importer"===L.alerts.stepThree[o].msg&&(t=!0);t||L.alerts.stepThree.push({type:"warning",msg:"Created Empty Importer"})}}),L.activate()}angular.module("Dave2.Importer").controller("ImporterUploadCtrl",e),e.$inject=["$timeout","$http","$scope","$modal","Upload","FormSettingParseService","ImporterSocket"]}();