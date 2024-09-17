import React from 'react';


export const generateMetadata = async ({ params }) => {
    const res = (await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`))
    const postData = await res.json()

    return {
        title: `${postData.title}`,
        description: `${postData.body}`,
        keywords: postData.body.split(' ')
    }
}
const getPostDetails = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = res.json()
    return data
}
const PostDetailPage = async ({ params }) => {
    const postDetails = await getPostDetails(params.id)
    console.log(postDetails)
    return (
        <div>
            <h1 className='font-bold text-xl'>{postDetails.title}</h1>
            <h1>{postDetails.body}</h1>
        </div>
    );
};

export default PostDetailPage