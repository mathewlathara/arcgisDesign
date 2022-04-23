  $('#post-form').on("submit", function(event){
    event.preventDefault();
    console.log("Submitted!")
    create_post();
  });

  function create_post(){
    colsole.log("create post")
  };
