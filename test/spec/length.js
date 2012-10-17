describe("length", function() {
  var form;
  var input;
  
  beforeEach(function() {
    form = $('form');
    input = $('form').find('input');
    input.val("");
  });

  it("should invalidate no length", function() {
    form.rvalidate({
      'input[name=test]': {
        length: {
          iz: 1
        }
      }
    })

    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  })

  it("should validate exact length", function() {
    form.rvalidate({
      'input[name=test]': {
        length: {
          iz: 4
        }
      }
    })

    input.val('1234');
    valid = form.rvalidate();
    expect(valid).toEqual([]);
  })


  it("should validate minimum length", function() {
    form.rvalidate({
      'input[name=test]': {
        length: {
          minimum: 3
        }
      }
    })

    input.val('1234');
    valid = form.rvalidate();
    expect(valid).toEqual([]);

    input.val('12');
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  })

  it("should validate maximum length", function() {
    form.rvalidate({
      'input[name=test]': {
        length: {
          maximum: 4
        }
      }
    })

    input.val('1234');
    valid = form.rvalidate();
    expect(valid).toEqual([]);

    input.val('12345');
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  })

  it("should validate minimum and maximum length", function() {
    form.rvalidate({
      'input[name=test]': {
        length: {
          minimum: 2,
          maximum: 4
        }
      }
    })

    input.val('1234');
    valid = form.rvalidate();
    expect(valid).toEqual([]);

    input.val('1');
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);

    input.val('12345');
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);    
  })  
});