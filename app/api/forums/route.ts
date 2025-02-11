import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const start = (page - 1) * limit

  // Fetch posts with pagination
  const { data: posts, error: postsError, count } = await supabase
    .from('forum_posts')
    .select(`
      *,
      messages:forum_messages(*),
      tags:post_tags(tag:tags(*))
    `, { count: 'exact' })
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .range(start, start + limit - 1)

  // Fetch all tags
  const { data: tags } = await supabase
    .from('tags')
    .select('name')

  if (postsError) {
    return NextResponse.json({ error: postsError.message }, { status: 500 })
  }

  return NextResponse.json({
    posts,
    tags: tags?.map(t => t.name) || [],
    totalPosts: count || 0,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / limit)
  })
}

export async function POST(request: Request) {
  const data = await request.json()

  switch (data.type) {
    case 'newPost': {
      const { data: post, error } = await supabase
        .from('forum_posts')
        .insert({
          title: data.title,
          author: "Current User", // You should get this from auth
          author_avatar: "/placeholder.svg?height=40&width=40",
          content: data.content,
          image_urls: data.imageUrls || [],
          is_pinned: false
        })
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })

      // Insert tags
      if (data.tags?.length > 0) {
        const { error: tagError } = await supabase
          .from('post_tags')
          .insert(data.tags.map((tag: string) => ({
            post_id: post.id,
            tag_id: tag
          })))

        if (tagError) return NextResponse.json({ error: tagError.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, post })
    }

    case 'deletePost': {
      const { error } = await supabase
        .from('forum_posts')
        .delete()
        .eq('id', data.postId)

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true })
    }

    case 'newMessage': {
      const { error } = await supabase
        .from('forum_messages')
        .insert({
          post_id: data.postId,
          author: data.message.author,
          content: data.message.content
        })

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true })
    }

    case 'deleteMessage': {
      const { error } = await supabase
        .from('forum_messages')
        .delete()
        .eq('id', data.messageId)

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true })
    }

    case 'toggleLike': {
      const { data: post, error } = await supabase
        .from('forum_posts')
        .update({ 
          likes: data.isLiked 
            ? supabase.rpc('decrement_likes', { row_id: data.postId })
            : supabase.rpc('increment_likes', { row_id: data.postId })
        })
        .eq('id', data.postId)
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true, post })
    }

    case 'addTag': {
      const { error } = await supabase
        .from('tags')
        .insert({ name: data.tag })

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true })
    }

    case 'togglePin': {
      const { error } = await supabase
        .from('forum_posts')
        .update({ is_pinned: data.isPinned })
        .eq('id', data.postId)

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true })
    }

    default:
      return NextResponse.json({ error: 'Invalid action type' }, { status: 400 })
  }
}

