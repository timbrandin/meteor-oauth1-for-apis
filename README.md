# OAuth 1.0a for API's

I great thing we all should do with Meteor is to use core OAuth1Binding for
doing authorized API calls.

But wait! There's a problem with the _call method of the [current implementation (0.9.3.1)](https://github.com/meteor/meteor/blob/release-0.9.3/packages/oauth1/oauth1_binding.js).

There's no way of passing data or content, only parameters.
This kind of makes it impossible to POST, PUT or DELETE correcly.

That's where this package comes in hand until Meteor has merged the
[pull request](https://github.com/meteor/meteor/pull/2761) I have also created.
