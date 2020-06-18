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
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-containers > ul').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }

            })
        })
    }
    //method to create post in dom
    let newPostDom = function(post){
        return $(`<li id="post-${post.id}">
                    
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post.id}"> X </a>
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
    createPost();

    

}