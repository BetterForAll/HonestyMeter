import React, { useRef } from 'react'
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
    onChange = EMPTY_FUNCTION,
    onClick = EMPTY_FUNCTION,
    onClear = EMPTY_FUNCTION,
    label = TEXTS.search,
    inputLabel = TEXTS.search,
    type = TYPE.text,
    id,
    position = POSITION.end,
    variant = 'text',
    value = EMPTY_STRING,
    Icon = SearchIcon,
    iconVisibilityToggle = false,
    width = '25ch',
    mobileWidth = '100%',

}) {
    const inputRef = useRef(null);


    const ShownInput = variant === 'text' ? Input : OutlinedInput;
    const toggleVisibility = Boolean(value) ? 'visible' : 'hidden';

    const handleKeyDown = (event) => {
        if (event.key === KEYS.enter) {
            onClick();
        }
    }

    const handleSearchClick = () => {
        onClick();
        inputRef.current.blur();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        inputRef.current.blur();
    }

    return (
        <FormControl
            sx={STYLES.formControl(width, mobileWidth)}
            onSubmit={handleSubmit}>
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
                ref={inputRef}
                endAdornment={
                    <InputAdornment position={position}  >
                        <IconButton onClick={onClear} sx={STYLES.closeIcon(toggleVisibility)}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={handleSearchClick} sx={STYLES.mainIcon(iconVisibilityToggle, toggleVisibility)}>
                            <Icon />
                        </IconButton>
                    </InputAdornment>
                }
                value={value}
                InputLabelProps={{
                    sx: STYLES.inputLabel
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
    value: string,
    setValue: func,
    variant: string,
    Icon: node,
    iconVisibilityToggle: bool,
    onClear: func,
    width: string,
    mobileWidth: string,
}

const STYLES = {
    formControl: (width, mobileWidth) => ({
        width: { xs: mobileWidth, sm: width },
        marginTop: 0,
        '& label': {
            paddingLeft: 0,
            top: '3px',
            left: '-15px'
        },
        '& svg': {
            color: theme.palette.text.secondary,
        }
    }),
    inputLabel: {
        paddingTop: '3px',
        color: 'red'
    },
    mainIcon: (iconVisibilityToggle, toggleVisibility) => ({
        visibility: iconVisibilityToggle ? toggleVisibility : 'visible',
        marginBottom: theme.spacing(0),
        marginLeft: theme.spacing(-1.25),
        transform: 'scale(0.75)'
    }),
    closeIcon: (toggleVisibility) => ({
        visibility: toggleVisibility,
        marginBottom: theme.spacing(0),
        transform: 'scale(0.75)',
    })
}
