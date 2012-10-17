jQuery rValidate - Rails-esque form Validation
===


rValidate is a out of your way form validator. Just config with the inputs and conditions, and rvalidate will tell you if it is valid or not. If it is valid it will return an empty `[]`, but if not, it it will return an array of the fields with error objects, then you can do whatever you want with those errors.

r is prefixed as I inspired naming conventions from Rails page here [http://bit.ly/QoCDcf](http://bit.ly/QoCDcf). 

Just look at the examples:

**Standard**

```
$('form').rvalidate
  'input[name=fname]':
    presence: true
    length:
      minimum: 2
    
errors = $('form').rvalidate()

// Outputs
errors: {
  'input[name=test]': [
  "Field is required.",
  "I am too short."
  ]
}
```
**Custom Error**

```
$('form').rvalidate
  'input[name=fname]':
    presence:
      blank: "First name is required."
    length:
      minimum: 2
      too_short: "I am too short."
    
errors = $('form').rvalidate()

// Outputs
errors: {
  'input[name=fname]': [
  "First name is required.",
  "I am too short."
  ]
}
```

**Confirmation**

```
$('form').rvalidate
  'input[name=password]':
    confirmation:
      confirms_with: 'input[name=password_confirm]'

$('form').rvalidate
  'input[name=password]':
    confirmation:
      confirms_with: 'input[name=password_confirm]'
      not_confirmed: "The passwords do not match."
      
// Outputs
errors: {
  'input[name=password]': [
    "The passwords do not match.",
  ]
}
```

**C-C-C-Combo**

```
$('form').rvalidate
  'input[name=fname]':
    presence:
      blank: "First name is required."
    length:
      minimum: 2
  'input[name=lname]':
    presence:
      blank: "Last name is required."
  'input[name=email]':
    presence:
      blank: "E-mail is required."
    email: true
     
errors = $('form').rvalidate()

// Outputs
errors: {
  'input[name=fname]': [
    "First name is required.",
  ],
  'input[name=lname]': [
    "Last name is required.",
  ],
  'input[name=email]': [
    "E-mail is required.",
    "Not a valid e-mail address."
  ]   
}
```

**Production?**

```
// Same example in production (use your imagination).
errors = $('form').rvalidate()
if !errors.length
  # Success!
else
  # Error! display the errors somewhere… I'll figure it out on my own.
```

Full List Of Supported Validations
---
First example is the minimal usage if applicable. Second example is with customizations.

You probably notice some validations are implicitly testing for presence (like e-mail, length, etc.) so using presence on those is optional. Only use it if you want a custom presence message and an additional error, as presence is the first validation that gets checked.

**presence**

```
$('form').rvalidate
  'input[name=foo]':
    presence: true

$('form').rvalidate
  'input[name=foo]':
    presence:
      blank: "Custom message."
   
```

**confirmation**

```
$('form').rvalidate
  'input[name=foo]':
    confirmation:
      confirms_with: 'input[name=bar]'

$('form').rvalidate
  'input[name=foo]':
    confirmation:
      confirms_with: 'input[name=bar]'
      not_confirmed: "Custom message."
```
**email**

```
$('form').rvalidate
  'input[name=foo]':
    email: true

$('form').rvalidate
  'input[name=foo]':
    email:
      regex: /[a-z]/
      invalid_email: "Custom message."
```

**length**

```
# Validate charcter length of exactly 5
# I used "iz" becuase "is" highlights in CoffeeScript :P
$('form').rvalidate
  'input[name=foo]':
    length:
      iz: 5
      wrong_length: "Custom message. I am the wrong length!"

$('form').rvalidate
  'input[name=foo]':
    length:
      minimum: 5
      too_short: "Custom message, this is too short!"
      maximum: 10
      too_long: "Custom message, this is too long!"
```

**numericality**

```
$('form').rvalidate
  'input[name=foo]':
    numericality: true

$('form').rvalidate
  'input[name=foo]':
    numericality:
      equal_to: 100
  'input[name=bar]':
    numericality:
      greater_than: 50
      not_greater_than: "Custom message. I am not greater than."
      less_than: 100
      not_less_than: "Custom message. I am not less than."
            
```

Simple, and out of your way.

![Tests](http://i.imgur.com/9DKbU.png)

[@himrc](http://twitter.com/himrc)
===