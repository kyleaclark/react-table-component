'use strict';

/*================================
  Import Modules
----------------------------------*/

var React = require('react'),
    TableHead = require('./TableHead'),
    TableBody = require('./TableBody');

/*================================
  Module Globals
----------------------------------*/

var PropTypes = React.PropTypes;

/*================================
  Table Module
----------------------------------*/

var Table = React.createClass({

  propTypes: {

    /* Required  */

    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      property: PropTypes.string
    })).isRequired,

    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    sortBy: PropTypes.shape({
      property: PropTypes.string,
      order: PropTypes.oneOf([ 'ascending', 'descending' ])
    }).isRequired,

    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,

    /* Optional */

    className: PropTypes.string

  },

  /* Lifecycle Helpers */


  getDefaultProps: function () {
    return {
      className: ''
    }
  },

  componentWillMount: function () {
    var sortBy = this.props.sortBy,
        tableData = this.props.tableData;

    if (sortBy) {
      this.setState({
        sortBy: sortBy,
        tableData: this._sortData(sortBy, tableData)
      });
    }
  },

  /* Utility Helpers */

  /**
   * _onSort - sort data & set state for sortBy & tableData
   *
   * @param  {object} sortBy
   */
  _onSort: function (sortBy) {
    this.setState({
      sortBy: sortBy,
      tableData: this._sortData(sortBy, this.state.tableData)
    });
  },


  /**
   * _sortData - sort data by sort by order
   *
   * @param  {object} sortBy
   * @param  {array} tableData
   * @return {array}
   */
  _sortData: function (sortBy, tableData) {
    var sortedData,
        sortByProp = sortBy.property;

    sortedData = tableData.sort(function (a, b) {
      return a[sortByProp] < b[sortByProp] ? -1 : a[sortByProp] > b[sortByProp] ? 1 : 0;
    });

    if (sortBy.order === 'descending') {
      sortedData.reverse();
    }

    return sortedData;
  },

  /* Render */

  render: function () {
    var tableData = this.state.tableData,
        columns = this.props.columns,
        keys = this.props.keys,
        buildRowOptions = this.props.buildRowOptions,
        sortBy = this.state.sortBy,
        className = this.props.className,
        onSort = this._onSort;

    return (
      <table className={className}>
        <TableHead
          columns={columns}
          sortBy={sortBy}
          onSort={onSort}
        />
        <TableBody
          columns={columns}
          keys={keys}
          tableData={tableData}
        />
      </table>
    );
  }

});

/*================================
  Table Export
----------------------------------*/

module.exports = Table;
