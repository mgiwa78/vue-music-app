import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  numeric,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alphaSpaces', alphaSpaces)
    defineRule('email', email)
    defineRule('numeric', numeric)
    defineRule('maxVal', maxVal)
    defineRule('minVal', minVal)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('contry_excluded', excluded)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is to long`,
          alphaSpaces: `The field ${ctx.field} mau only contain alphabetical characters and single spacing`,
          email: `The field ${ctx.field} must be a valid email`,
          minVal: `The field ${ctx.field} is too low`,
          minVal: `The field ${ctx.field} is too low`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}`,
          contry_excluded: `Due to restrictions we do not accept users from this location ${ctx.field}`,
          passwords_mismatch: `The passwords dont match`,
          tos: `you must accpt the term of service`
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The fiels ${ctx.field} is invalid`

        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}