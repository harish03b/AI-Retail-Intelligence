const SESSION_KEY = "retail_ai_session_id";

/**
 * Generates a browser-safe UUID.
 */
function createSessionId(): string {
  return crypto.randomUUID();
}

/**
 * Returns the current session id.
 * Creates one if it doesn't exist.
 */
export function getSessionId(): string {
  let sessionId = localStorage.getItem(
    SESSION_KEY
  );

  if (!sessionId) {
    sessionId = createSessionId();

    localStorage.setItem(
      SESSION_KEY,
      sessionId
    );
  }

  return sessionId;
}

/**
 * Clears the current session.
 *
 * Useful later for:
 * - Logout
 * - New Conversation
 * - Reset Chat
 */
export function clearSession(): void {
  localStorage.removeItem(
    SESSION_KEY
  );
}