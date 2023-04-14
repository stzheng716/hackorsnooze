"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  evt.preventDefault();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** shows the new story form when submit button is clicked */

function navSubmit(evt) {
  evt.preventDefault();
  $newStoryForm.show();
}

$navSubmit.on("click", navSubmit);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  evt.preventDefault();
  hidePageComponents();
  $newStoryForm.hide();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  // $navSubmit.show()
  $navUserFeatures.show();
  $signupForm.hide();
  $loginForm.hide();
}

function handleNavFavoriteClick() {
    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }
  
    $allStoriesList.show();
}

$navFavorite.on("click", handleNavFavoriteClick);