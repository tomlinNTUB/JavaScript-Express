//新增項目
$('.add-one').click(function(){
    $('.dynamic-element').first().clone().appendTo('.dynamic-stuff').show();
    attach_delete();
});


//刪除項目
function attach_delete(){
    $('.delete').off();
    $('.delete').click(function(){		
        $(this).closest('.form-group').remove();
    });
}


