import React from 'react'
import { oneOf, string, func, bool } from 'prop-types';
import theme from '@/theme';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { EMPTY_FUNCTION } from '@/utils/utils';
import { EMPTY_STRING } from '@/constants/constants';

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
    label = TEXTS.search,
    inputLabel = TEXTS.search,
    type = TYPE.text,
    id,
    position = POSITION.end,
    onChange = EMPTY_FUNCTION,
    onClick = EMPTY_FUNCTION,
    isIconButtonDisabled = false,
}) {
    const handleKeyDown = (event) => {
        if (event.key === KEYS.enter) {
            onClick();
        }
    }

    return (
        <FormControl
            sx={STYLES.formControl}
            variant='outlined'>
            <InputLabel htmlFor={id}>
                {inputLabel}
            </InputLabel>
            <OutlinedInput
                id={id}
                type={type}

                label={label}
                onChange={onChange}
                sx={STYLES.input}
                onKeyDown={handleKeyDown}
                variant='outlined'
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
}

const STYLES = {
    formControl: {
        // m: 1,
        width: '25ch',
        marginTop: 0
    },
    input: {
        // padding: theme.spacing(0, 0, 1, 0),
    },
}
