// Saves options to chrome.storage
const save_options = () => {
  const data = {
    urls:     [],
    contexts: {}
  }

  let inputNodes

  inputNodes = [...document.querySelectorAll('#urls > ol > li > input.url')]
  data.urls  = inputNodes.map(inputNode => inputNode.value.trim()).filter(url => !!url)

  inputNodes = [...document.querySelectorAll('#contexts input.context')]
  inputNodes.forEach(inputNode => {
    const id  = inputNode.getAttribute('id')
    let value = parseInt( inputNode.value, 10 )

    if (isNaN(value) || (value < 1))
      value = 1

    if (value > data.urls.length)
      value = data.urls.length

    data.contexts[id] = value
  })

  const user_options_json = JSON.stringify(data)

  chrome.storage.sync.set(
    {user_options_json},
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

const add_empty_url = () => {
  const parentNode    = document.querySelector('#urls > ol')

  const newNode = document.createElement('li')
  newNode.innerHTML = `<input type="text" class="url" value="" />`

  parentNode.appendChild(newNode)
}

const restore_urls = (urls) => {
  const parentNode    = document.querySelector('#urls > ol')
  const referenceNode = parentNode.querySelector(':scope > li:last-child')

  urls.forEach(url => {
    const newNode = document.createElement('li')
    newNode.innerHTML = `<input type="text" class="url" value="${url}" />`
    parentNode.insertBefore(newNode, referenceNode)
  })
}

const restore_contexts = (contexts) => {
  const ids = Object.keys(contexts)

  ids.forEach(id => {
    const inputNode = document.querySelector(`#contexts input.context#${id}`)
    if (inputNode)
      inputNode.value = contexts[id]
  })
}

// Restore option form field values from chrome.storage
const restore_options = () => {
  chrome.storage.sync.get(
    ['user_options_json'],
    function(items){
      try {
        const data = JSON.parse(items.user_options_json)
        if (!data || !Array.isArray(data.urls) || !data.contexts)
          throw new Error('bad data format')

        restore_urls(data.urls)
        restore_contexts(data.contexts)
      }
      catch(e) {}
    }
  )
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
document.getElementById('add_url').addEventListener('click', add_empty_url)
