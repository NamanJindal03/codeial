{
    
    //method to submit form data for new post using ajax
    let createPost = function(){
        console.log('in');
        let newPostForm = $('#new-post-form');
        console.log(newPostForm);
        newPostForm.submit(function(e){
            console.log("int 2");
            e.preventDefault();

            //implementing ajax
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    noty_success("Post Created");
                    
                    $('#posts-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button',newPost));
                },
                error: function(error){
                    noty_error("Post Failed to Create");
                    console.log("err in here:" + error.responseText);
                }

            })
        })
    }
    //method to create post in dom
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}"> X </a>
                    </small>
                    
                    <p>
                        ${post.content}
                        <br>
                        <small>${post.user.name}</small>
                    </p>
                    <div class="post-comments">
                        
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="add comments">
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add comment">
                        </form>
                        
                        <div class="post-comments-list">
                            <ul id="post-comments=${post._id}">
                                
                            </ul>
                        </div>
                    </div>
                </li>
    `)
    }

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                //to get the href value from the a tag( a tag is deleteLink in here);
                url: $(deleteLink).prop('href'),
                success: function(data){
                    //.remove() in jquery deletes the selected thing from the DOM
                    noty_success("Post Deleted");
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    noty_error("Post Delete Failed");
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();

    

}