//DROP AND DRAG
  
  var // where files are dropped + file selector is opened
    dropRegion = document.getElementById("drop-region"),
    // where images are previewed
    imagePreviewRegion = document.getElementById("image-preview");
  // open file selector when clicked on the drop region
  var fakeInput = document.createElement("input");
  fakeInput.type = "file";
  fakeInput.accept = "image/*";
  fakeInput.accept = "media";
  fakeInput.multiple = true;
  dropRegion.addEventListener('click', function() {
    fakeInput.click();
  });
  fakeInput.addEventListener("change", function() {
    var files = fakeInput.files;
    handleFiles(files);
  });

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  dropRegion.addEventListener('dragenter', preventDefault, false)
  dropRegion.addEventListener('dragleave', preventDefault, false)
  dropRegion.addEventListener('dragover', preventDefault, false)
  dropRegion.addEventListener('drop', preventDefault, false)

  function handleDrop(e) {
    var dt = e.dataTransfer,
      files = dt.files;
    if(files.length) {
      handleFiles(files);
    } else {
      // check for img
      var html = dt.getData('text/html'),
        match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
        url = match && match[1];
      if(url) {
        uploadImageFromURL(url);
        return;
      }
    }

    function uploadImageFromURL(url) {
      var img = new Image;
      var c = document.createElement("canvas");
      var ctx = c.getContext("2d");
      img.onload = function() {
        c.width = this.naturalWidth; // update canvas size to match image
        c.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0); // draw in image
        c.toBlob(function(blob) { // get content as PNG blob
          // call our main function
          handleFiles([blob]);
        }, "image/png");
      };
      img.onerror = function() {
        alert("Error in uploading");
      }
      img.crossOrigin = ""; // if from different origin
      img.src = url;
    }
  }
  dropRegion.addEventListener('drop', handleDrop, false);

  function handleFiles(files) {
    for(var i = 0, len = files.length; i < len; i++) {
      if(validateImage(files[i])) previewAnduploadImage(files[i]);
    }
  }

  function validateImage(image) {
    // check the type
    var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if(validTypes.indexOf(image.type) === -1) {
      alert("Invalid File Type");
      return false;
    }
    // check the size
    var maxSizeInBytes = 10e6; // 10MB
    if(image.size > maxSizeInBytes) {
      alert("File too large");
      return false;
    }
    return true;
  }

  function previewAnduploadImage(image) {
    // container
    var imgView = document.createElement("div");
    imgView.className = "image-view";
    imagePreviewRegion.appendChild(imgView);
    // previewing image
    var img = document.createElement("img");
    imgView.appendChild(img);
    // progress overlay
    var overlay = document.createElement("div");
    overlay.className = "overlay";
    imgView.appendChild(overlay);
    // read the image...
    var reader = new FileReader();
    reader.onload = function(e) {
      img.src = e.target.result;
    }
    reader.readAsDataURL(image);
    // create FormData
    var formData = new FormData();
    formData.append('image', image);
    // upload the image
    var uploadLocation = 'https://api.imgbb.com/1/upload';
    formData.append('key', 'bb63bee9d9846c8d5b7947bcdb4b3573');
    var ajax = new XMLHttpRequest();
    ajax.open("POST", uploadLocation, true);
    ajax.onreadystatechange = function(e) {
      if(ajax.readyState === 4) {
        if(ajax.status === 200) {
          // done!
        } else {
          // error!
        }
      }
    }
    ajax.upload.onprogress = function(e) {
      // change progress
      // (reduce the width of overlay)
      var perc = (e.loaded / e.total * 100) || 100,
        width = 100 - perc;
      overlay.style.width = width;
    }
    ajax.send(formData);
  }
  //-----------------------------------------------------------------//
 //textarae wysiwyg//
  
    var useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

