import React, { useState, useEffect } from 'react'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [searchId, setSearchId] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingComments, setLoadingComments] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [commentsError, setCommentsError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchId.trim()) {
      const id = parseInt(searchId.trim())
      if (!isNaN(id) && id > 0) {
        const filtered = posts.filter((post) => post.id === id)
        setFilteredPosts(filtered)
        if (filtered.length > 0) {
          fetchComments(id)
        } else {
          setComments([])
          setCommentsError(null)
        }
      } else {
        setFilteredPosts([])
        setComments([])
        setCommentsError(null)
      }
    } else {
      setFilteredPosts(posts)
      setComments([])
      setCommentsError(null)
    }
  }, [searchId, posts])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data: Post[] = await response.json()
      setPosts(data)
      setFilteredPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async (postId: number) => {
    try {
      setLoadingComments(true)
      setCommentsError(null)
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch comments')
      }
      const data: Comment[] = await response.json()
      setComments(data)
    } catch (err) {
      setCommentsError(err instanceof Error ? err.message : 'Failed to fetch comments')
    } finally {
      setLoadingComments(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value)
  }

  if (loading) {
    return (
      <div className="page-container">
        <h1>Posts</h1>
        <LoadingState />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Posts</h1>
        <ErrorState message={error} onRetry={fetchPosts} />
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1>Posts</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={searchId}
          onChange={handleSearchChange}
          placeholder="Search by Post ID (e.g., 1, 2, 3...)"
          className="search-input"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState message={searchId ? `No post found with ID: ${searchId}` : 'No posts available'} />
      ) : (
        <>
          <div className="posts-list">
            {filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <h3 className="post-title">Post #{post.id}: {post.title}</h3>
                <p className="post-body">{post.body}</p>
                <p className="post-meta">User ID: {post.userId}</p>
              </div>
            ))}
          </div>

          {searchId && filteredPosts.length > 0 && (
            <div className="comments-section">
              <h2>Comments for Post #{searchId}</h2>
              {loadingComments ? (
                <LoadingState />
              ) : commentsError ? (
                <ErrorState message={commentsError} onRetry={() => fetchComments(parseInt(searchId))} />
              ) : comments.length === 0 ? (
                <EmptyState message="No comments found for this post" />
              ) : (
                <div className="comments-list">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-card">
                      <h4 className="comment-name">{comment.name}</h4>
                      <p className="comment-email">{comment.email}</p>
                      <p className="comment-body">{comment.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PostsPage
