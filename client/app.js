
$('#button').click((event) => {
  event.preventDefault();

  let data = $('#json-input').val();
  submitJson(data);
  $('#json-input').val('');
})

const submitJson = (fileData) => {
  $.post('/json_input', { data: fileData, 
    error: (err) => {
      $('#csv-report').html(`<p>${err}</p>`);
      console.log(err);
    },
    success: (data) => {
      $('#csv-report').html('<h3>CSV Report:</h3>');
      $('#csv-report').append(`<p>${data}</p>`);
    }   
  });
}


