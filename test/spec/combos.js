describe("combos", function() {
  var form;
  var input;
  
  beforeEach(function() {
    form = $('form');
    input = $('form').find('input');
    input.val("");
  });

  it("should validate a zip code", function() {
    var error = "Only 5 digit zip code please.";

    form.rvalidate({
      'input[name=test]': {
        presence: true,
        length: {
          iz: 5,
          wrong_length: error
        },
        numericality: {
          not_a_number: "This is not a number."
        }
      }
    })

    valid = form.rvalidate();
    first = valid.pop();
    errors = first['input[name=test]']
    expect(errors.length).toEqual(3);

    expect(errors[2]).toBe(error);
  })

  it("should validate a simple form", function() {
    var customError = "Please enter a last name.";
    form.rvalidate({
      'input[name=fname]': {
        presence: true,
      },
      'input[name=lname]': {
        presence: {
          blank: customError
        }
      }      
    })

    valid = form.rvalidate();
    expect(valid.length).toEqual(2);

    $('input[name=fname]').val('justin')
    valid = form.rvalidate();
    
    expect(valid.length).toEqual(1);

    expect(valid.pop()['input[name=lname]'].pop()).toBe(customError);
  })  
});