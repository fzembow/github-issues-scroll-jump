import * as css from './style.css';
import smoothscroll from 'smoothscroll';

const COMMENT_SELECTOR = 'div.js-discussion div.timeline-comment';
const REACTION_SELECTOR = 'div.comment-reactions-options button.reaction-summary-item';


class ReactionScrollBar {
  constructor(commentsWithReactions) {
    this.commentsWithReactions = commentsWithReactions;
    const container = document.createElement('div');
    this.container = container;

    container.className = css.container;
    document.body.appendChild(container);
    window.addEventListener('resize', this.updateReactionEls.bind(this));
    this.updateReactionEls();
  }
  
  updateReactionEls() {
    const documentHeight = document.documentElement.offsetHeight;
    const viewportHeight = window.innerHeight;

    this.commentsWithReactions.forEach(comment => {
      let linkEl = comment.linkEl;
      if (!linkEl) {
        comment.linkEl = linkEl = document.createElement('button');

        let topEmoji;
        let topCount = 0;
        const reactions = comment.reactions;
        Object.keys(reactions).forEach(reaction => {
          const count = reactions[reaction];
          if (count > topCount) {
            topEmoji = reaction;
            topCount = count;
          }
        });

        linkEl.textContent = `${topCount} ${topEmoji}`;

        linkEl.className = css.reactionLink;
        linkEl.tabIndex = 0;
        linkEl.style.zIndex = topCount;

        const scrollToComment = () => {
          smoothscroll(comment.commentEl);
        }

        linkEl.addEventListener('click', scrollToComment);
        linkEl.addEventListener('focus', scrollToComment);
        this.container.appendChild(linkEl);
      }

      const linkPosition = (comment.commentTopPx / documentHeight) * viewportHeight;
      linkEl.style.top = `${linkPosition}px`;
    });
  }
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
    .map(getElBoundingBox);
}


function getReactionsForComment(commentEl) {
  const reactionsButtonEls = commentEl.querySelectorAll(REACTION_SELECTOR);
  if (!reactionsButtonEls.length) {
    return undefined;
  }

  const reactions = {};
  reactionsButtonEls.forEach(buttonEl => {
    const emoji = buttonEl.querySelector('.emoji').textContent.trim();
    const count = parseInt(buttonEl.textContent.replace(emoji, '').trim());
    reactions[emoji] = count;
  });
  
  return {
    commentEl: commentEl,
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


function init() {
  const commentsWithReactions = getCommentsWithReactions();
  if (commentsWithReactions) {
    new ReactionScrollBar(commentsWithReactions);
  }
}


init();
