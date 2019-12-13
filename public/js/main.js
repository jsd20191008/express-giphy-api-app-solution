$(function () {
  $('#search').submit((event) => {
    event.preventDefault()
    console.log('form being submitted')

    const query = $('#query').val()
    console.log(query)

    $('#results-table tbody').html('')
    $('#query').val('')

    search(query)
  })

  function displayResults (gifs) {
    console.log(gifs)
    gifs.forEach((gif) => {
      $('#results-table tbody').append(
        `<tr>
          <td>${gif.title}</td>
          <td><img src="${gif.images.fixed_height.url}"></td>
          <td>${gif.rating}</td>
          <td><a href="${gif.url}"> link </a></td>
        </tr>`
      )
    })
  }

  /*
    Make API request to backend server the search() to use vanilla Promise (syntax) to make the API request
    instead of $.ajax()
  */

  function search (searchTerm) {
    axios.get('/search', {
      params: {
        q: searchTerm
      }
    }).then((response) => {
      console.log(response)
      displayResults(response.data.gifs)
    }).catch((error) => {
      console.log(error)
      alert('an error occurred')
    })
  }
})
