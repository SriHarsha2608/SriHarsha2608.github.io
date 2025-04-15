function getFormattedTimestamp() 
{
    return new Date().toISOString();
}

function logEvent(eventType, eventTarget) 
{
    let objectDesc = "";
    if (eventTarget.tagName) 
    {
        objectDesc = eventTarget.tagName; 
    } 
    else 
    {
        objectDesc = "Unknown Object";
    }

    if (eventTarget.getAttribute) 
    {
        const typeAttr = eventTarget.getAttribute("type");
        if (typeAttr) 
        {
            objectDesc += ` (type: ${typeAttr})`;
        }
    }

    console.log(`${getFormattedTimestamp()} , ${eventType} , ${objectDesc}`);
}

window.addEventListener("load", () => {
    logEvent("view", document.body);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            logEvent("view", entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('*').forEach(element => {
    if (element.tagName) {
        observer.observe(element);
    }
});

document.addEventListener("click", (e) => {
    logEvent("click", e.target);
});