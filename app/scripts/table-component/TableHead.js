'use strict';

/*================================
  Import Modules
----------------------------------*/

var React = require('react');

/*================================
  Module Globals
----------------------------------*/

var PropTypes = React.PropTypes;

/*================================
  Table Module
----------------------------------*/

var TableHead = React.createClass({

  propTypes: {

    /* Required */

    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      property: PropTypes.string
    })).isRequired,

    onSort: PropTypes.func.isRequired,

    sortBy: PropTypes.shape({
      property: PropTypes.string,
      order: PropTypes.oneOf([ 'ascending', 'descending' ])
    }).isRequired

  },

  /* Utility Helpers */

   /**
    * _buildHeaderAttrs - build attrs & event handlers for table headers
    *
    * @param  {object} col
    * @param  {object} sortBy
    * @param  {function} onSort
    * @return {*}
    */
   _buildHeaderAttrs: function (col, sortBy, onSort) {
     var sortOrder = sortBy.property === col.property ? sortBy.order : 'none',
         nextSortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';

     return {
       'onClick': onSort.bind(null, { property: col.property, order: nextSortOrder }),
       'onMouseDown': function (ev) { ev.preventDefault(); },
       'data-sort': sortOrder
     };
   },

  /* Render Helpers */

  /**
   * _renderHeaders - Create header elements to render
   *
   * @param  {array} columns
   * @param  {object} sortBy
   * @param  {function} onSort
   * @return {*}
   */
  _renderHeaders: function (columns, sortBy, onSort) {
    var sortAttrs,
        sortOrder,
        buildHeaderAttrs = this._buildHeaderAttrs;

    return columns.map(function (col, index) {
      sortAttrs = buildHeaderAttrs(col, sortBy, onSort);
      sortOrder = sortAttrs['data-sort'];

      return (
        <th
          key={index}
          {...sortAttrs}>
          <span>{col.label}</span>
          <span className={`sort-icon sort-${sortOrder}`} />
        </th>
      );
    });
  },

  render: function () {
    var headers,
        columns = this.props.columns,
        sortBy = this.props.sortBy,
        onSort = this.props.onSort;

    // Get header elements to render
    headers = this._renderHeaders(columns, sortBy, onSort);

    return (
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
    );
  }

});

/*================================
  TableHead Export
----------------------------------*/

module.exports = TableHead;
