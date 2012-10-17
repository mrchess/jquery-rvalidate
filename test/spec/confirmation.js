describe("confirmation", function() {
  var form;
  var input;
  
  beforeEach(function() {
    form = $('form');
    input = $('form').find('input');
    input.val("");
  });

  it("should validate two fields", function() {
    var msg = "DOES NOT MATCH";
    form.rvalidate({
      'input[name=fname]': {
        confirmation: {
          not_confirmed: msg,
          confirms_with: 'input[name=lname]'
        }
      }
    })

    errors = form.rvalidate();
    expect(errors.length).toEqual(0);

    form.find('input[name=lname]').val('blah')
    errors = form.rvalidate();
    expect(errors.length).toEqual(1);

    expect(errors.pop()['input[name=fname]'].pop()).toBe(msg);
  })
});