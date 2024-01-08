(function () {

    // Function to create the badge
    function createBadge() {
        var badgeHTML = '<div id="honestymeterBadgeIcon" style="position: fixed; bottom: 10px; right: 10px; cursor: pointer; background-color:#ffffff99; border: solid 1px #19857b6b;  padding:8px 8px 0; border-radius: 4px;" title="Click for detials">' +
            '<a href="https://honestymeter.com/badge" target="_blank" style="text-decoration: none; color: black;">' +
            '<img src="/badge.svg" width="140px" height="140px" alt="Honesty Badge" />' +
            '</a>' +
            '<button id="honestymeterCloseButton" style="position: absolute; top: 8px; right: 8px; cursor: pointer; background-color: #19857B; color: white; border: none;" onclick="window.honestymeterCloseBadge()">X</button>' +
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
            if (window?.location?.href?.includes('localhost')) {
                window.location.reload()
            }
        }
    }

    // Check if the badge has been closed in a previous session
    if (!sessionStorage.getItem('honestymeterBadgeClosed')) {
        createBadge();
    }
})();