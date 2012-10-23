describe("regex", function() {
  var form;
  var input;
  
  beforeEach(function() {
    form = $('form');
    input = $('form').find('input');
    input.val("");
  });

  it("should not validate a custom regex", function() {
    form.rvalidate({
      'input[name=test]': {
        custom_regex: {
          regex: /[A-Z]/,
          not_regex: "Please enter letters only."
        }
      }
    })

    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  })

  it("should not pass a custom regex", function() {
    form.rvalidate({
      'input[name=test]': {
        custom_regex: {
          regex: /[A-Z]/,
          not_regex: "Please enter letters only."
        }
      }
    })

    input.val("ABC")
    valid = form.rvalidate();
    expect(valid.length).toEqual(0);
  })
});