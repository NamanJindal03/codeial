{
    //method to submit form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            //implementing ajax
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    //console.log(data);
                    let newPost = newPostDom(data.data.post);
                    console.log(data.data.post);
                    
                    
                    $('#posts-list-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost));
                },
                error: function(error){
                    console.log(error.responseText);
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
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();

    

}