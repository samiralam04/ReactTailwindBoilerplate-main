import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

// Component for creating a new storyboard
const NewStoryboardPopup = ({ onClose, onCreateStoryboard }) => {
  const [storyboardName, setStoryboardName] = useState(""); // State for storyboard name
  const [frameSize, setFrameSize] = useState(""); // State for frame size

  // Function to handle creating a new storyboard
  const handleCreate = () => {
    onCreateStoryboard(storyboardName, frameSize); // Call onCreateStoryboard function passed from parent component
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75 z-50">
      <div className="bg-white p-8 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">New Storyboard</h2>
        {/* Input field for storyboard name */}
        <input
          type="text"
          placeholder="Storyboard Name"
          value={storyboardName}
          onChange={(e) => setStoryboardName(e.target.value)}
          className="text-gray-700 focus:outline-none border-b border-gray-300 mb-4 w-full"
        />
        {/* Dropdown for selecting frame size */}
        <select
          value={frameSize}
          onChange={(e) => setFrameSize(e.target.value)}
          className="text-gray-700 focus:outline-none mb-4 w-full"
        >
          <option value="">Select Frame Size</option>
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
        </select>
        {/* Buttons for creating or canceling */}
        <div className="flex justify-end">
          <button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Create Storyboard
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component for managing card sections
const CardSection = () => {
  const [stories, setStories] = useState([]); // State for storing stories
  const [showAddButton, setShowAddButton] = useState(true); // State for showing the add button
  const [newStoryboardPopup, setNewStoryboardPopup] = useState(false); // State for showing the new storyboard popup
  const [fullScreenContent, setFullScreenContent] = useState(""); // State for displaying full screen content
  const [selectedStory, setSelectedStory] = useState(null); // State for the selected story
  const [selectedReadStory, setSelectedReadStory] = useState(null); // State for the selected story to read
  const [showReadPopup, setShowReadPopup] = useState(false); // State for showing the read popup
  const [editedContent, setEditedContent] = useState(""); // State for edited content
  const [hoveredThumbnailId, setHoveredThumbnailId] = useState(null); // State for hovered thumbnail id
  const [showActionButtons, setShowActionButtons] = useState(false); // State for showing action buttons

  // useEffect hook to initialize stories with a default story
  useEffect(() => {
    // Default story
    const defaultStory = {
      id: 0,
      title: "Sample Story",
      content:
        "This is a Sample story added for demonstration purposes you can edit this sample story as you want.",
      thumbnail:
        "https://images.unsplash.com/photo-1704929879909-2a972afed576?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      showContent: true,
      dateAdded: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      frameSize: "landscape",
    };
    setStories([defaultStory]); // Set stories with default story
  }, []);

  // Function to add a new story
  const addStory = () => {
    setNewStoryboardPopup(true); // Show new storyboard popup
  };

  // Function to close the new storyboard popup
  const closeNewStoryboardPopup = () => {
    setNewStoryboardPopup(false);
  };

  // Function to create a new storyboard
  const createStoryboard = (name, size) => {
    // Create a new story object
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newStory = {
      id: Date.now(),
      title: name,
      content: "",
      thumbnail: "https://via.placeholder.com/150",
      showContent: true,
      dateAdded: currentDate,
      frameSize: size,
    };

    setStories([...stories, newStory]); // Add new story to stories
    setShowAddButton(false); // Hide add button
  };

  // Function to close full screen content
  const closeFullScreenContent = () => {
    setFullScreenContent("");
  };

  // Function to handle thumbnail click
  const handleThumbnailClick = (story) => {
    setSelectedStory(story); // Set selected story
  };

  // Function to handle thumbnail hover
  const handleThumbnailHover = (storyId) => {
    setHoveredThumbnailId(storyId); // Set hovered thumbnail id
    setShowActionButtons(false); // Hide action buttons
  };

  // Function to toggle actions for a story
  const toggleActions = (story) => {
    setSelectedStory(story); // Set selected story
    setShowActionButtons(!showActionButtons); // Toggle action buttons
  };

  // Function to edit a story
  const editStory = (story) => {
    setFullScreenContent("edit"); // Show full screen content for editing
    setEditedContent(story.content); // Set edited content
  };

  // Function to download a story
  const DownloadStory = (story) => {
    // Create a downloadable file
    const element = document.createElement("a");
    const file = new Blob([story.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${story.title}.txt`;
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  // Function to delete a story
  const deleteStory = () => {
    setStories(stories.filter((s) => s.id !== selectedStory.id)); // Remove selected story from stories
    setSelectedStory(null); // Clear selected story
    setFullScreenContent(""); // Clear full screen content
  };

  // Function to read a story
  const readStory = (story) => {
    setSelectedReadStory(story); // Set selected story to read
    setShowReadPopup(true); // Show read popup
  };

  // Function to update story data
  const updateStory = (id, key, value) => {
    const updatedStories = stories.map((s) => {
      if (s.id === id) {
        return { ...s, [key]: value };
      }
      return s;
    });
    setStories(updatedStories); // Update stories with updated story data
  };

  // Function to handle thumbnail upload
  const handleThumbnailUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateStory(id, "thumbnail", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to toggle content visibility
  const toggleContentVisibility = (id) => {
    const updatedStories = stories.map((s) => {
      if (s.id === id) {
        return { ...s, showContent: !s.showContent };
      }
      return { ...s, showContent: false };
    });
    setStories(updatedStories); // Update stories with toggled content visibility
  };

  // Function to submit a story
  const submitStory = (id) => {
    toggleContentVisibility(id); // Toggle content visibility
    setShowAddButton(true); // Show add button
  };

  // Function to save changes made to a story
  const saveChanges = () => {
    updateStory(selectedStory.id, "content", editedContent); // Update story content
    setFullScreenContent(""); // Clear full screen content
  };

  // Function to cancel story editing
  const cancelEdit = () => {
    setFullScreenContent(""); // Clear full screen content
  };

  return (
    <section className="container mx-auto py-1 shadow-lg mb-20 mt-20 ml-25 bg-white  rounded">
      {/* Title and add button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div>
            <FontAwesomeIcon
              icon={faFolderOpen}
              size="xl"
              className="ml-10 mt-8"
            />
          </div>
          <h2 className="text-2xl font-bold mr-5 ml-2 mt-8">Default Project</h2>
          <p className="text-gray-500 mt-20" style={{ marginLeft: "-13rem" }}>
            {stories.length} Cards
          </p>
        </div>
        {showAddButton && (
          <button
            onClick={addStory}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-5 mt-10"
          >
            New Project
          </button>
        )}
      </div>
      {/* New storyboard popup */}
      {newStoryboardPopup && (
        <NewStoryboardPopup
          onClose={closeNewStoryboardPopup}
          onCreateStoryboard={createStoryboard}
        />
      )}
      {/* Grid for displaying stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-lg shadow-md overflow-hidden relative ml-10 mb-10 mr-10"
            onMouseEnter={() => handleThumbnailHover(story.id)}
            onMouseLeave={() => handleThumbnailHover(null)}
          >
            {/* Thumbnail */}
            <img
              src={story.thumbnail}
              alt="Thumbnail"
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => handleThumbnailClick(story)}
            />
            <div className="px-4 py-2">
              {/* Story title and date added */}
              <h3 className="text-lg font-bold mb-1">{story.title}</h3>
              <p className="text-sm text-gray-500">{story.dateAdded}</p>
            </div>
            {/* Action buttons */}
            {hoveredThumbnailId === story.id && (
              <div
                className="absolute top-0 right-0 mt-2 mr-2"
                style={{
                  opacity: hoveredThumbnailId === story.id ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  animation:
                    hoveredThumbnailId === story.id
                      ? "fade-in 0.5s ease-in-out"
                      : "none",
                }}
              >
                <button
                  onClick={() => toggleActions(story)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-grey font-bold py-1 px-2 rounded text-xs"
                >
                  i
                </button>
              </div>
            )}
            {/* Action buttons */}
            {showActionButtons &&
              selectedStory &&
              selectedStory.id === story.id && (
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <button
                    onClick={() => readStory(story)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-xs"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => editStory(story)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded ml-1 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => DownloadStory(story)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded ml-1 text-xs"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => deleteStory(story)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-1 text-xs"
                  >
                    Delete
                  </button>
                </div>
              )}
            {/* Edit content */}
            {story.showContent && (
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Story title"
                  value={story.title}
                  onChange={(e) =>
                    updateStory(story.id, "title", e.target.value)
                  }
                  className="text-xl font-bold mb-2 focus:outline-none border-b border-gray-300"
                />
                <textarea
                  placeholder="Write your story here"
                  value={story.content}
                  onChange={(e) =>
                    updateStory(story.id, "content", e.target.value)
                  }
                  className="text-gray-700 focus:outline-none resize-none mt-2 w-full"
                  rows="6"
                ></textarea>
                <input
                  type="file"
                  onChange={(e) => handleThumbnailUpload(story.id, e)}
                  className="text-gray-700 focus:outline-none mt-2"
                />
                <button
                  onClick={() => submitStory(story.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Submit Story
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Read Popup */}
      {showReadPopup && (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75">
          <div className="relative w-full max-w-3xl mx-auto p-8 bg-white rounded-lg overflow-y-auto max-h-full">
            <button
              onClick={() => setShowReadPopup(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              Close
            </button>
            {selectedReadStory && (
              <div className="text-center mb-4">
                <img
                  src={selectedReadStory.thumbnail}
                  alt="Thumbnail"
                  className="mx-auto w-64 h-64 mb-2"
                />
                <h2 className="text-2xl font-bold">
                  {selectedReadStory.title}
                </h2>
                <p>{selectedReadStory.content}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Full Screen Content */}
      {fullScreenContent && (
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-75">
          <div className="relative w-full max-w-3xl mx-auto p-8 bg-white rounded-lg overflow-y-auto max-h-full">
            {fullScreenContent === "edit" ? (
              <div>
                <h2>Edit Story</h2>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="text-gray-700 focus:outline-none resize-none mt-2 w-full"
                  rows="6"
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={saveChanges}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={closeFullScreenContent}
                  className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                >
                  Close
                </button>
                <div dangerouslySetInnerHTML={{ __html: fullScreenContent }} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CardSection;
