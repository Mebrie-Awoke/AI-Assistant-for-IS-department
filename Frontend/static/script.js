$(document).ready(function() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    $('#welcomeTime').text(timeString);

    $('#userInput').focus();

    let isWaitingForResponse = false;

    function startNewChat() {
        $('#messagesArea').empty();
        
        isWaitingForResponse = false;
        
        $('#userInput').prop('disabled', false);
        $('#sendButton').prop('disabled', false);
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const isDark = $('body').hasClass('dark-theme');
        const botContentClass = isDark ? 'message-content bot-content dark-theme' : 'message-content bot-content';
        const timeClass = isDark ? 'message-time dark-theme' : 'message-time';
        
        const welcomeHtml = `
            <div class="message-wrapper">
                <div class="message bot-message">
                    <div class="${botContentClass}">
                        Hello! I am an assistant from the Information System Department of Addis Ababa University.<br>
                        I am here to provide information and answer questions related to our department.<br>
                    </div>
                </div>
                <div class="${timeClass}">${timeString}</div>
            </div>
        `;
        $('#messagesArea').append(welcomeHtml);
        
        $('#userInput').focus();
    }

    $('#newChatButton').click(function() {
        startNewChat();
    });

    $("#messageForm").on("submit", function(event) {
        event.preventDefault();
        
        const userInput = $('#userInput');
        const message = userInput.val().trim();
        
        if (isWaitingForResponse || !message) return;

        isWaitingForResponse = true;

        userInput.prop('disabled', true);
        $('#sendButton').prop('disabled', true);

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        addUserMessage(message, timeString);
        
        userInput.val('');

        showTypingIndicator();

        $.ajax({
            url: "/get",
            type: "POST",
            data: { msg: message },
            success: function(response) {
                removeTypingIndicator();
                
                addBotMessage(response, timeString);
                
                isWaitingForResponse = false;
                userInput.prop('disabled', false);
                $('#sendButton').prop('disabled', false);
                userInput.focus();
            },
            error: function(xhr, status, error) {
                removeTypingIndicator();
                
                showErrorMessage("Sorry, I encountered an error. Please try again.");
                
                isWaitingForResponse = false;
                userInput.prop('disabled', false);
                $('#sendButton').prop('disabled', false);
                userInput.focus();
                
                console.error("Error:", error);
            }
        });
    });

    $('#userInput').keypress(function(e) {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            if (!isWaitingForResponse) {
                $('#messageForm').submit();
            }
        }
    });

    $('#clearChat').click(function() {
        startNewChat();
    });

    $('#themeToggle').click(function() {
        $('body').toggleClass('dark-theme');
        $('.system-header').toggleClass('dark-theme');
        $('.chat-container').toggleClass('dark-theme');
        $('.messages-area').toggleClass('dark-theme');
        $('.input-area').toggleClass('dark-theme');
        $('.input-wrapper').toggleClass('dark-theme');
        $('input').toggleClass('dark-theme');
        $('.send-btn').toggleClass('dark-theme');
        $('.quick-action').toggleClass('dark-theme');
        $('.message-content').toggleClass('dark-theme');
        $('.message-time').toggleClass('dark-theme');
        $('.footer-text').toggleClass('dark-theme');
        $('.header-info h4').toggleClass('dark-theme');
        $('.bot-avatar').toggleClass('dark-theme'); 
        $('.status span').toggleClass('dark-theme');
        $('.header-actions i').toggleClass('dark-theme');
        $('pre').toggleClass('dark-theme');
        $('code').toggleClass('dark-theme');
        $('.typing-indicator').toggleClass('dark-theme');
        $('.error-message').toggleClass('dark-theme');
        
        $(this).toggleClass('fa-moon fa-sun');
    });
});

function quickQuestion(question) {
    if (window.isWaitingForResponse) return;
    
    $('#userInput').val(question);
    $('#messageForm').submit();
}

function addUserMessage(message, time) {
    const isDark = $('body').hasClass('dark-theme');
    const userContentClass = isDark ? 'message-content user-content dark-theme' : 'message-content user-content';
    const timeClass = isDark ? 'message-time dark-theme' : 'message-time';
    
    const messageHtml = `
        <div class="message-wrapper">
            <div class="message user-message">
                <div class="${userContentClass}">
                    ${escapeHtml(message)}
                </div>
            </div>
            <div class="${timeClass}">${time}</div>
        </div>
    `;
    $('#messagesArea').append(messageHtml);
    scrollToBottom();
}

function addBotMessage(message, time) {
    const isDark = $('body').hasClass('dark-theme');
    const botContentClass = isDark ? 'message-content bot-content dark-theme' : 'message-content bot-content';
    const timeClass = isDark ? 'message-time dark-theme' : 'message-time';
    const decodedMessage = decodeHtmlEntities(message);
    const withNewlines = decodedMessage.replace(/<br\s*\/?>/g, '\n');
    const withoutOtherTags = withNewlines.replace(/<[^>]*>/g, '');
    const formattedMessage = withoutOtherTags.replace(/\n/g, '<br>');
    
    const messageHtml = `
        <div class="message-wrapper">
            <div class="message bot-message">
                <div class="${botContentClass}">
                    ${formattedMessage}
                </div>
            </div>
            <div class="${timeClass}">${time}</div>
        </div>
    `;
    
    $('#messagesArea').append(messageHtml);
    scrollToBottom();
}

function showTypingIndicator() {
    const isDark = $('body').hasClass('dark-theme');
    const typingClass = isDark ? 'typing-indicator dark-theme' : 'typing-indicator';
    
    const typingHtml = `
        <div class="message-wrapper" id="typingIndicator">
            <div class="message bot-message">
                <div class="${typingClass}">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    $('#messagesArea').append(typingHtml);
    scrollToBottom();
}

function removeTypingIndicator() {
    $('#typingIndicator').remove();
}

function showErrorMessage(message) {
    const isDark = $('body').hasClass('dark-theme');
    const errorClass = isDark ? 'error-message dark-theme' : 'error-message';
    
    const errorHtml = `
        <div class="message-wrapper">
            <div class="${errorClass}">
                <i class="fas fa-exclamation-circle"></i>
                ${message}
            </div>
        </div>
    `;
    $('#messagesArea').append(errorHtml);
    scrollToBottom();
    
    setTimeout(() => {
        $('.error-message').fadeOut(300, function() {
            $(this).remove();
        });
    }, 5000);
}

function scrollToBottom() {
    const messagesArea = document.getElementById('messagesArea');
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}
