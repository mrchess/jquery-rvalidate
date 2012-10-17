describe("email", function() {
  var form;
  var input;
  
  beforeEach(function() {
    form = $('form');
    input = $('form').find('input');
    input.val("");
  });

  it("should reject blank e-mail", function() {
    form.rvalidate({
      'input[name=test]': {
        email: true
      }
    })

    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  });

  it("should reject bad e-mail", function() {
    form.rvalidate({
      'input[name=test]': {
        email: true
      }
    })
    input.val("foo@bar");

    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  });

  it("should accept valid e-mail", function() {
    form.rvalidate({
      'input[name=test]': {
        email: true
      }
    })

    input.val("foo@bar.com");

    valid = form.rvalidate();
    expect(valid).toEqual([]);
  })  

  it("should accept custom regex", function() {
    form.rvalidate({
      'input[name=test]': {
        email: {
          regex: /[a-z]/
        }
      }
    });

    input.val("f");
    valid = form.rvalidate();
    expect(valid).toEqual([]);

    input.val("1");
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);  
  })  

});