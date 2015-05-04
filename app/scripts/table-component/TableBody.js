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

var TableBody = React.createClass({

  propTypes: {

    /* Required */

    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      property: PropTypes.string
    })).isRequired,

    keys: PropTypes.arrayOf(PropTypes.string).isRequired,

    tableData: PropTypes.arrayOf(PropTypes.object).isRequired

  },

  /* Utility Helpers */

  /**
   * _buildGetKeys - Closure function for mapping data by keys
   *
   * @param  {type} keys description
   * @return {function}
   */
  _buildGetKeys: function (keys) {
    return function (data) {
      return keys.map(function (key) {
        return data[key];
      });
    }
  },

  /* Render Helpers */

  /**
   * _renderRows - Create row elements to render
   *
   * @param  {array} tableData
   * @param  {array} columns
   * @param  {array} keys
   * @return {*}
   */
  _renderRows: function (tableData, columns, keys) {
    var getKeys = this._buildGetKeys(keys);

    return tableData.map(function (row) {
      return (
        <tr key={getKeys(row)}>
          {columns.map(function (col, index) {
            return (
              <td key={index}>
                {row[col.property]}
              </td>);
          })}
        </tr>);
    });
  },

  /* Render */

  render: function () {
    var rows,
        tableData = this.props.tableData,
        columns = this.props.columns,
        keys = this.props.keys;

    rows = this._renderRows(tableData, columns, keys);

    return (
      <tbody>
        {rows}
      </tbody>
    );
  }

});

/*================================
  TableBody Export
----------------------------------*/

module.exports = TableBody;
