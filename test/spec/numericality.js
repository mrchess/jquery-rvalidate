describe("numericality", function() {
  var form;
  var input;
  
  beforeEach(function() {
    form = $('form');
    input = $('form').find('input');
    input.val("");
  });

  it("should validate empty input", function() {
    form.rvalidate({
      'input[name=test]': {
        numericality: true
      }
    })

    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  });    
  it("should validate input with numeric", function() {
    form.rvalidate({
      'input[name=test]': {
        numericality: true
      }
    })
    input.val('1234')

    valid = form.rvalidate();
    expect(valid).toEqual([]);
  });   
  it("should validate input with letters", function() {
    form.rvalidate({
      'input[name=test]': {
        numericality: true
      }
    })
    input.val('Fail')

    valid = form.rvalidate();
    expect(valid.length).toEqual(1);
  });        
  it("should validate input with alphanumeric", function() {
    form.rvalidate({
      'input[name=test]': {
        numericality: true
      }
    })

    input.val('1abcd4')
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);

    input.val('1234f')
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);

    input.val('f1234')
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);            
  });    

  it("should validate equal to", function() {
    form.rvalidate({
      'input[name=test]': {
        numericality: {
          equal_to: 1234
        }
      }
    })
    input.val('1234')

    valid = form.rvalidate();
    expect(valid).toEqual([]);
  });

  it("should validate greater than", function() {
    form.rvalidate({
      'input[name=test]': {
        numericality: {
          greater_than: 100
        }
      }
    })
    
    input.val('100')
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);

      input.val('101')
    valid = form.rvalidate();
    expect(valid).toBeTruthy();
  });
  it("should validate less than", function() {
    form.rvalidate({
      'input[name=test]': {
        numericality: {
          less_than: 100
        }
      }
    })
    
    input.val('100')
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);

    input.val('99')
    valid = form.rvalidate();
    expect(valid).toBeTruthy();
  });      

  it("should validate greater than and less than", function() {
    form.rvalidate({
      'input[name=test]': {
        numericality: {
          less_than: 100,
          greater_than: 1
        }
      }
    })
    
    input.val('0')
    valid = form.rvalidate();
    expect(valid.length).toEqual(1);

    input.val('99')
    valid = form.rvalidate();
    expect(valid).toBeTruthy();
  });    
});