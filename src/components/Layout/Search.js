import React from 'react'
import { oneOf, string, func, bool, node } from 'prop-types';
import theme from '@/theme';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { EMPTY_FUNCTION } from '@/utils/utils';
import { EMPTY_STRING } from '@/constants/constants';
import CloseIcon from '@mui/icons-material/Close';

const TEXTS = {
    search: 'Search Term',
}
const POSITION = {
    start: 'start',
    end: 'end',
}
const TYPE = {
    text: 'text',
}
const KEYS = {
    enter: 'Enter',
}

export default function Search({
    onIconClick = EMPTY_FUNCTION,
    label = TEXTS.search,
    inputLabel = TEXTS.search,
    type = TYPE.text,
    id,
    position = POSITION.end,
    onChange = EMPTY_FUNCTION,
    onClick = EMPTY_FUNCTION,
    isIconButtonDisabled = false,
    variant = 'text',
    value = EMPTY_STRING,
    Icon = SearchIcon,
    iconVisibilityToggle = false,
}) {
    const handleKeyDown = (event) => {
        if (event.key === KEYS.enter) {
            onClick();
        }
    }

    const ShownInput = variant === 'text' ? Input : OutlinedInput;
    const toggleVisibility = Boolean(value) ? 'visible' : 'hidden';

    return (
        <FormControl
            sx={STYLES.formControl}>
            <InputLabel htmlFor={id}>
                {inputLabel}
            </InputLabel>
            <ShownInput
                id={id}
                type={type}
                label={label}
                onChange={onChange}
                sx={STYLES.input}
                onKeyDown={handleKeyDown}
                variant={variant}
                endAdornment={
                    <InputAdornment position={position}  >
                        <IconButton onClick={onIconClick} sx={{
                            visibility: iconVisibilityToggle ? toggleVisibility : 'visible',
                            marginBottom: theme.spacing(0),
                            transform: 'scale(0.7)'
                        }}>
                            <Icon />
                        </IconButton>
                    </InputAdornment>
                }
                value={value}
                InputLabelProps={{
                    sx: {
                        paddingTop: '3px',
                        color: 'red'
                    }
                }}
            />
        </FormControl>
    )
}

Search.propTypes = {
    label: string,
    inputLabel: string,
    type: string,
    id: string,
    position: oneOf([POSITION.start, POSITION.end]),
    handleLocalSearch: func,
    handleSearchClick: func,
    isIconButtonDisabled: bool,
    value: string,
    setValue: func,
    variant: string,
    onIconClick: func,
    Icon: node,
    iconVisibilityToggle: bool,
}

const STYLES = {
    formControl: {
        width: { xs: '100%', sm: '25ch' },
        marginTop: 0,
        '& label': {
            paddingTop: '3px',
            paddingLeft: 0,
            left: '-15px'
        }
    },
    input: {
    },
}
