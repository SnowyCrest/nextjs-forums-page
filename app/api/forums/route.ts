import { NextResponse } from 'next/server'

let forumPosts = [
  {
    id: 1,
    title: "Welcome to our new forums!",
    author: "Admin",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "2023-06-01",
    content: "We're excited to launch our new forums. Feel free to start discussions, ask questions, and connect with other members!",
    tags: ["announcement", "welcome"],
    replies: 5,
    likes: 10,
    messages: [
      { id: 1, author: "User1", content: "Great to be here!" },
      { id: 2, author: "User2", content: "Looking forward to the discussions!" }
    ],
    imageUrls: [],
    isPinned: false,
  },
  {
    id: 2,
    title: "Tips for new members",
    author: "Moderator",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "2023-06-02",
    content: "Here are some tips to get started: 1) Introduce yourself, 2) Read the rules, 3) Be respectful to others.",
    tags: ["tips", "newbies"],
    replies: 3,
    likes: 7,
    messages: [
      { id: 3, author: "NewUser", content: "Thanks for the tips!" }
    ],
    imageUrls: [],
    isPinned: false,
  },
  {
    id: 3,
    title: "Upcoming community events",
    author: "EventCoordinator",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "2023-06-03",
    content: "We have some exciting community events planned for the next month. Stay tuned for more information!",
    tags: ["events", "community"],
    replies: 8,
    likes: 15,
    messages: [
      { id: 4, author: "User3", content: "Can't wait to hear more!" },
      { id: 5, author: "User4", content: "Will there be any online events?" }
    ],
    imageUrls: [],
    isPinned: false,
  }
]

let allTags = ["announcement", "welcome", "tips", "newbies", "events", "community"]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const start = (page - 1) * limit
  const end = start + limit

  const paginatedPosts = forumPosts.slice(start, end)
  return NextResponse.json({ 
    posts: paginatedPosts, 
    tags: allTags, 
    totalPosts: forumPosts.length,
    currentPage: page,
    totalPages: Math.ceil(forumPosts.length / limit)
  })
}

export async function POST(request: Request) {
  const data = await request.json()

  switch (data.type) {
    case 'newPost':
      const newPost = {
        id: forumPosts.length + 1,
        title: data.title,
        author: "Current User",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: new Date().toISOString().split('T')[0],
        content: data.content,
        tags: data.tags,
        replies: 0,
        likes: 0,
        messages: [],
        imageUrls: data.imageUrls || [],
        isPinned: false,
      }
      forumPosts.push(newPost)
      return NextResponse.json({ success: true, post: newPost })

    case 'deletePost':
      forumPosts = forumPosts.filter(post => post.id !== data.postId)
      return NextResponse.json({ success: true })

    case 'newMessage':
      const { postId, message } = data
      const post = forumPosts.find(p => p.id === postId)
      if (post) {
        const newMessageId = post.messages.length > 0 ? Math.max(...post.messages.map(m => m.id)) + 1 : 1
        post.messages.push({ id: newMessageId, ...message })
        post.replies += 1
      }
      return NextResponse.json({ success: true })

    case 'deleteMessage':
      const postToUpdate = forumPosts.find(p => p.id === data.postId)
      if (postToUpdate) {
        postToUpdate.messages = postToUpdate.messages.filter(m => m.id !== data.messageId)
        postToUpdate.replies -= 1
      }
      return NextResponse.json({ success: true })

    case 'toggleLike':
      const postToLike = forumPosts.find(p => p.id === data.postId)
      if (postToLike) {
        postToLike.likes += data.isLiked ? -1 : 1
      }
      return NextResponse.json({ success: true })

    case 'addTag':
      if (!allTags.includes(data.tag)) {
        allTags.push(data.tag)
      }
      return NextResponse.json({ success: true, tags: allTags })

    case 'togglePin':
      const postToPin = forumPosts.find(p => p.id === data.postId)
      if (postToPin) {
        postToPin.isPinned = data.isPinned
      }
      return NextResponse.json({ success: true })

    default:
      return NextResponse.json({ success: false, error: 'Invalid action type' }, { status: 400 })
  }
}

