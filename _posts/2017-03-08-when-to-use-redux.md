---
layout: post
title: When To Use Redux
description: "Answers to a few of the questions I had considering using Redux."
modified: 2017-03-08
tags: [react, redux, javascript]
image:
  feature: main-bg.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---

If you are considering using [React](https://facebook.github.io/react/) on your next project, or if you're already using it, more than likely you've come across [Redux](http://redux.js.org/). Anytime I read about a new tool or pattern, the first question I ask is *"why should I use this?"* I asked myself that question when I first heard about Redux, but couldn't find a clear answer.

When I first started reading about Redux, one of the first actions I took was to complete the EggHead.io course ["Getting Started with Redux"](https://egghead.io/courses/getting-started-with-redux), written by the creator of Redux, Dan Abramov. Dan does a great job breaking the pattern down in to its most basic concepts and explaining how they work, but I left still wondering *"why Redux?"*

If you do a search for *"why use Redux"* or *"when to use Redux"*, you'll come across plenty of articles, including [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367#.p8wx8mbj3), again written by the creator of Redux, Dan Abramov. Dan makes many compelling arguments here about the benefits of Redux, but also acknowledges that Redux isn't intended for every project, and even states that *"if you’re just learning React, don’t make Redux your first choice."* In other articles you'll come across statements like this:
*"You’ll know when you need Redux. If you aren’t sure if you need it, you don’t need it."* When I read this statement I was even more confused about why/if I needed to use Redux.

Finally, after a few hours of searching, I came across a [Stack Overflow post](http://stackoverflow.com/questions/36631761/when-should-i-add-redux-to-a-react-app) that provided some key insights: *if you follow the React model, you’ll end up with a bunch of very large components at the top of the component tree that pass a myriad of props down through some intermediate components that don’t use them, just to reach a few leaf components that actually care about that data.... If you don’t have this problem yet, you probably don’t need Redux.* **FINALLY**, an answer that provided details of a specific problem that can be solved with Redux. If you've used React on anything larger than an example project, you can easily imagine encountering this exact scenario.

Not long after this breakthrough I recognized a major decision point in whether or not we choose to use Redux: **routing**. We strive to use the best tool for the job, that means sometimes we stick with the tried-and-true MVC pattern with routing handled server-side, but if we need a more rich frontend experience we'll go with a web API backend with routing handled client-side. React will fit in to either of these patterns, but we tend to leverage Redux when using a web API backend since that generally requires more state management client-side.

Another consideration to make is if you're going to be utilizing a lot of shared, reusable components. In my experience state management becomes much more complicated when dealing with mostly shared components, and simplifying complex state management is where Redux shines.

For example, I recently completed working a complex event registration system where all of the routing was done client-side with a web API backend. We tried to utilize shared components whenever possible, which made state management even trickier. We decided to use Redux, and while it did add some complexity, it made made state management between shared components much less painful. Each component was passed only the properties that it actually needed, and we were able to take advantage of some of the cool things Redux has to offer, like being able to track how every action affects the state via [Redux DevTools](https://github.com/gaearon/redux-devtools).

**TL;DR**: if you find yourself passing props through a chain of components that don't actually use them in order to reach components that do, if you're considering client-side routing, or if you think you'll be utilizing mostly shared components you may want to consider Redux.

Redux brings a lot a great features to the table at the price of increased complexity, especially if you work alongside developers who are not JavaScript experts. Even the creator of the tool states it's not for everyone. Like any tool you should ask yourself *"what problem does this solve?"* and *"is this the right tool for the job?"* When I first asked myself those same questions about Redux I could not find clear answers, but eventually I found what I needed. Hopefully this post will help others who are asking themselves those same questions.