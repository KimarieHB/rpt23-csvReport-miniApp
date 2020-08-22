
$('button').click((event) => {
  event.preventDefault();

  let data = $('#json-input').val();
  submitJson(data);
})

const submitJson = (fileData) => {
  $.ajax({
    type: 'POST',
    url: '/json_input',
    data: fileData,
    error: (err) => {
      $('#csv-report').html(`<p>${err}</p>`);
      console.log(err);
    }
    success: (data) => {
      $('#csv-report').html(`<p>${data}</p>`)
    }
  })
}


