import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat@1.46.5/dist/chat.bundle.es.js';

createChat({
  webhookUrl: 'https://agenticflows.tokencraze.org/webhook/8949aee8-9845-4179-96cd-45fb7aab84b3/chat',
  mode: 'window',
  loadPreviousSession: false,
  initialMessages: [
    'Hello! I’m your JS-SEZ advisor.',
    'Ask me about zones, SETUP, incentives, tax or staff passes. Please ask for a playbook page.'
  ],
  i18n: {
    en: {
      title: 'JS-SEZ advisor',
      subtitle: '',
      footer: '',
      getStarted: 'Start a new chat',
      inputPlaceholder: 'Ask a JS-SEZ question...'
    }
  }
});

const makeLauncherAccessible = () => {
  const launcher = document.querySelector('#n8n-chat .chat-window-toggle');
  if (!launcher || launcher.dataset.keyboardAccessible === 'true') {
    return Boolean(launcher);
  }

  launcher.dataset.keyboardAccessible = 'true';
  launcher.setAttribute('role', 'button');
  launcher.setAttribute('tabindex', '0');

  const updateExpanded = () => {
    const chatWindow = document.querySelector('#n8n-chat .chat-window');
    const isOpen = chatWindow && getComputedStyle(chatWindow).display !== 'none';
    launcher.setAttribute('aria-expanded', String(Boolean(isOpen)));
    launcher.setAttribute(
      'aria-label',
      isOpen ? 'Close JS-SEZ advisor chat' : 'Open JS-SEZ advisor chat'
    );
  };

  const chatWindow = document.querySelector('#n8n-chat .chat-window');
  if (chatWindow) {
    const chatWindowObserver = new MutationObserver(updateExpanded);
    chatWindowObserver.observe(chatWindow, { attributes: true, attributeFilter: ['class', 'style'] });
  }
  launcher.addEventListener('click', () => setTimeout(updateExpanded, 100));
  launcher.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      event.preventDefault();
      launcher.click();
    }
  });
  updateExpanded();
  return true;
};

if (!makeLauncherAccessible()) {
  const observer = new MutationObserver(() => {
    if (makeLauncherAccessible()) {
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
