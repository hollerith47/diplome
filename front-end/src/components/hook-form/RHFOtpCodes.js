import React from 'react';
import {Stack, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

const RHFOtpCodes = ({keyName = "", inputs = [], ...other}) => {
    const codesRef = React.useRef(null);
    const {control} = useFormContext();
    const handleChangeWithNextField = (e, handleChange) => {
        const {maxLength, value, name} = e.target;
        const fieldIntIndex = Number(name.replace(keyName, ""));
        const nextField = document.querySelector(`input[name=${keyName}${fieldIntIndex + 1}]`);

        if (value.length > maxLength) {
            e.target.value = value[0];
        }
        if (value.length >= maxLength && fieldIntIndex < 6 && nextField !== null) {
            nextField.focus();
        }
        handleChange(e);
    }
    return (
        <Stack direction="row" spacing={2} justifyContent={"center"} ref={codesRef}>
            {inputs.map((name, index) => (
                <Controller
                    key={name}
                    control={control}
                    name={`${keyName}${index + 1}`}
                    render={({field, fieldState: {error}}) => (
                        <TextField
                            {...field}
                            fullWidth
                            error={!!error} autoFocus={index===0} placeholder={"-"}
                            onChange={(e)=> handleChangeWithNextField(e, field.onChange)}
                            onFocus={(e)=> e.currentTarget.select()}
                            InputProps={{
                                sx: {
                                    // width: {xs: "inherit", sm: "inherit"},
                                    height: {xs: 36, sm: 56},
                                    "& input" : {p: 0, textAlign: "center"}
                                }
                            }}
                            inputProps={{
                                maxLength: 1,
                                type: "number",
                            }}
                            {...other}
                        />
                    )}
                >

                </Controller>
            ))}
        </Stack>
    );
};

export default RHFOtpCodes;
