// ============================================================
// CodeLoop — Chatbot Simulation Logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const fab = document.getElementById('chatbot-fab');
  const chatWindow = document.getElementById('chatbot-window');
  const chatBody = document.getElementById('chatbot-body');
  const chatInput = document.getElementById('chatbot-input');
  const chatSendBtn = document.getElementById('chatbot-send');

  if (!fab || !chatWindow || !chatBody || !chatInput || !chatSendBtn) return;

  let isOpen = false;
  let isTyping = false;

  // Toggle Chatbot
  fab.addEventListener('click', () => {
    isOpen = !isOpen;
    
    if (isOpen) {
      // Open animation
      fab.classList.add('is-open');
      chatWindow.classList.add('is-active');
      
      gsap.to(chatWindow, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.2)'
      });
      
      // Focus input
      setTimeout(() => chatInput.focus(), 400);

      // If it's the first time opening and no messages exist yet, send greeting
      if (chatBody.children.length === 0) {
        showTypingIndicator();
        setTimeout(() => {
          removeTypingIndicator();
          const templateMessage = `Hi there! 👋 Welcome to CodeLoop.

I'm your virtual assistant. You can ask me about:
• Our Services & Tech Stack
• Pricing & Timelines
• Scheduling a Meeting
• Viewing our Portfolio

How can I help you today?`;
          addMessage(templateMessage, 'bot');
        }, 1200);
      }
    } else {
      // Close animation
      fab.classList.remove('is-open');
      chatWindow.classList.remove('is-active');
      
      gsap.to(chatWindow, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  });

  // Handle Send
  function handleSend() {
    const text = chatInput.value.trim();
    if (!text || isTyping) return;

    // 1. Add user message
    addMessage(text, 'user');
    chatInput.value = '';

    // 2. Simulate bot typing
    isTyping = true;
    showTypingIndicator();

    // 3. Simple keyword-based response simulation
    setTimeout(() => {
      removeTypingIndicator();
      const response = generateBotResponse(text);
      addMessage(response, 'bot');
      isTyping = false;
    }, 1500 + Math.random() * 1000); // 1.5s - 2.5s delay
  }

  // Event Listeners for Send
  chatSendBtn.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });

  // Helper: Add Message to DOM
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    
    scrollToBottom();
  }

  // Helper: Typing Indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-message', 'bot', 'typing-indicator-container');
    typingDiv.id = 'bot-typing-indicator';
    typingDiv.innerHTML = `
      <div class="chat-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    chatBody.appendChild(typingDiv);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('bot-typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function scrollToBottom() {
    chatBody.scrollTo({
      top: chatBody.scrollHeight,
      behavior: 'smooth'
    });
  }

  // Helper: Robust Local Response Engine
  function generateBotResponse(input) {
    const text = input.toLowerCase();

    // 1. Pricing / Quotes
    if (text.match(/price|pricing|cost|quote|how much|budget|estimate|money/)) {
      return "Every project is unique! Generally, landing pages start at $2,000, and full web applications start around $10,000. Would you like to schedule a free discovery call to get a precise quote for your idea?";
    }
    
    // 2. Services / Capabilities
    if (text.match(/service|build|do you do|can you|offer|tech stack|technologies/)) {
      return "We are a full-service digital agency. We specialize in Custom Web Development (React, Next.js, GSAP), UI/UX Design (Figma), and Mobile App Development (React Native). We love building fast, animated, and modern digital experiences!";
    }

    // 3. Contact / Hire
    if (text.match(/contact|call|email|hire|reach|talk|meeting|schedule/)) {
      return "We'd love to chat! You can reach us directly at hello@codeloop.agency, or just click the 'Get a Quote' button on this page to send us a direct message.";
    }

    // 4. Greetings
    if (text.match(/^(hi|hello|hey|yo|greetings|good morning|good afternoon)/)) {
      const greetings = [
        "Hello there! How can we help you today?",
        "Hi! Welcome to CodeLoop. What brings you here?",
        "Hey! Looking to build something awesome?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // 5. Portfolio / Previous Work
    if (text.match(/portfolio|work|projects|examples|case studies/)) {
      return "We've worked with clients across 10+ countries, delivering over 50 projects! You can scroll up to the 'Selected Works' section to see some of our recent favorites.";
    }

    // 6. Location / Remote
    if (text.match(/where|location|based|remote/)) {
      return "We work with clients completely remote worldwide! No matter what timezone you're in, our async workflow ensures seamless communication.";
    }

    // 7. Timeline / Speed
    if (text.match(/time|how long|fast|speed|duration/)) {
      return "A standard marketing website usually takes 2-4 weeks, while complex web apps take 2-3 months. We move fast without compromising on that premium quality.";
    }
    
    // 8. Polite / Closings
    if (text.match(/thanks|thank you|awesome|great|cool|bye|goodbye/)) {
      return "You're very welcome! If anything else comes up, I'm right here.";
    }

    // 9. Jokes / Easter Eggs
    if (text.match(/joke|funny/)) {
      return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛 (Don't worry, our code is bug-free!)";
    }

    // Default Fallback
    const fallbacks = [
      "That's a great question! For specific details like that, it's best to email our human team at hello@codeloop.agency.",
      "I'm currently just a simulated frontend assistant, so I don't know the answer to that specific question! But our team definitely does. Want to send them an email?",
      "Interesting! Tell you what—shoot an email to hello@codeloop.agency and one of our lead developers will answer that for you directly."
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
});
