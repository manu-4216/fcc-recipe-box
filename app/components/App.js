var React = require('react');
var Header = require('../components/Header');
var Table = require('../components/Table');
var Footer = require('../components/Footer');
require('../main.scss');

var App = function(props) {
  return (
    <div>
      <Header />
      <Table />
      <Footer />
    </div>
  )
};

module.exports = App;
