export interface ToolCategory {
  name: string;
  pattern: RegExp;
  description: string;
  requiresOrgMode?: boolean;
  /**
   * Optional explicit allow-list of tool names. When set, the preset matches
   * exactly these tools (anchored) instead of relying on the loose `pattern`.
   * Use this for app-scoped presets where a regex would over-match across apps
   * (e.g. `mail` also matching `shared-mailbox-*` / `mailbox-settings`).
   * `pattern` is still required as a fallback/source-of-truth for tooling.
   */
  tools?: string[];
}

export const TOOL_CATEGORIES: Record<string, ToolCategory> = {
  mail: {
    name: 'mail',
    pattern: /mail|attachment|draft|download-bytes/i,
    description: 'Email operations (read, send, manage folders, attachments)',
  },
  calendar: {
    name: 'calendar',
    pattern: /calendar|event|schedule|meeting/i,
    description: 'Calendar and event management',
  },
  files: {
    name: 'files',
    pattern: /drive|file|upload|download|folder|item/i,
    description: 'OneDrive file and folder operations',
  },
  personal: {
    name: 'personal',
    pattern:
      /mail|calendar|drive|contact|todo|onenote|attachment|draft|event|file|folder|search|query|download-bytes|parse-teams-url/i,
    description:
      'Personal productivity tools (mail, calendar, files, contacts, tasks, notes, search)',
  },
  work: {
    name: 'work',
    pattern:
      /team|channel|chat|sharepoint|planner|site|list|shared|search|query|download-bytes|schedule|meeting/i,
    description: 'Organization/work tools (Teams, SharePoint, shared mailboxes, search)',
    requiresOrgMode: true,
  },
  excel: {
    name: 'excel',
    pattern: /excel|worksheet|workbook|range|chart/i,
    description: 'Excel spreadsheet operations',
  },
  contacts: {
    name: 'contacts',
    pattern: /contact/i,
    description: 'Outlook contacts management',
  },
  tasks: {
    name: 'tasks',
    pattern: /todo|planner|task/i,
    description: 'Task and planning tools (To Do, Planner)',
  },
  onenote: {
    name: 'onenote',
    pattern: /onenote|notebook|section|page/i,
    description: 'OneNote notebook operations',
  },
  search: {
    name: 'search',
    pattern: /search|query/i,
    description: 'Microsoft Search capabilities',
  },
  users: {
    name: 'users',
    pattern: /user|list-users|download-bytes/i,
    description: 'User directory access',
    requiresOrgMode: true,
  },
  outlook: {
    name: 'outlook',
    pattern: /mail|calendar|event|contact|attachment|draft|schedule|meeting-times/i,
    description: 'Outlook app: email, calendar, and contacts',
    tools: [
      // Mail
      'list-mail-messages',
      'list-mail-folders',
      'list-mail-child-folders',
      'create-mail-folder',
      'create-mail-child-folder',
      'update-mail-folder',
      'delete-mail-folder',
      'list-mail-folder-messages',
      'get-mail-message',
      'send-mail',
      'create-draft-email',
      'delete-mail-message',
      'move-mail-message',
      'update-mail-message',
      'add-mail-attachment',
      'create-mail-attachment-upload-session',
      'list-mail-attachments',
      'get-mail-attachment',
      'delete-mail-attachment',
      'forward-mail-message',
      'reply-mail-message',
      'reply-all-mail-message',
      'create-forward-draft',
      'create-reply-draft',
      'create-reply-all-draft',
      'send-draft-message',
      'list-mail-rules',
      'create-mail-rule',
      'update-mail-rule',
      'delete-mail-rule',
      // Calendar
      'list-calendars',
      'create-calendar',
      'update-calendar',
      'delete-calendar',
      'list-calendar-events',
      'get-calendar-event',
      'create-calendar-event',
      'update-calendar-event',
      'delete-calendar-event',
      'accept-calendar-event',
      'decline-calendar-event',
      'tentatively-accept-calendar-event',
      'cancel-calendar-event',
      'forward-calendar-event',
      'get-calendar-view',
      'get-schedule',
      'find-meeting-times',
      'list-calendar-event-instances',
      'list-specific-calendar-events',
      'get-specific-calendar-event',
      'create-specific-calendar-event',
      'update-specific-calendar-event',
      'delete-specific-calendar-event',
      'get-specific-calendar-view',
      'list-shared-calendar-events',
      'get-shared-calendar-view',
      'list-calendar-events-delta',
      'list-calendar-view-delta',
      'snooze-calendar-event-reminder',
      'dismiss-calendar-event-reminder',
      // Contacts
      'list-outlook-contacts',
      'get-outlook-contact',
      'create-outlook-contact',
      'update-outlook-contact',
      'delete-outlook-contact',
      'get-contact-folders',
      'list-contact-folder-child-folders',
      'list-child-folder-contacts',
      'list-contacts-delta',
    ],
  },
  onedrive: {
    name: 'onedrive',
    pattern: /drive|onedrive-file|folder-files|upload-session/i,
    description: 'OneDrive app: file and folder operations',
    tools: [
      'list-drives',
      'get-drive',
      'get-drive-root-item',
      'get-drive-delta',
      'list-folder-files',
      'get-drive-item',
      'search-onedrive-files',
      'download-onedrive-file-content',
      'upload-file-content',
      'create-upload-session',
      'delete-onedrive-file',
      'create-onedrive-folder',
      'move-rename-onedrive-item',
      'share-drive-item',
      'list-drive-item-permissions',
      'delete-drive-item-permission',
      'list-drive-item-versions',
    ],
  },
  teams: {
    name: 'teams',
    pattern: /team|channel|chat|online-meeting|meeting-transcript|meeting-recording|attendance/i,
    description: 'Teams app: chats, channels, and online meetings',
    requiresOrgMode: true,
    tools: [
      // Chats
      'list-chats',
      'get-chat',
      'create-chat',
      'list-chat-members',
      'list-chat-messages',
      'get-chat-message',
      'send-chat-message',
      'reply-to-chat-message',
      'list-chat-message-replies',
      'set-chat-message-reaction',
      'unset-chat-message-reaction',
      'list-pinned-chat-messages',
      'pin-chat-message',
      'unpin-chat-message',
      // Teams & channels
      'list-joined-teams',
      'list-all-teams',
      'get-team',
      'get-primary-channel',
      'list-team-channels',
      'get-team-channel',
      'create-team-channel',
      'update-team-channel',
      'delete-team-channel',
      'list-channel-messages',
      'get-channel-message',
      'send-channel-message',
      'reply-to-channel-message',
      'list-channel-message-replies',
      'set-channel-message-reaction',
      'unset-channel-message-reaction',
      'list-channel-tabs',
      'add-team-member',
      'remove-team-member',
      'list-team-members',
      'get-channel-files-folder',
      // Online meetings
      'list-online-meetings',
      'get-online-meeting',
      'create-online-meeting',
      'update-online-meeting',
      'delete-online-meeting',
      'list-meeting-transcripts',
      'get-meeting-transcript',
      'get-meeting-transcript-content',
      'list-meeting-recordings',
      'get-meeting-recording',
      'get-meeting-recording-content',
      'list-meeting-attendance-reports',
      'get-meeting-attendance-report',
      'list-meeting-attendance-records',
    ],
  },
  all: {
    name: 'all',
    pattern: /.*/,
    description: 'All available tools',
  },
};

// Escape regex metacharacters so explicit tool names match literally.
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getCombinedPresetPattern(presets: string[]): string {
  const patterns = presets.map((preset) => {
    const category = TOOL_CATEGORIES[preset];
    if (!category) {
      throw new Error(
        `Unknown preset: ${preset}. Available presets: ${Object.keys(TOOL_CATEGORIES).join(', ')}`
      );
    }
    // When a preset defines an explicit allow-list, emit an anchored
    // alternation so it matches exactly those tools (no cross-app leakage).
    if (category.tools && category.tools.length > 0) {
      return `^(${category.tools.map(escapeRegex).join('|')})$`;
    }
    return category.pattern.source;
  });
  return patterns.join('|');
}

export function listPresets(): Array<{
  name: string;
  description: string;
  requiresOrgMode?: boolean;
}> {
  return Object.values(TOOL_CATEGORIES).map((category) => ({
    name: category.name,
    description: category.description,
    requiresOrgMode: category.requiresOrgMode,
  }));
}

export function presetRequiresOrgMode(preset: string): boolean {
  const category = TOOL_CATEGORIES[preset];
  return category?.requiresOrgMode || false;
}
