
$('#button').click((event) => {
  event.preventDefault();

  let data = $('#json-input').val();
  submitJson(data);
  $('#json-input').val('');
})

const submitJson = (fileData) => {
  $.post('/json_input', { data: fileData }, 
  (data) => {
    console.log('front:', data);
    $('#csv-report').html('<h3>CSV Report:</h3>');
    $('#csv-report').append(`<p>${data}</p>`);
  }, 'text');
}


