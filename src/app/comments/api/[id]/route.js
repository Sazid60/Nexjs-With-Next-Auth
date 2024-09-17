export async function PATCH(request, { params }) {
    const body = await request.json();

    const index = comments.findIndex((c) => parseInt(c.id) === parseInt(params.id));

    comments[index] = {
        id: params.id,
        text: body.text
    }

    return Response.json({
        message: "Comments Updated",
        comments
    })
}

export async function DELETE(request, { params }) {
    const newComments = comments.filter((c) => parseInt(c.id) !== parseInt(params.id))
    return Response.json({
        message: "Comment Deleted",
        newComments
    })
}

const comments = [
    {
        id: "1",
        text: "comment-1"
    },
    {
        id: "2",
        text: "comment-2"
    },
    {
        id: "3",
        text: "comment-3"
    },

]