import { Box } from '@mui/material';
import { useEffect } from 'react';

const GoogleTranslate = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const existingScript = document.getElementById('googleTranslateScript');
            if (!existingScript) {
                const googleScript = document.createElement('script');
                googleScript.id = 'googleTranslateScript';
                googleScript.type = 'text/javascript';
                googleScript.async = true;
                googleScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
                document.body.appendChild(googleScript);
            }
            window.googleTranslateElementInit = function () {
                new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
            };
        }
    }, []);

    return (
        <div id="google_translate_element" style={STYLES.widget} />
    );
};

const STYLES = {
    widget: {
        position: 'absolute',
        top: 0,
        right: 0,
        visibility: 'hidden',
    }
}

export default GoogleTranslate;


