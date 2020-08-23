
$('#submit').click((event) => {
  event.preventDefault();
  let data = $('#json-input').val();
  submitJson(data);
  $('#json-input').val('');
})

$('#download').click((event) => {
  event.preventDefault();
  getCSV();
})

const submitJson = (fileData) => {
  $.post('/json_input', { data: fileData }, 
  (data) => {
    $('#csv-report').html('<h3>CSV Report:</h3>');
    $('#csv-report').append(`<p>${data}</p>`);
  }, 'text');
}

const getCSV = () => {
  $.get('/csv_report',
  (data) => {
    $('#csv-report').append(`<a download>${data}</a>`);
  }, 'html')
}


