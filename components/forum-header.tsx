'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from 'lucide-react'

interface ForumHeaderProps {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
  onSearch: (query: string) => void
  onCreatePost: (post: { title: string; content: string; tags: string[]; imageUrls: string[] }) => void
  onAddCustomTag?: (tag: string) => void // Made optional
}

export function ForumHeader({ tags, selectedTags, onTagSelect, onSearch, onCreatePost, onAddCustomTag }: ForumHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [postTags, setPostTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([''])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreatePost({ title, content, tags: postTags, imageUrls: imageUrls.filter(url => url.trim() !== '') })
    setIsOpen(false)
    setTitle('')
    setContent('')
    setPostTags([])
    setImageUrls([''])
  }

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
      onAddCustomTag?.(newTag.trim())
      setNewTag('')
    }
    setIsAddingTag(false)
  }

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ''])
  }

  const handleRemoveImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls]
    newImageUrls[index] = value
    setImageUrls(newImageUrls)
  }

  return (
    <div className="mb-8 space-y-4 text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow duration-300 mb-2">Forums</h1>
          <span className="text-md text-gray-400">
            by <a href="https://github.com/SnowyCrest" className="hover:text-purple-400 transition-colors">SnowyCrest</a>
          </span>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-purple-500/20">
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create a new forum post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter post title" 
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="Enter post content" 
                />
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={postTags.includes(tag) ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setPostTags(prev =>
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Image URLs</Label>
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <Input
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="Enter image URL"
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveImageUrl(index)}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={handleAddImageUrl} className="mt-2">
                  Add Image URL
                </Button>
              </div>
              <Button type="submit">Create Post</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative">
        <Input 
          type="search" 
          placeholder="Search forums..." 
          className="pl-10 bg-gray-900 border-gray-800 text-white placeholder-gray-400" 
          onChange={(e) => onSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
        {onAddCustomTag && (
          <div className="custom-tag-creation">
            {isAddingTag ? (
              <form onSubmit={handleAddCustomTag} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="New tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-24"
                />
                <Button type="submit" size="sm">
                  Add
                </Button>
              </form>
            ) : (
              <Button variant="outline" size="icon" onClick={() => setIsAddingTag(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

