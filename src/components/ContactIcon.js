import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import theme from "@/theme";
import { EMAIL_ADDRESS } from '@/constants/constants'

export default function ContactIcon() {
    return (
        <Tooltip
            title={TooltipTitleJsx}
            placement="top-start">
            <Link href={`mailto:${EMAIL_ADDRESS}`} sx={STYLES.root}>
                <MailOutlineIcon color="inherit" />
            </Link>
        </Tooltip>
    )
}

const STYLES = {
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: theme.typography.fontSize,
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}

const TooltipTitleJsx = (
    <Typography variant="body2">
        {EMAIL_ADDRESS}
    </Typography>
)
