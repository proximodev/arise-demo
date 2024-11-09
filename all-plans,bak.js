 <script>
$(document).ready(function() {

     // ---------------------------
    // Get Demo Mode
    // ---------------------------

    function getDemoMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const demo = urlParams.get("demo");
        return demo;
    }
    const demoValue = getDemoMode();
    if (demoValue == "") { demoValue = "self"; }

    // ---------------------------
    // Add Demo Mode to Nav Links
    // ---------------------------

    function appendQueryToLinks(className, key, value) {
        $(`.${className}`).each(function() {
            let currentHref = $(this).attr("href");
            let separator = currentHref.includes("?") ? "&" : "?";
            let updatedHref = `${currentHref}${separator}${key}=${value}`;
            $(this).attr("href", updatedHref);
        });
    }
    $(document).ready(function() {
        appendQueryToLinks("demo-nav-link", "demo", demoValue);
    });

    // -------------------
    // Scroll Lock Functions
    // -------------------
    function lockScroll() {
        $('body').addClass('modal-open');
    }

    function unlockScroll() {
        $('body').removeClass('modal-open');
    }

    // -------------------
    // Tour Highlight Logic with ID-based navigation
    // -------------------
    let currentHighlight = null;

    // Hide all callouts on page load
    $('.callout').hide();
    $('.callout-static').hide();

    // Function to start the tour
    function startTour() {
        lockScroll(); // Lock scroll when tour starts
        $('#overlay').fadeIn(); // Show the overlay
        $('#tour-nav').fadeIn(); // Show tour navigation controls
        $('.callout-static').show().css('display', 'flex');
        highlightElement($('#all-plans-wrapper')); // Start the tour at the first element
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
                callout.fadeIn(); // Show the callout for this highlight
                $('.callout').css('display', 'flex');
            }
        }
    }

    // Function to clear highlights and hide all callouts
    function clearHighlight() {
        $('.highlight').removeClass('highlight'); // Remove highlight class from all elements
        $('.callout').hide(); // Hide all callouts nested in highlights
    }

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
    // Reset Tour
    // -------------------

    if (demoValue == "tour") {
        lockScroll(); // Lock scroll when tour starts
        startTour();
    }



    // When the element with data-trigger="modal" is clicked
    $('[data-trigger="modal"]').click(function() {
        // Show the modal by adding the 'is-visible' class and freeze the background
        $('#cta_modal').addClass('is-visible');
        $('body').addClass('modal-open');
    });

    // When the close button is clicked, hide the modal and enable background scrolling
    $('.close-modal').click(function() {
        $('#cta_modal').removeClass('is-visible');
        $('body').removeClass('modal-open');
    });

    // Close modal when clicking outside modal content (optional)
    $(document).mouseup(function(e) {
        var modalContent = $('.modal-content'); // Ensure this is specific to modal 2
        if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
            $('#cta_modal').removeClass('is-visible');
            $('body').removeClass('modal-open');
        }
    });
});
</script>