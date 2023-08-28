import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import theme from '@/theme';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function AutoComplete({
    list = [],
    label = "Category",
    onChange,
    value,
    variant = 'standard',
    onClearClick,
}) {

    const inputRef = useRef(null);

    const handleClearClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClearClick && onClearClick();
        inputRef.current.blur();
    }

    const handleClose = (_e, reason) => {
        if (reason === 'clear') {
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

    const renderInputCb = getRenderInputCb(label, variant, inputRef);

    return (
        <Autocomplete
            disablePortal
            blurOnSelect
            id={`autocomplete-${label}`}
            options={list}
            sx={STYLES.root}
            onChange={onChange}
            onClose={handleClose}
            renderInput={renderInputCb}
            value={value}
            clearIcon={<ClearIcon fontSize="small" onClick={handleClearClick} visibility={Boolean(value) ? 'visible' : 'hidden'} />}
        />
    );
}

function getRenderInputCb(label, variant, inputRef) {
    const renderInputCb = (params) => <TextField  {...params} label={label} variant={variant} ref={inputRef} />;

    return renderInputCb;
}

const STYLES = {
    root: {
        width: {
            xs: '100%', sm: 224,
        },
        marginBottom: { xs: theme.spacing(2), sm: 0 },
        '&:first-child': {
            marginTop: { xs: theme.spacing(1), sm: 0 },
        }
    }
}

