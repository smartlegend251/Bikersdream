// Function to refresh the page
function refreshPage() {
    location.reload();
  }
  
  // Create a new MutationObserver
  const observer = new MutationObserver(refreshPage);
  
  // Options for the observer (in this case, listen for changes in the entire document)
  const observerOptions = {
    childList: true,
    subtree: true,
  };
  
  // Start observing the document for changes
  observer.observe(document, observerOptions);
  