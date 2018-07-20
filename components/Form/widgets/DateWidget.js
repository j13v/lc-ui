import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '@material-ui/core/DatePicker';
import moment from 'moment';

const DateWidget = ({
  readonly,
  autofocus,
  value,
  onChange,
  onFocus,
  options,
  schema,
  formContext,
  registry,
  formatDate,
  errors,
  widget,
  ...others}) => {

  return (
    <DatePicker
        ref={(node) => (widget = node)}
        mode="landscape"
        openToYearSelection
        floatingLabelText={schema.title}
        hintText={schema.help}
        autoFocus={autofocus}
        readOnly={readonly}
        value={value && new Date(value)}
        onFocus={(event) => {
            if(widget){
                widget.openDialog();
            }
            if(onFocus){
                onFocus(event);
            }
        }}
        onChange={(noop, date) => (onChange(date ? moment(date).format(formatDate) : undefined))}
        {...others}/>
  );
}

if (process.env.NODE_ENV !== 'production') {
  DateWidget.propTypes = {
    value: PropTypes.string
  };
}

DateWidget.defaultProps = {
  formatDate: 'YYYY-MM-DD',
  fullWidth: true
};


export default DateWidget;

//onChange={(nop, date) => onChange(date ? moment(date).format() : undefined)}
