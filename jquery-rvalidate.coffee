###
jQuery rValidator Plugin 0.0.4
http://github.com/mrchess/jquery-rvalidate
Copyright (c) 2012 Justin Ho
This is free. Do whatever.
###

# This is placed outside for performance.
emailRegEx = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/
emailRegEx = new RegExp(emailRegEx)  
      
error_defaults =
  invalid_email: "Not a valid e-mail address."
  presence: "Field is required."
  not_a_number: "Field is not a number."
  not_greater_than: "Value is too small."
  not_less_than: "Value is too large."
  not_equal_to: "Not equal to."
  too_short: "Value is too short."
  too_long: "Value is too long."
  wrong_length: "Value is wrong length."
  not_confirmed: "Values do not match."
  not_regex: "Value is not valid."
  not_custom_fn: "Value is not valid."


$.fn.rvalidate = (config) ->
  if config
    $(@).data('rvalidator', config)
    return true
  else
    config = $(@).data('rvalidator')
    @errors = []
    form = $(@)

    for selector, validations of config
      el = form.find(selector)
      val = el.val()
      errors = []

      # validate presence
      presence = validations.presence
      if presence
        if !val.length
          errors.push(presence.blank || error_defaults.presence)

      # validates numericality
      numericality = validations.numericality
      if numericality
        temp_val = val.replace(',' , '') # remove commas for digits

        # a copy of the val removing characters, ["-",","]
        cleaned = val.replace(/\,/g, '') 
        cleaned = cleaned.replace(/\./g, '') 
        cleaned = cleaned.replace(/\-/g, '') 

        if cleaned.match(/\D/) or !cleaned.length
          errors.push(numericality.not_a_number || error_defaults.not_a_number)
        else if temp_val.indexOf('-') > 0 # test negaitve number
          errors.push(numericality.not_a_number || error_defaults.not_a_number)
        else
          # equal to
          if numericality.equal_to != undefined
            if parseInt(temp_val) != numericality.equal_to
              errors.push(numericality.not_equal_to || error_defaults.not_equal_to)            
          # greater than
          if numericality.greater_than != undefined
            if parseInt(temp_val) <= numericality.greater_than
              errors.push(numericality.not_greater_than || error_defaults.not_greater_than)

          # less than
          if numericality.less_than != undefined
            if parseInt(temp_val) >= numericality.less_than
              errors.push(numericality.not_less_than || error_defaults.not_less_than)

      # validates email
      email = validations.email
      if email
        if email.regex
          valid = new RegExp(email.regex).test(val)
        else
          valid = emailRegEx.test(val)
        if !valid
          errors.push(email.invalid_email || error_defaults.invalid_email)

      # validates length
      length = validations.length
      if length
        if length.iz # "iz" because "is" highlights in CoffeeScript :P
          if val.length != length.iz
            errors.push(length.wrong_length || error_defaults.wrong_length)

        if length.minimum
          if val.length < length.minimum
            errors.push(length.too_short || error_defaults.too_short)

        if length.maximum
          if val.length > length.maximum
            errors.push(length.too_long || error_defaults.too_long)

      # validates confirmation
      confirmation = validations.confirmation
      if confirmation
        confirmInput = form.find(confirmation.confirms_with)
        if confirmInput.length
          if val != confirmInput.val()
            errors.push(confirmation.not_confirmed || error_defaults.not_confirmed)
        else
          throw "Missing input to confirm with."

      # validate regex
      custom_regex = validations.custom_regex
      if custom_regex
        valid = new RegExp(custom_regex.regex).test(val)
        if !valid
          errors.push(custom_regex.not_regex || error_defaults.not_regex)


      # validate custom fn
      custom_fn = validations.custom_fn
      if custom_fn
        valid = custom_fn.fn(val)
        if !valid
          errors.push(custom_fn.not_custom_fn || error_defaults.not_custom_fn)

      # done validating
      if errors.length
        o = {}
        o["#{selector}"] = errors
        @errors.push o

  if @errors.length then return @errors else []