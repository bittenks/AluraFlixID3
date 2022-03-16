
const firebaseConfig = {
    apiKey: "AIzaSyCnIQEgCEIh0rMnk_6XmBtBl_sG8wC9dYc",
    authDomain: "imersaodev3-bittenks.firebaseapp.com",
    databaseURL: "https://imersaodev3-bittenks-default-rtdb.firebaseio.com",
    projectId: "imersaodev3-bittenks",
    storageBucket: "imersaodev3-bittenks.appspot.com",
    messagingSenderId: "221103724789",
    appId: "1:221103724789:web:6e8d951de3edfb1b4ecdbc"
  };
firebase.initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
// Create a root reference
var storageRef = firebase.storage().ref();
var fbBucketName = 'Filmes';

function uploadimage (e) {
  // what happened
  console.log('file upload event',e);
  console.log(e.files)
  // get file
  var file = e.files[0];

  // create a storage ref
  var storageRef = storage.ref(`${fbBucketName}/${file.name}`);

  // upload file
  var uploadTask = storageRef.put(file);

  // The part below is largely copy-pasted from the 'Full Example' section from
  // https://firebase.google.com/docs/storage/web/upload-files

  // update progress bar
  uploadTask.on('state_changed', // or 'state_changed'
      function (snapshot) {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log('File available at', downloadURL);
              urlimage = downloadURL
          });
      }
  )
  };

function SalvarimagemFirebase() {
    filmesId=$('#nome').val()
    firebase.database().ref('filmes/' + filmesId).set({
        nome: $('#nome').val(),
        nota: $('#nota').val(),
        filme : urlimage
      });
 
}
var dbref = firebase.database().ref('filmes/');
dbref.on('value', function (snapshot) {
    snapshot.forEach(function(element){ 
        data = element.val()
        console.log(data.filme)
        $('#listafilmes').append('<div class="filmes"><p>'+data.nome+'</p>'+
        "<img src="+data.filme+" >"+
        '<p>Nota:'+data.nota+'</p></div>'
        )})
  })