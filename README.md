# Murmurations Profile Generator

## Firebase Cloud Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if isUser(uid);
    }
    match /profiles/{document} {
      allow read: if isOwner();
      allow delete: if isOwner();
      allow update: if isOwner() && willBeOwner();
      allow create: if true;
    }
  }
}
function isUser(uid) {
  return isSignedIn() && request.auth.uid == uid;
}
function isSignedIn() {
  return request.auth.uid != null;
}
function isOwner(){
  return isUser(currentData().user);
}
function willBeOwner(){
  return isUser(incomingData().user);
}
function currentData() {
  return resource.data;
}
function incomingData() {
  return request.resource.data;
}
```
