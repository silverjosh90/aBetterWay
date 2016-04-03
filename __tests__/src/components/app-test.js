jest.dontMock('../../../public/src/components/app.js')


var React = require('react')
var jQuery = require('jquery')
var $ = require('jquery')
var TestUtils = require('react-addons-test-utils')

describe("the main app module", function(){
  describe('should display a name', function(){
    it('should display the name of the item', function(){
      var App = require('../../../public/src/components/app.js')
      var name="Josh"

      var app = TestUtils.renderIntoDocument(
          <App name={name} />
        );

      var label = TestUtils.findRenderedDOMComponentWithTag(app,'h2')

      expect(label.textContent).toEqual(name);

    })
  })
})
