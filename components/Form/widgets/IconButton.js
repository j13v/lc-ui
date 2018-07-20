import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const IconButton = ({
    options,
    schema,
    disabled,
    formContext,
    icon,
    children,
    widgets, ...others}) => {

    return (
    <Button
        disabled={disabled}
        icon={icon ? icon : (<Icon className="material-icons">{children}</Icon>)}
        {...others}
    />
    );
}

// BaseInput.defaultProps = {
//   type: "text",
//   required: false,
//   disabled: false,
//   readonly: false,
//   autofocus: false,
//   fullWidth: true
// };
//
// if (process.env.NODE_ENV !== "production") {
//   BaseInput.propTypes = {
//     id: PropTypes.string.isRequired,
//     placeholder: PropTypes.string,
//     value: PropTypes.any,
//     required: PropTypes.bool,
//     disabled: PropTypes.bool,
//     readonly: PropTypes.bool,
//     autofocus: PropTypes.bool,
//     onChange: PropTypes.func,
//     onBlur: PropTypes.func,
//     onFocus: PropTypes.func,
//   };
// }


export default IconButton;
