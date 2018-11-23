import * as css from './style.css';
import smoothscroll from 'smoothscroll';


class ReactionScrollBar {
  constructor(commentsWithReactions = []) {
    this.commentsWithReactions = commentsWithReactions;
    const container = document.createElement('div');
    this.container = container;

    container.className = css.container;
    document.body.appendChild(container);
    window.addEventListener('resize', this.updateReactionEls.bind(this), { passive: true });
    this.updateReactionEls();
  }

  clearComments() {
    // Remove any existing buttons
    this.commentsWithReactions.forEach(comment => {
      if (comment.linkEl) {
        this.container.removeChild(comment.linkEl);
      }
    });
    this.commentsWithReactions = [];
  }

  setComments(commentsWithReactions = []) {
    this.clearComments();
    this.commentsWithReactions = commentsWithReactions;
    this.updateReactionEls();
  }

  scrollToComment (comment, alwaysScroll) {
    return () => {
      if (comment.active && !alwaysScroll) {
        return;
      }
      this.commentsWithReactions.forEach(comment => {
        comment.active = false;
      });
      smoothscroll(comment.commentEl);
      comment.active = true;
    }
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

        linkEl.addEventListener('click', this.scrollToComment(comment, true));
        linkEl.addEventListener('focus', this.scrollToComment(comment));
        this.container.appendChild(linkEl);
      }

      const linkPosition = (comment.commentTopPx / documentHeight) * viewportHeight;
      linkEl.style.top = `${linkPosition}px`;
    });
  }
}

export default ReactionScrollBar;
