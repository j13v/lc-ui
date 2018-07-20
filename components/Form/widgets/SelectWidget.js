import React from "react";
import PropTypes from "prop-types";
import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { asNumber } from 'react-jsonschema-form/lib/utils';

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue({ type, items }, value) {
  if (value === "") {
    return undefined;
  } else if (
    type === "array" &&
    items &&
    ["number", "integer"].includes(items.type)
  ) {
    return value.map(asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }
  return value;
}

function getValue(event, value, multiple) {
  if (multiple) {
    return [].slice
      .call(value || event.target.options)
      .filter(o => o.selected)
      .map(o => o.value);
  } else {
    return value || event.target.value;
  }
}

function SelectWidget(props) {
  const {
    schema,
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    multiple,
    autofocus,
    errors = [],
    onChange,
    onBlur,
    onFocus,
    placeholder,
  } = props;
  const { enumOptions, enumDisabled } = options;
  const emptyValue = multiple ? [] : "";

  return (
    <Select
      floatingLabelText={schema.title}
      id={id}
      multiple={multiple}
      fullWidth
      errorText={errors[0]}
      value={typeof value === "undefined" ? emptyValue : value}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      onBlur={
        onBlur &&
        ((event, index, value) => {
          const newValue = getValue(event, value, multiple);
          onBlur(id, processValue(schema, newValue));
        })
      }
      onFocus={
        onFocus &&
        ((event, index, value) => {
          const newValue = getValue(event,value,  multiple);
          onFocus(id, processValue(schema, newValue));
        })
      }
      onChange={(event, index, value) => {
        const newValue = getValue(event, value, multiple);
        onChange(processValue(schema, newValue));
      }}>
      {!multiple && !schema.default && <MenuItem value="" primaryText={placeholder}></MenuItem>}
      {!enumOptions.length && <MenuItem primaryText={Empty}></MenuItem>}
      {enumOptions.map(({ value, label }, i) => {
        const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
        return (
          <MenuItem key={value} value={value} disabled={disabled} label={label} primaryText={label}/>
        );
      })}
    </Select>
  );
}

SelectWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default SelectWidget;
