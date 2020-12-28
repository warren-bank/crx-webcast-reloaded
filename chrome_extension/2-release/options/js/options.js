// Saves options to chrome.storage
const save_options = () => {
  const external_website_url = document.getElementById('external_website_url').value

  chrome.storage.sync.set(
    {external_website_url},
    function(){
      // Add success notification
      const status = document.getElementById('status')
      status.textContent = 'Options saved.'

      // Remove success notification after a timeout
      setTimeout(
        function(){
          status.textContent = ''
        },
        750
      )
    }
  )
}

// Restore option form field values from chrome.storage
const restore_options = () => {
  chrome.storage.sync.get(
    ['external_website_url'],
    function(items){
      for (var key in items){
        document.getElementById(key).value = items[key]
      }
    }
  )
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
