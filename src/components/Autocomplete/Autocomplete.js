import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import theme from '@/theme';

export default function AutoComplete({ list = [], label = "Category", onChange, value, variant = 'standard' }) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={list}
            sx={{
                width: {
                    xs: '100%', sm: 224,
                },
                marginBottom: { xs: theme.spacing(2), sm: 0 },
                '&:first-child': {
                    marginTop: { xs: theme.spacing(1), sm: 0 },
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