tinymce.init({
 selector: "textarea#open-source-plugins",
 plugins:
   "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
 imagetools_cors_hosts: ["picsum.photos"],
 menubar: "file edit view insert format tools table help",
 toolbar:
   "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
 toolbar_sticky: true,
 autosave_ask_before_unload: true,
 autosave_interval: "30s",
 autosave_prefix: "{path}{query}-{id}-",
 autosave_restore_when_empty: false,
 autosave_retention: "2m",
 image_advtab: true,
 link_list: [
   { title: "My page 1", value: "https://www.tiny.cloud" },
   { title: "My page 2", value: "http://www.moxiecode.com" },
 ],
 image_list: [
   { title: "My page 1", value: "https://www.tiny.cloud" },
   { title: "My page 2", value: "http://www.moxiecode.com" },
 ],
 image_class_list: [
   { title: "None", value: "" },
   { title: "Some class", value: "class-name" },
 ],
 importcss_append: true,
 file_picker_callback: function (callback, value, meta) {
   / Provide file and text for the link dialog /;
   if (meta.filetype === "file") {
     callback("https://www.google.com/logos/google.jpg", { text: "My text" });
   }

   / Provide image and alt text for the image dialog /;
   if (meta.filetype === "image") {
     callback("https://www.google.com/logos/google.jpg", {
       alt: "My alt text",
     });
   }

   / Provide alternative source and posted for the media dialog /;
   if (meta.filetype === "media") {
     callback("movie.mp4", {
       source2: "alt.ogg",
       poster: "https://www.google.com/logos/google.jpg",
     });
   }
 },
 templates: [
   {
     title: "New Table",
     description: "creates a new table",
     content:
       '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
   },
   {
     title: "Starting my story",
     description: "A cure for writers block",
     content: "Once upon a time...",
   },
   {
     title: "New list with dates",
     description: "New List with dates",
     content:
       '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
   },
 ],
 template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
 template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
 height: 600,
 image_caption: true,
 quickbars_selection_toolbar:
   "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
 noneditable_noneditable_class: "mceNonEditable",
 toolbar_mode: "sliding",
 contextmenu: "link image imagetools table",
 skin: useDarkMode ? "oxide-dark" : "oxide",
 content_css: useDarkMode ? "dark" : "default",
 content_style:
   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
});
//______________________________________________________//

//SELECT category

        $('.select2').select2({
            data: ["Piano", "Flute", "Guitar", "Drums", "Photography"],
            tags: true,
            maximumSelectionLength: 10,
            tokenSeparators: [',', ' '],
            placeholder: "Select or type keywords",
            //minimumInputLength: 1,
            //ajax: {
           //   url: "you url to data",
           //   dataType: 'json',
            //  quietMillis: 250,
            //  data: function (term, page) {
            //     return {
            //         q: term, // search term
            //    };
           //  },
           //  results: function (data, page) { 
           //  return { results: data.items };
          //   },
          //   cache: true
           // }
        });
        //--------------------------------------------//
//Dynamically add or remove input fields
$(document).ready(function () {

    // allowed maximum input fields
    var max_input = 5;

    // initialize the counter for textbox
    var x = 1;

    // handle click event on Add More button
    $('.add-btn').click(function (e) {
      e.preventDefault();
      if (x < max_input) { // validate the condition
        x++; // increment the counter
        $('.wrapper').append(`
                      <div class="input-box">
                       <div class="row">

                    <div col-lg-6><textarea rows="8" cols="60" style="margin-right:20px ;""></textarea></div>
       <div col-lg-6 >
       <label>Author Name</label><br>
         <input type="text" name="input_name[]" placeholder="Author Name">
         <label>Author Position</label><br>
         <input type="text" name="input_name1[]" placeholder="Author Position">
         <label>image</label><br>
         <input type="file" name="input_name2[]" >
          </div>
            <button class="remove-lnk" style="background:#7e37d8;color:white;border-radius:7px;padding:10px 10px;cursor:pointer;display:inline-block;margin:70px 0px 0px 313px;height:40px;">Delete</button>
          </div>
          
          
         

        `); // add input field
      }
    });

    // handle click event of the remove link
    $('.wrapper').on("click", ".remove-lnk", function (e) {
      e.preventDefault();
      $(this).parent('div').remove();  // remove input field
      x--; // decrement the counter
    })

  });
  //------------------------------------------//
//title tooltip









/////////////FORM4///////////
$(document).ready(function(){
  $("#form4").submit(function(event){
      event.preventDefault();
  });
  $("#form4").validate({
      rules:{
        title:"required",
  },
  messages:{
    title:"please enter first name",
  },
  });
  //docs close
});
 