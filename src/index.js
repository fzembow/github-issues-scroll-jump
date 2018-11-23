import NavigationChangeNotifier from './navigation-change-notifier';
import ReactionScrollBar from './reaction-scroll-bar';

const ISSUE_THREAD_URL_REGEX = /^https:\/\/github.com\/.*\/issues\/[0-9]+/;
const COMMENT_SELECTOR = 'div.js-discussion div.timeline-comment';
const REACTION_SELECTOR = 'div.comment-reactions-options button.reaction-summary-item';

const TOP_N_COMMENTS_SHOWN = 10;


function init() {
  const reactionScrollBar = new ReactionScrollBar();

  function updateScrollBar() {
    const commentsWithReactions = getCommentsWithReactions();
    reactionScrollBar.setComments(commentsWithReactions);
  }
  updateScrollBar();

  new NavigationChangeNotifier({
    urlPattern: ISSUE_THREAD_URL_REGEX,
    onNavigateToMatch: updateScrollBar,
    onNavigateElsewhere: () => { reactionScrollBar.clearComments() },
    loadDetectionSelector: COMMENT_SELECTOR,
  });
}


/**
 * Returns an array that looks like:
 * [
 *  {
 *    commentEl: DOMNode,
 *    commentTopPx: number,
 *    reactions: [
 *      {
 *        type: string,
 *        count: number,
*      }
 *    ],
 *  }
 * ]
 */
function getCommentsWithReactions() {
  const commentEls = [...document.querySelectorAll(COMMENT_SELECTOR)];
  if (!commentEls.length) {
    return;
  }

  return commentEls
    .map(getReactionsForComment)
    .filter(res => res)
    // Get the top N
    .sort((a, b) => (b.reactionCount - a.reactionCount))
    .slice(0, TOP_N_COMMENTS_SHOWN)
    // Sort them back into flow order so tab works correctly.
    .map(getElBoundingBox)
    .sort((a, b) => (a.commentTopPx - b.commentTopPx));
}


function getReactionsForComment(commentEl) {
  const reactionsButtonEls = commentEl.querySelectorAll(REACTION_SELECTOR);
  if (!reactionsButtonEls.length) {
    return undefined;
  }

  const reactions = {};
  let reactionCount = 0;
  reactionsButtonEls.forEach(buttonEl => {
    const emoji = buttonEl.querySelector('.emoji').textContent.trim();
    const count = parseInt(buttonEl.textContent.replace(emoji, '').trim());
    reactions[emoji] = count;
    reactionCount += count;
  });
  
  return {
    commentEl: commentEl,
    reactionCount,
    reactions,
  };
}


function getElBoundingBox(comment) {
  const scrollTop = document.documentElement.scrollTop;
  const bbox = comment.commentEl.getBoundingClientRect();
  return {
    ...comment,
    commentTopPx: bbox.top + scrollTop,
  }
}


init();
