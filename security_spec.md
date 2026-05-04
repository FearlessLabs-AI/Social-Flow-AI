# Security Specification for Social Flow AI

## 1. Data Invariants
- A `GeneratedContent` document must have a valid `userId` matching the authenticated user.
- Timestamps must be numbers (seconds or milliseconds).
- Platform must be one of: 'instagram', 'tiktok', 'twitter', 'linkedin', 'ads', 'general'.
- Tone must be one of: 'funny', 'professional', 'viral', 'luxury', 'gen-z'.

## 2. Dirty Dozen Payloads
1. **Identity Theft**: Creating a piece of content with another user's `userId`.
2. **Shadow Field Injection**: Adding an `isPremium: true` field to the content document.
3. **Poisoned ID**: Creating a content document with a 1MB string as the ID.
4. **Tone Bypass**: Setting the tone to something malicious or invalid like `hacker_mode`.
5. **Unauthorized Read**: One user trying to list all content from another user.
6. **Orphaned Writes**: Creating a document without a prompt.
7. **Timestamp Spoofing**: Setting a timestamp in the future.
8. **Platform Injection**: Using an unsupported platform name.
9. **Update Hijacking**: Modifying the text of a content piece owned by another user.
10. **Delete Vandalism**: Deleting a content piece owned by another user.
11. **Bulk Exfiltration**: Querying for all documents without a `userId` filter.
12. **Type Confusion**: Sending `timestamp` as a string instead of a number.

## 3. Test Runner (Draft)
The `firestore.rules` will be verified against these patterns.
