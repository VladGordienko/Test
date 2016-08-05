var per = angular.module("MyApp", ["kendo.directives"]);

per.controller("MyCtrl", ['$scope', function ($scope) {
    kendo.culture("en-GB");
    $scope.mainGridOptions = {
        dataSource: {
            transport: {
                read: "/api/temp/Get",
                dataType: "json"
            },
            pageSize: 20,
            schema: {
                model: {
                    fields: {
                        clientuniqcod: { type: "string" },
                        clientname: { type: "string" },
                        OKPO: { type: "string" },
                        regdate: { type: "date" },
                        exclusiondate: { type: "date" }
                    }
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
                           format: "{0:MM-dd-yyyy}"
                       },
                       {
                           field: "exclusiondate",
                           title: "Exclusiondate",
                           format: "{0:dd-MM-yyyy}"
                       }]
    };

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
                filter: { field: "clientuniqcod", operator: "eq", value: dataItem.clientuniqcod }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
            { field: "clientuniqcod", title: "Client Uniqcode" },
            { field: "personalcod", title: "Personal Code" },
            { field: "countname", title: "Count Name" },
            { field: "left", title: "Left" }
            ]
        };
    };
}
]
);

