<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script>
    $(document).ready(function() {

        // ---------------------------
        // Init Demo
        // ---------------------------
        let currentHighlight = null;
        let demoValue = "";
        let startID = "our-recommendation";
        $('.callout').hide();
        $('.callout-static').hide();

        // -------------------
        // Start Tour
        // -------------------

        if (!sessionStorage.getItem('modalSeen')) {
            $('.welcome_modal').css('display', 'flex'); // Show the welcome modal
            lockScroll(); // Lock scroll when the modal is shown
            sessionStorage.setItem('modalSeen', 'true'); // Mark the modal as seen for this session
        }

        // Handle "Continue" button click to start the tour
        $('#start-tour-btn').click(function() {
            demoValue = "tour";
            addQueryParam("demo", "tour");
            $('.welcome_modal').css('display', 'none'); // Hide the welcome modal
            unlockScroll(); // Unlock scroll
            startTour(); // Start the tour
        });

        // Close the welcome modal when the close button is clicked
        $("#go-at-my-own-pace-btn, .close-welcome").on("click", function() {
            demoValue = "self";
            addQueryParam("demo", "self");
            $('.welcome_modal').css('display', 'none');
            unlockScroll(); // Unlock scroll
        });

        // ---------------------------
        // Set Demo Mode if undefined
        // ---------------------------
        if (demoValue === "") {
            demoValue = getDemoMode();
        }

        if (demoValue === "tour") {
            unlockScroll(); // Unlock scroll
            startTour(); // Start the tour
        }

        // ---------------------------
        // Add Demo Mode to Nav Links
        // ---------------------------
        appendQueryToLinks("demo-nav-link", "demo", demoValue);

        // -------------------
        // Tour Highlight Logic with ID-based navigation
        // -------------------

        // Handle Next button functionality with data-next attribute
        $(document).on('click', '[data-next]', function(e) {
            e.preventDefault();
            let nextId = $(this).attr('data-next'); // Get the next ID from data-next attribute
            let nextElement = $('#' + nextId); // Find the element with the next ID
            highlightElement(nextElement); // Highlight the corresponding element
        });

        // Handle Previous button functionality with data-prev attribute
        $(document).on('click', '[data-prev]', function(e) {
            e.preventDefault();
            let prevId = $(this).attr('data-prev'); // Get the previous ID from data-prev attribute
            let prevElement = $('#' + prevId); // Find the element with the previous ID
            highlightElement(prevElement); // Highlight the corresponding element
        });

        // Close the callout when the close button inside callout is clicked
        $('.close-callout-btn').click(function(e) {
            e.preventDefault();
            $(this).closest('.callout').fadeOut(); // Hide the specific callout
        });

        // -------------------
        // CTA Modal Logic
        // -------------------
        $('[data-trigger="modal"]').click(function() {
            $('#cta_modal').addClass('is-visible');
            lockScroll(); // Lock scroll when CTA modal is open
        });

        $('.close-modal').click(function() {
            $('#cta_modal').removeClass('is-visible');
            unlockScroll(); // Unlock scroll when CTA modal is closed
        });

        $(document).mouseup(function(e) {
            var modalContent = $('.modal-content');
            if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
                $('#cta_modal').removeClass('is-visible');
                unlockScroll(); // Unlock scroll when clicking outside
            }
        });

        // -------------------
        // Details Modal Logic
        // -------------------
        $('[data-trigger="view-details"]').click(function() {
            $('#view_details_modal').addClass('is-visible');
            lockScroll(); // Lock scroll when Details modal is open
        });

        $('.close-modal').click(function() {
            $('#view_details_modal').removeClass('is-visible');
            unlockScroll(); // Unlock scroll when Details modal is closed
        });

        $(document).mouseup(function(e) {
            var modalContent = $('.view_details-content');
            if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
                $('#view_details_modal').removeClass('is-visible');
                unlockScroll(); // Unlock scroll when clicking outside
            }
        });

        // ---------------------------
        // Functions
        // ---------------------------

        function addQueryParam(key, value) {
            let currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set(key, value);
            window.history.replaceState({}, '', currentUrl);
            console.log("Updated URL:", currentUrl.toString());
        }

        function appendQueryToLinks(className, key, value) {
            $(`.${className}`).each(function() {
                let currentHref = $(this).attr("href");
                let separator = currentHref.includes("?") ? "&" : "?";
                let updatedHref = `${currentHref}${separator}${key}=${value}`;
                $(this).attr("href", updatedHref);
            });
        }

        function getDemoMode() {
            const urlParams = new URLSearchParams(window.location.search);
            let demo = urlParams.get("demo");
            return demo;
        }

        function getURLParam(paramName) {
            const urlParamsNew = new URLSearchParams(window.location.search);
            let paramVal = urlParamsNew.get(paramName);
            return paramVal;
        }

        function lockScroll() {
            $('body').addClass('modal-open');
        }

        function unlockScroll() {
            $('body').removeClass('modal-open');
        }

        // Function to start the tour
        function startTour(startID) {
            lockScroll(); // Lock scroll when tour starts
            $('#overlay').fadeIn(); // Show the overlay
            $('#tour-nav').fadeIn(); // Show tour navigation controls
            $('.callout-static').show().css('display', 'flex');
            if (!startID) { startID = 'our-recommendation'; }
            highlightElement($('#' + startID)); // Start the tour at the first element
        }

        // Function to highlight an element and reveal the callout
        function highlightElement(target) {
            clearHighlight(); // Clear previous highlights

            if (target.length > 0) {
                currentHighlight = target;

                // Scroll to the element and center it in the viewport
                $('html, body').animate({
                    scrollTop: target.offset().top - ($(window).height() / 2) + (target.outerHeight() / 2)
                }, 600);

                // Add the .highlight class to the current element
                target.addClass('highlight');

                // Show the callout nested within the current highlighted element
                const callout = target.find('.callout');
                if (callout.length) {
                    //callout.fadeIn(); // Show the callout for this highlight
                    callout.css('display', 'flex').hide().fadeIn();
                }
            }
        }

        // Function to clear highlights and hide all callouts
        function clearHighlight() {
            $('.highlight').removeClass('highlight'); // Remove highlight class from all elements
            $('.callout').hide(); // Hide all callouts nested in highlights
        }

    });
</script>
