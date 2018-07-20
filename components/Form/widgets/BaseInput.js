import React from 'react';
import PropTypes from 'prop-types';
import RandExp from 'randexp';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';

export const styles = theme => ({
    form_control: {
        // 'margin-bottom': theme.spacing.unit
        'margin-bottom': '1em'
    }
})

export const BaseInput = ({classes, registry, ...props}) => {
  console.log(props);
    const {label, id} = props,
          {FormattedMessage} = registry.widgets;

    return (<FormControl fullWidth className={classes.form_control}>
      <InputLabel htmlFor={`adornment-${id}`}><FormattedMessage id={id} defaultMessage={label}/></InputLabel>
      <Input id={`adornment-${id}`}/>
    </FormControl>)
}

BaseInput.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BaseInput);

/*errorText={schema.description}
errorStyle={{color: '#CCCCCC'}}
underlineFocusStyle={{color: '#00bcd4'}}
floatingLabelFocusStyle={{color: '#00bcd4'}}*/
