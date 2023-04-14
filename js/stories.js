"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <i class="bi bi-star"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

const star = $(".bi")
star.on("click", star.toggleClass())
//TODO: add event listener to star to toggle the star fill + add to favorites
function handleStarClick(evt) {
  evt.preventDefault()
  evt.target
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/**
 * gets the inputs from the new story form and uses them to create a new
 * instance of the Stoty object.
 * adds the new story object to the exisiting
 * storyList and displays it on the page.
*/

async function getNewStoryAndDisplay(evt) {
  evt.preventDefault();

  const title = $("#new-story-title").val();
  const author = $("#new-story-author").val();
  const url = $("#new-story-URL").val();

  storyList = await StoryList.getStories();

  await storyList.addStory(currentUser, { title, author, url });

  putStoriesOnPage();
  $newStoryForm.hide();
}

$newStoryForm.on("submit", getNewStoryAndDisplay);