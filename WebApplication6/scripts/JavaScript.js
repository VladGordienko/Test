var per = angular.module("MyApp", ["kendo.directives"]);

per.controller("MyCtrl", ['$scope', function ($scope) {
    kendo.culture("en-GB");
    Detail = {};
    $scope.detail = Detail;

    $scope.mainGridOptions = {
        dataSource: {
            transport: {
                read: "/api/temp/Get",
                dataType: "json"
            },
            pageSize: 20,
            schema: {
                //model: {
                //    fields: {
                //        clientuniqcod: { type: "string" },
                //        clientname: { type: "string" },
                //        OKPO: { type: "string" },
                //        regdate: { type: "date" },
                //        exclusiondate: { type: "date" }
                //    }
                //}

                parse: function (response) {
                    angular.forEach(response, function (idx, elem) {
                        if (elem.regdate && typeof elem.regdate === "string") {
                            elem.regdate = kendo.parseDate(elem.regdate, "dd/MM/yyyy");
                        }
                        if (elem.exclusiondate && typeof elem.exclusiondate === "string") {
                            elem.exclusiondate = kendo.parseDate(elem.exclusiondate, "dd/MM/yyyy");
                        }
                    });
                    return response;
                }


            }
            
        },
        height: 550,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        scrollable: true,
        filterable: true,
        columns: [{
            field: "clientuniqcod",
            title: "Uniqcode"
        },
                       {
                           field: "clientname",
                           title: "Name"
                       },
                       {
                           field: "OKPO",
                           title: "OKPO"
                       },
                       {
                           field: "regdate",
                           title: "Regdate",
                           type: "date",
                           format: "{0:dd/MM/yyyy}"
                       },
                       {
                           field: "exclusiondate",
                           title: "Exclusiondate",
                           type: "date",
                           format: "{0:dd/MM/yyyy}"
                       }]
    }
    ;

    $scope.detailGridOptions = function (dataItem) {
        return {
            dataSource: {
                transport: {
                    read: "/api/temp/GetValues",
                    dataType: "json"
                },
                pageSize: 5,
                sortable: {
                    mode: "single",
                    allowUnsort: false
                },
                scrollable: true,
                filter: { field: "personalcod", operator: "eq", value: dataItem.clientuniqcod }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
            { field: "clientuniqcod", title: "Account Uniqcode" },
            { field: "personalcod", title: "Client Code" },
            { field: "countname", title: "Count Name" },
            { field: "left", title: "Left" }
            ]
        };
    };


    //$scope.detailChild = function () {
    //    $http({
    //        method: "GET",
    //        url: "/api/temp/GetValuesChild" + id,
    //        dataType:"json"
    //    }).success(function (data, status, headers, config) {
    //        Detail.clientuniqcod = data[0].clientuniqcod;
    //        Detail.countname = data[0].countname;
    //        Detail.dataOpen = data[0].dataOpen;
    //        Detail.left = data[0].left;
    //        Detail.plainleft = data[0].plainleft;
    //    }).error(function (data, status, headers, config) {
    //        console.log("error " + data);
    //    });
    //};

    $scope.filterInit = function (e) {
        //alert('the type is -> ' + e.sender.dataSource.options.schema.model.fields[e.field].type);
        if (e.field == "regdate" || e.field == "exclusiondate") {
            var beginOperator = e.container.find("[data-role=dropdownlist]:eq(0)").data("kendoDropDownList");
            beginOperator.value("gte");
            beginOperator.trigger("change");

            var endOperator = e.container.find("[data-role=dropdownlist]:eq(2)").data("kendoDropDownList");
            endOperator.value("lte");
            endOperator.trigger("change");
        }
    };

    var start = $("#start").kendoDatePicker({
        change: startChange
    }).data("kendoDatePicker");

    var end = $("#end").kendoDatePicker({
        change: endChange
    }).data("kendoDatePicker");


        function startChange() {
            var startDate = start.value(),
            endDate = end.value();

            if (startDate) {
                startDate = new Date(startDate);
                startDate.setDate(startDate.getDate());
                end.min(startDate);
            } else if (endDate) {
                start.max(new Date(endDate));
            } else {
                endDate = new Date();
                start.max(endDate);
                end.min(endDate);
            }
        }

        function endChange() {
            var endDate = end.value(),
            startDate = start.value();

            if (endDate) {
                endDate = new Date(endDate);
                endDate.setDate(endDate.getDate());
                start.max(endDate);
            } else if (startDate) {
                end.min(new Date(startDate));
            } else {
                endDate = new Date();
                start.max(endDate);
                end.min(endDate);
            }
        }

        
        start.max(end.value());
        end.min(start.value());

        $scope.pullData = function () {
            var Data = {
                FromDate: start._oldText,
                ToDate: end._oldText
            };
        };

}]);