import React from 'react'
import { oneOf, string, func, bool } from 'prop-types';
import theme from '@/theme';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { EMPTY_FUNCTION } from '@/utils/utils';

const TEXTS = {
    search: 'Search',
}
const POSITION = {
    start: 'start',
    end: 'end',
}
const TYPE = {
    text: 'text',
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
    return (
        <FormControl
            sx={STYLES.formControl}
            variant='outlined'>
            <InputLabel htmlFor={id}>
                {inputLabel}
            </InputLabel>
            <Input
                id={id}
                type={type}
                endAdornment={
                    <InputAdornment position={position}>
                        <IconButton onClick={onClick} disabled={isIconButtonDisabled}>
                            <SearchIcon sx={STYLES.searchIcon(isIconButtonDisabled)} />
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                onChange={onChange}
                sx={STYLES.input} />
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
}

const STYLES = {
    formControl: {
        m: 1,
        width: '25ch',
        marginTop: 1
    },
    input: {
        padding: theme.spacing(0, 0, 1, 0)
    },
    searchIcon: (isIconButtonDisabled) => ({
        color: !isIconButtonDisabled && theme.palette.primary.main
    })
}
