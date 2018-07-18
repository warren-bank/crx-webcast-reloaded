// Saves options to chrome.storage
function save_options() {
  var external_website_url = document.getElementById('external_website_url').value;
  chrome.storage.sync.set({
    "external_website_url": external_website_url
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Default value(s)
  chrome.storage.sync.get({
    "external_website_url": "http://warren-bank.github.io/crx-webcast-reloaded/external_website/index.html"
  }, function(items) {
    document.getElementById('external_website_url').value = items.external_website_url;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
