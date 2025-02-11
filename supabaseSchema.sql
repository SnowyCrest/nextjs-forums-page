-- copy this and paste it to your supabase project's SQL editor.

-- forum posts 
create table forum_posts (
  id bigint primary key generated always as identity,
  title text not null,
  author text not null,
  author_avatar text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  likes integer default 0,
  image_urls text[] default '{}',
  is_pinned boolean default false
);

-- messages 
create table forum_messages (
  id bigint primary key generated always as identity,
  post_id bigint references forum_posts(id) on delete cascade,
  author text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- tags 
create table tags (
  id bigint primary key generated always as identity,
  name text unique not null
);

-- post tags junction 
create table post_tags (
  post_id bigint references forum_posts(id) on delete cascade,
  tag_id bigint references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- indexes
create index idx_forum_posts_created_at on forum_posts(created_at);
create index idx_forum_messages_post_id on forum_messages(post_id);
create index idx_post_tags_post_id on post_tags(post_id);
create index idx_post_tags_tag_id on post_tags(tag_id);