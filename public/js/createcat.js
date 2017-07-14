$('#add_field').click(function() {
	$('#form').append('<input type="text" class="field" placeholder="field"><br>')
})

$('#done').click(function() {
	var fields = $('.field').toArray()
    if ($('#category').val()) {
        if (fields.length) {
            var fieldNms = []
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].value) {
                    fieldNms.push(fields[i].value.toLowerCase())
                    $(fields[i]).css('border-color', 'initial')
                } else {
                    // console.log(fields[i])
                    $(fields[i]).css('border-color', 'red')
                }
            }
            if (fields.length == fieldNms.length) {
                $.post('/cretect', {category: $('#category').val().toLowerCase(), info: JSON.stringify(fieldNms)}, function(data) {
                	$('#messge').text(data)
                })
            } else {
            	$('#messge').text('fill in all details')
            }
        } else {
            $('#messge').text('add fields')
        }
    } else {
        $('#messge').text('enter category')
    }
})