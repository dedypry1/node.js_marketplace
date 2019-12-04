$(function(){
    ClassicEditor.create( document.querySelector( '#editor' ) )
    .catch( error => {
        console.error( error );
    } );
    $('a.confirmDeletion').click(function(){
        if(!confirm('apakah anda yakin ingin menghapus page ini')){
            return false;
        }
    });
});