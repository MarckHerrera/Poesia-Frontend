import { TextField } from '@mui/material';
import React, { useCallback } from 'react'

export const matchNothingRegex = /(?!)/;

const RegexTextField = ({ regex, onChange, ...rest }) => {
    const handleChange = useCallback(
      (e) => {
        e.currentTarget.value = e.currentTarget.value.replace(regex, "");
        onChange(e);
      },
      [onChange, regex]
    );
  
    return <TextField onChange={handleChange} {...rest} />;
  };
  
  export default React.memo(RegexTextField);