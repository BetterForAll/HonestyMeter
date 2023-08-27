import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete({ list = [], label = "Category", onChange, value, variant = 'standard' }) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={list}
            sx={{
                width: {
                    xs: '100%', sm: 224
                }
            }}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} label={label} variant='standard' />}
            value={value}
            InputProps={{
            }}
        />
    );
}

