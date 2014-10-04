# OAuth 1.0a for API's

A great thing we all should do when building integrations to other systems with
Meteor is to use OAuth1Binding for authorized HTTP calls found in the [core module oauth1](https://github.com/meteor/meteor/tree/devel/packages/oauth1).

But wait! There's a problem with the _call method of the [current implementation (0.9.3.1)](https://github.com/meteor/meteor/blob/release-0.9.3/packages/oauth1/oauth1_binding.js).

There's no way of passing data or content, only parameters!
This kind of makes it impossible to do POST, PUT or DELETE correctly.

That's where this package comes in hand, until Meteor has merged the
[pull request](https://github.com/meteor/meteor/pull/2761) I have also created.

## Example using OAuthBinding1

If your not doing any POST, PUT or DELETE you don't need this package.

* I use OAuth1Binding for the [Drupal Service package](https://github.com/timbrandin/meteor-drupal-service).

* The [Twitter API package](https://github.com/Sewdn/meteor-twitter-api) also uses OAuth1Binding.

It's quite convenient using OAuth1Binding, instead of writing your own method to
sign requests correctly for your implementation. I did this for the first version of the Drupal Service package.
