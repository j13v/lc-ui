import React from 'react';
import PropTypes from 'prop-types';
import RandExp from 'randexp';
import TextField from '@material-ui/core/TextField';

const BaseInput = ({
    value,
    readonly,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options,
    schema,
    formContext,
    errors = [],
    registry, ...others}) => {
    others.type = options.inputType || others.type || "text";
    const _onChange = ({ target: { value } }) => {
      return others.onChange(value === "" ? options.emptyValue : value);
    };

    if(schema.pattern && value){
        const pattern = new RegExp(schema.pattern);
        if(!pattern.test(value)) {
            errors.push(`Wrong format example ${new RandExp(pattern).gen()}`);
        }
    }

    others.max = (others.max || (schema.type === 'number' && (schema.maximum - !!schema.exclusiveMaximum))) || undefined
    others.min = (others.min || (schema.type === 'number' && schema.minimum)) || undefined

    others.title = `${schema.pattern ? 'press shift + enter to generate an example ': ''}${schema.help||schema.description||''}`
    if(schema.type === 'number'){
        value = Math.max(Math.min(value || 0, others.max || Infinity), others.min || -Infinity);
    }

    return (<TextField
      readOnly={readonly}
      disabled={disabled}
      floatingLabelText={schema.title}
      minLength={typeof schema.length === 'number' ? schema.length : schema.minLength}
      maxLength={typeof schema.length === 'number' ? schema.length : schema.maxLength}
      pattern={schema.pattern}
      hintText={others.title.substring(0, 90)}
      errorText={errors[0]}
      autoFocus={autofocus}
      value={value == null ? '' : value}
      {...others}
      type={schema.type === 'number' ? 'number' : others.type}
      onChange={_onChange}
      onKeyPress={(event) => {
          const charCode = event.keyCode || event.charCode;
          if(schema.pattern && event.shiftKey && charCode === 13) {
              const pattern = new RegExp(schema.pattern);
              event.preventDefault();
              event.currentTarget.value = new RandExp(pattern).gen();
              _onChange(event, event.currentTarget.value);
          }
      }}
      onBlur={onBlur && (event => onBlur(others.id, event.target.value))}
      onFocus={onFocus && (event => onFocus(others.id, event.target.value))}
    />);
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  fullWidth: true
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}


export default BaseInput;

/*errorText={schema.description}
errorStyle={{color: '#CCCCCC'}}
underlineFocusStyle={{color: '#00bcd4'}}
floatingLabelFocusStyle={{color: '#00bcd4'}}*/
