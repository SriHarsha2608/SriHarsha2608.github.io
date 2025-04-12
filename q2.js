console.log("Script has been loaded.");

function getFormattedTimestamp() 
{
    return new Date().toISOString(); // ISO timestamp includes date and time.
}

// Function to log events in the required format.
function logEvent(eventType, eventTarget) 
{
    let objectDesc = "";
    if (eventTarget.tagName) 
    {
        objectDesc = eventTarget.tagName; // Default to HTML tag name.
    } 
    else 
    {
        objectDesc = "Unknown Object";
    }

  // Add more detail if available, e.g. classes or type attribute for inputs.
    if (eventTarget.getAttribute) 
    {
        const typeAttr = eventTarget.getAttribute("type");
        if (typeAttr) 
        {
            objectDesc += ` (type: ${typeAttr})`;
        }
    }

  // Log the information.
    console.log(`${getFormattedTimestamp()} , ${eventType} , ${objectDesc}`);
}

// Log a "page view" event when the page loads.
window.addEventListener("load", () => {
    logEvent("view", document.body);
});

// Log every "click" event on the page.
document.addEventListener("click", (e) => {
    logEvent("click", e.target);
});
