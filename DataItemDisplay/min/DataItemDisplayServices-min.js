!function(){"use strict";function t(t){var a=io.connect("10.3.83.58:3000/dataItemDisplay"),e=t({ioSocket:a});return e.forward("ipDataItemListResponse"),e.forward("ipDataItemResponse"),e}angular.module("Dave2.DataItemDisplay").factory("DataItemDisplaySocket",t),t.$inject=["socketFactory"]}();