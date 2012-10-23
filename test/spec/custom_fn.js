describe("custom function", function() {
  var form;
  var input;
  
  beforeEach(function() {
    form = $('form');
    input = $('form').find('input');
    input.val("");
  });

  it("should validate against a custom function", function() {
    form.rvalidate({
      'input[name=test]': {
        custom_fn: {
          fn: function(val) {
            var index = val.indexOf('foobar');
            if(index == -1) {
              return false;
            }
            return true;
          },
          not_custom_fn: "Must have foobar in the field somewhere."
        }
      }
    })

    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  })


  it("should fail validate against a custom function", function() {
    form.rvalidate({
      'input[name=test]': {
        custom_fn: {
          fn: function(val) {
            var index = val.indexOf('foobar');
            if(index == -1) {
              return false;
            }
            return true;
          },
          not_custom_fn: "Must have foobar in the field somewhere."
        }
      }
    })

    input.val('foobar');
    valid = form.rvalidate();
    expect(valid.length).toEqual(0);
  })


});