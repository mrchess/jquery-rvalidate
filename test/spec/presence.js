describe("presence", function() {
  var form;
  var input;
  
  beforeEach(function() {
    form = $('form');
    input = $('form').find('input');
    input.val("");
  });

  it("should validate presence of", function() {
    form.rvalidate({
      'input[name=test]': {
        presence: true
      }
    })

    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  })
});