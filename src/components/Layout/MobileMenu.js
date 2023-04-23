import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuIcon from '@mui/icons-material/Menu';
import { EMPTY_STRING, GITHUB_URL, PAGE_LABELS } from '@/constants/constants';
import theme from '@/theme';
import { EMAIL_ADDRESS } from '@/constants/constants';
import { openEmail } from '@/utils/utils';
import { useRouter } from 'next/router'
import { func, arrayOf, string } from 'prop-types'
import { Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const MAIL_TO_PREFIX = 'mailto:'
const MAIL_TO = MAIL_TO_PREFIX + EMAIL_ADDRESS
const DRAWER_TYPE = 'bottom';
const TEXTS = {
    contact: 'Contact',
    github: 'GitHub'
}
const MENU_ITEMS = [...PAGE_LABELS, TEXTS.contact, TEXTS.github]
const MENU_ICONS = [HomeIcon, InfoIcon, GavelIcon, MailIcon, GitHubIcon]

export default function MobileMenu({ setCurrentPage, closeReport, pageRoutes }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer =
        (open) => (event) => {
            if (
                event.type === 'keydown' &&
                ((event).key === 'Tab' ||
                    (event).key === 'Shift')
            ) {
                return;
            }

            setIsOpen(open);
        };

    const onMenuItemClick = (index) => () => {
        const isContactIconClicked = index === 3
        const isGitHubIconClicked = index === 4

        if (isContactIconClicked) {
            openEmail(MAIL_TO)
            return
        }

        if (isGitHubIconClicked) {
            window.open(GITHUB_URL, '_blank')
            return
        }

        if (index === 0) closeReport()

        setCurrentPage(index)
        const url = pageRoutes[index]
        router.push(url)
    }

    const menuItemsList = (anchor) => (
        <Box
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    MENU_ITEMS.map(
                        (text, index) => {
                            const Icon = MENU_ICONS[index]
                            const isContactIcon = index === 3
                            const tooltipTitle = isContactIcon ? EMAIL_ADDRESS : EMPTY_STRING

                            return (
                                <Tooltip title={tooltipTitle} key={text} placement="top-start">
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={onMenuItemClick(index)}>
                                            <ListItemIcon>
                                                <Icon />
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                </Tooltip>
                            )
                        })
                }
            </List>
        </Box>
    );

    return (
        <Box sx={STYLES.visibilityContainer}>
            <Box sx={STYLES.flexContainer}>
                <IconButton onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor={DRAWER_TYPE}
                    open={isOpen}
                    onClose={toggleDrawer(false)}
                >
                    {menuItemsList()}
                </Drawer>
            </Box>
        </Box>
    );
}

MobileMenu.propTypes = {
    setCurrentPage: func,
    pageRoutes: arrayOf(string),
    closeReport: func
}

const STYLES = {
    visibilityContainer: {
        display: { xs: 'block', sm: 'none' }
    },
    flexContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2, 2, 0)
    },
}

