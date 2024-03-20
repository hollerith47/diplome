import PropTypes from "prop-types";

//form
import {Controller, useFormContext} from "react-hook-form";

// @mui
import {TextField} from "@mui/material";

RHFTextField.prototype = {
    name: PropTypes.string,
    helpText: PropTypes.node,
};

export default function RHFTextField({name, helperText, ...other}){
    const {control } = useFormContext();
    return (
      <Controller
        name={name}
        control={control}
        render={({field, fieldState: {error}})=> (
          <TextField
            {...field}
            fullWidth
            value={
                typeof  field.value === "number" && field.value === 0
                  ? ""
                  : field.value
            }
            error={!!error}
            helperText={error ? error.message : helperText}
            {...other}/>
        )} />
    )
}
