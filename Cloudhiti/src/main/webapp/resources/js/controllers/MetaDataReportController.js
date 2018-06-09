/* Setup bucket page controller */
angular.module('WebApp').controller('MetaDataReportController' , ['$state', '$stateParams','$rootScope', '$scope', 'settings', 'ListWorkFlow', function($state , $stateParams, $rootScope, $scope,settings, ListWorkFlow ) {

		$scope.$on('$viewContentLoaded', function() {   
        // initialize core components
			
			
			
			 var initTable = function () {

		            var table = $('.sample');

		            table.dataTable({

		                // Internationalisation. For more info refer to http://datatables.net/manual/i18n
		                "language": {
		                    "aria": {
		                        "sortAscending": ": activate to sort column ascending",
		                        "sortDescending": ": activate to sort column descending"
		                    },
		                    "emptyTable": "No data available in table",
		                    "info": "Showing _START_ to _END_ of _TOTAL_ records",
		                    "infoEmpty": "No records found",
		                    "infoFiltered": "(filtered1 from _MAX_ total records)",
		                    "lengthMenu": "Show _MENU_",
		                    "search": "Search:",
		                    "zeroRecords": "No matching records found",
		                    "paginate": {
		                        "previous":"Prev",
		                        "next": "Next",
		                        "last": "Last",
		                        "first": "First"
		                    }
		                },

		                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
		                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
		                // So when dropdowns used the scrollable div should be removed. 
		                //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

		                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
		                "pagingType": "bootstrap_extended",

		                "lengthMenu": [
		                    [2, 15, 20, -1],
		                    [2, 15, 20, "All"] // change per page values here
		                ],
		                // set the initial value
		                "pageLength": 2,
		                "columnDefs": [{  // set default column settings
		                    'orderable': false,
		                    'targets': [0]
		                }, {
		                    "searchable": false,
		                    "targets": [0]
		                }],
		                "order": [
		                    [1, "desc"]
		                ] // set first column as a default sort by asc
		            });

		            var tableWrapper = jQuery('.sample');
		 
		           
		        }
		        initTable();
		        
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        
    });
}]);
 