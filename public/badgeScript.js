(function () {

    // Function to create the badge
    function createBadge() {
        var badgeHTML = '<div id="honestymeterBadgeIcon" style="position: fixed; bottom: 10px; right: 10px; cursor: pointer;">' +
            '<img src="/badge.svg" width="140px" height="140px" alt="Honesty Badge" />' +
            '<button id="honestymeterCloseButton" style="position: absolute; top: 0; right: 0; cursor: pointer; background-color: #19857B; color: white; border: none;" onclick="window.honestymeterCloseBadge()">X</button>' +
            '</div>';

        document.body.insertAdjacentHTML('beforeend', badgeHTML);
    }



    // Function to close the badge and store the preference
    window.honestymeterCloseBadge = function () {
        sessionStorage.setItem('honestymeterBadgeClosed', 'true');
        console.log('here')
        var badgeIcon = document.getElementById('honestymeterBadgeIcon');
        console.log({ badgeIcon })
        if (badgeIcon) {
            badgeIcon.style.display = 'none';
            //check if production or development
            if (window.location.href.includes('localhost')) {
                window.location.reload()
            }
        }
    }

    // Check if the badge has been closed in a previous session
    if (!sessionStorage.getItem('honestymeterBadgeClosed')) {
        createBadge();
    }
})();