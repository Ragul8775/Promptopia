"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const filteredPosts = posts.filter(
    (post) =>
      post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      post.creator.username.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    setSearchText(tagName);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for Prompts"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
