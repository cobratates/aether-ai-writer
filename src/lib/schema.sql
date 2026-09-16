-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  brand_voice_tone text default 'Professional yet conversational',
  brand_voice_topics text,
  whop_user_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check ((select auth.uid()) = id);
create policy "Users can update own profile." on profiles for update using ((select auth.uid()) = id);

-- Create a table for generated posts history
create table posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  original_input text not null,
  linkedin_post text,
  twitter_post text,
  threads_post text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS) for posts
alter table posts enable row level security;
create policy "Users can view their own posts." on posts for select using ((select auth.uid()) = user_id);
create policy "Users can insert their own posts." on posts for insert with check ((select auth.uid()) = user_id);
create policy "Users can update their own posts." on posts for update using ((select auth.uid()) = user_id);
create policy "Users can delete their own posts." on posts for delete using ((select auth.uid()) = user_id);

-- Create a trigger to automatically create a profile for new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill existing users (just in case you created an account before running this script)
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

-- Phase 4: Monetization Tracking
alter table public.profiles
  add column if not exists generations_count integer default 0,
  add column if not exists is_pro boolean default false;
