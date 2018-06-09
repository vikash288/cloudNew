angular.module('multi-select-tree').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/multi-select-tree.tpl.html',
    "<div class=\"tree-control-select\">\n" +
    "\n" +
    "    <div class=\"tree-input\"  ng-click=\"onControlClicked($event)\">\n" +
    "    <span ng-if=\"selectedItems.length == 0\" class=\"selected-items\">\n" +
    "      <span ng-bind=\"defaultLabel\"></span>\n" +
    "    </span>\n" +
    "    <span ng-if=\"selectedItems.length > 0\" class=\"selected-items\">\n" +
    "      <span ng-repeat=\"selectedItem in selectedItems\" class=\"selected-item\">{{selectedItem.name}}  </span>\n" +
    "        <span class=\"caret\"></span>\n" +
    "    </span>\n" +
    "        <!-- <input type=\"text\" class=\"blend-in\" /> -->\n" +
    "    </div>\n" +
    "    <div class=\"tree-view\" ng-show=\"showTree\">\n" +
    "        <div class=\"helper-container\">\n" +
    "             <div class=\"line\" data-ng-if=\"switchView\">\n" +
    "                 <button type=\"button\" ng-click=\"switchCurrentView($event);\" class=\"helper-button\">{{switchViewLabel}}</button>\n" +
    "             </div>\n" +
    "            <div class=\"line\">\n" +
    "                <input placeholder=\"Search...\" type=\"text\" ng-model=\"filterKeyword\" ng-click=\"onFilterClicked($event)\"\n" +
    "                       class=\"input-filter\">\n" +
    "                <span class=\"clear-button\" ng-click=\"clearFilter($event)\"><span class=\"item-close\"></span></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <ul class=\"tree-container\">\n" +
    "            <tree-item-Select class=\"top-level\" ng-repeat=\"item in inputModel\" item=\"item\" ng-show=\"!item.isFiltered\"\n" +
    "                       use-callback=\"useCallback\" can-select-item=\"canSelectItem\"\n" +
    "                       multi-select=\"multiSelect\" item-selected=\"itemSelected(item)\"\n" +
    "                       on-active-item=\"onActiveItem(item)\" select-only-leafs=\"selectOnlyLeafs\"></tree-item-Select>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('src/tree-item.select.tpl.html',
    "<li>\n" +
    "    <div class=\"item-container\" ng-class=\"{active: item.isActive, selected: item.selected}\"\n" +
    "          >\n" +
    "        <span ng-if=\"showExpand(item)\" class=\"expand\" ng-class=\"{'expand-opened': item.isExpanded}\"\n" +
    "              ng-click=\"onExpandClicked(item, $event)\"></span>\n" +
    "\n" +
    "        <div class=\"item-details\"><input  ng-click=\"clickSelectItem(item, $event)\" class=\"tree-checkbox\"  ng-if=\"item.checkbox\"  type=\"radio\" \n"  +
    "                                         ng-checked=\"item.selected\"/><i class={{item.icon}}></i> {{item.name}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <ul ng-repeat=\"child in item.children\" ng-if=\"item.isExpanded\">\n" +
    "        <tree-item-Select item=\"child\" item-selected=\"subItemSelected(item)\" use-callback=\"useCallback\"\n" +
    "                   can-select-item=\"canSelectItem\" multi-select=\"multiSelect\"\n" +
    "                   on-active-item=\"activeSubItem(item, $event)\"></tree-item-Select>\n" +
    "    </ul>\n" +
    "</li>\n"
  );

}]);
