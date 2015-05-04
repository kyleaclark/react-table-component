'use strict'

/*================================
  Import Modules
----------------------------------*/

var React = require('react'),
    Table = require('./table-component/Table'),
    TableData = require('./data/TableData');

/*================================
  Module Globals
----------------------------------*/

var mountNode = document.getElementById("app");

/*================================
  Table Module
----------------------------------*/

var TableComponent = React.createClass({

  /* Utility Helpers */

  _buildTableColumns: function () {
    return [
      { label: 'Name', property: 'name' },
      { label: 'City', property: 'city' },
      { label: 'Address', property: 'address' },
      { label: 'Region', property: 'region' },
      { label: 'Country', property: 'country' },
      { label: 'Birthday', property: 'birthday' }
    ];
  },

  /* Render */

  render: function () {
    var tableColumns = this._buildTableColumns(),
        tableData = TableData,
        sortBy = {
          property: 'name',
          order: 'ascending'
        };

    return (
      <Table
        className="table-component"
        columns={tableColumns}
        keys={['name', 'city', 'address']}
        sortBy={sortBy}
        tableData={tableData}
      />
    );
  }

});

/*================================
  Initialization
----------------------------------*/

React.render(<TableComponent />, mountNode);
