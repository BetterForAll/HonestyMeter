(function () {
    //TODO: replace image url!
    function isMobileByOs() {
        const userAgent = navigator.userAgent.toLowerCase();
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    }

    function isMobileByScreenSize() {
        const maxWidth = 768;
        return window.innerWidth <= maxWidth;
    }

    var honestyBadgeIsMobile = isMobileByOs() || isMobileByScreenSize();

    var honestyBadgeSize = honestyBadgeIsMobile ? '100px' : '140px'

    function createBadge() {
        var honestyBadgeHtml = '<div id="honestymeterBadgeIcon" style="position: fixed; bottom: 10px; right: 10px; cursor: pointer; background-color:#ffffffc4; border: solid 1px #19857b6b;  padding: 16px 8px 0; border-radius: 4px;">' +
            '<a href="https://honestymeter.com/badge" target="_blank" style="text-decoration: none; color: black;">' +
            `<img src="https://honesty-meter-plus.vercel.app/badge.svg" width=${honestyBadgeSize} height=${honestyBadgeSize} alt="Honesty Badge" title="Click for detials" />` +
            '</a>' +
            '<button id="honestymeterCloseButton" style="position: absolute; top: 8px; right: 8px; cursor: pointer; background-color: #19857B; color: white; width: 20px; height: 16px; text-align: center; border: none;" onclick="window.honestymeterCloseBadge()">X</button>' +
            '</div>';

        document.body.insertAdjacentHTML('beforeend', honestyBadgeHtml);
    }

    window.honestymeterCloseBadge = function () {
        sessionStorage.setItem('honestymeterBadgeClosed', 'true');
        var honestyBadgeIcon = document.getElementById('honestymeterBadgeIcon');

        if (honestyBadgeIcon) {
            honestyBadgeIcon.style.display = 'none';
            if (window?.location?.href?.includes('localhost')) {
                window.location.reload();
            }
        }
    }

    if (!sessionStorage.getItem('honestymeterBadgeClosed')) {
        createBadge();
    }
})();