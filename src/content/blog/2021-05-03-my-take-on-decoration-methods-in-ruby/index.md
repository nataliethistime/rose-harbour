---
title: 'My Take on Decoration Methods in Ruby'
description: ''
pubDate: 'May 3 2021'
heroImage: './images/cover.png'
---

One of the fundamentals of computing is that the way that information is presented on the screen is different to the way
that it is stored or processed. Today's date, for instance, could be stored as a number (`1620000000`) or as a string
(`2021-05-03 00:00:00 +0000`) or really any format. There will always be multiple different ways of storing information
and this is fine. The challenge I want to talk about today though is organising the code for rendering this information
in Ruby on Rails applications.

The "Rails Way" of doing this is with helper methods.

For example you might have a set of helpers defined as below:

```ruby
module PersonHelper
  def person_full_name(person)
    "#{person.first_name} #{person.last_name}"
  end
  def person_birthday(person)
    return nil if person.birthday.blank?
    person.birthday.strftime '%m/%d/%Y'
  end
end
```

And then in your view code you would use these like so:

```ruby
<h1>List of People and Their Birthdays</h1>
<table>
  <thead>
    <tr>
      <th>Full Name</th>
      <th>Birthday</th>
    </tr>
  </thead>
  <tbody>
    <% @people.each do |person| %>
      <tr>
        <td><%= person_full_name(person) %></td>
        <td><%= person_birthday(person) %></td>
      </tr>
    <% end %>
  </tbody>
</table>
```

This *works* but there's a few things to note.

1. Rails helpers are global. So you have to give each helper a unique name. It can also be difficult to tell where
   functionality is coming from.
2. Helpers are detached from the object they relate to. So you have to pass the object into the helper each time you use
   it.
3. Helpers can end up duplicating functionality because it's difficult to share it. You could end up in a situation
   where helpers are guessing what kind of thing they're looking at and potentially acting incorrectly.

I also had the personal barrier of this solution just not 'feeling right'. I was new to a Rails codebase at the time and
couldn't wrap my head around where all of the helpers were. The naming conventions weren't clear and I had a hard time
looking at various components and figuring out if they were important or not.

So I hacked my own solution and [made it available as a Ruby Gem](https://rubygems.org/gems/mini_decorator).

## Enter `mini_decorator`

On [GitHub](https://github.com/1vasari/mini_decorator) I describe it as:

> Minimal decoration of Ruby objects using a `decorate` method. The idea is to create the thinnest possible layer of
> abstraction between presentational methods and 'work' methods. I was inspired by gems such
> as [Draper](https://github.com/drapergem/draper), but felt like they were doing too much. Going back to the person
> name/birthday example above, with my solution the implementation would be something akin to this.

Define a person decorator (note, the heuristic similarity to helpers):

```ruby
# app/decorators/person_decorator.rb
class PersonDecorator
  def full_name(person)
    "#{person.first_name} #{person.last_name}"
  end
  def birthday(person)
    return nil if person.birthday.blank?
    person.birthday.strftime '%m/%d/%Y'
  end
end

```

Join the decorator into the model:

```ruby
# app/models/person.rb
class Person < ApplicationRecord
  # Imagine there's other model stuff in here such as relations or validation..
  decorate_with PersonDecorator
end
```

And finally, you would call the `decorate` method, passing in the attribute you want to render:

```ruby
<h1>List of People and Their Birthdays</h1>
<table>
  <thead>
    <tr>
      <th>Full Name</th>
      <th>Birthday</th>
    </tr>
  </thead>
  <tbody>
    <% @people.each do |person| %>
      <tr>
        <td><%= person.decorate(:full_name) %></td>
        <td><%= person.decorate(:birthday) %></td>
      </tr>
    <% end %>
  </tbody>
</table>
```

I've found this system very useful for keeping decoration methods separate from model code but still organised and
testable.

The other thing `mini_decorator` handles nicely is changing formats or choosing to format attributes that weren't being
formatted before. If you call `person.decorate(:email)` (which isn't a decorator in our examples) then you will get the
raw `email` attribute from the `Person` object. You can then later define a decorator for `email` which then is used
instead of the raw value.

This system isn't perfect. But it feels better to me and I enjoy using it instead of polluting the global namespace, or
mixing formatting code into model code.

## Getting Started

Add `mini_decorator` to your Gemfile and then `bundle install`.

```ruby
gem 'mini_decorator', '0.0.2'
```

You will also need to set up the `decorate_with` method in your model base class, usually called `ApplicationRecord`.

```ruby
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  def self.decorate_with(decorator)
    include MiniDecorator.new(decorator.new)
  end
end
```

You can then create decorator classes and use them in your models. Hooray!

In addition to this, I usually create a `DecoratorBase` class that all decorators inherit from. Something like the
following is a nice starting point:

```ruby
class DecoratorBase
  def helpers
    ApplicationController.helpers
  end

  def routes
    Rails.application.routes.url_helpers
  end

  def localize(*args)
    I18n.localize(*args)
  end

  def updated_at(item)
    localize item.updated_at, format: :short
  end

  def updated_at_ago(item)
    "#{helpers.time_ago_in_words(item.updated_at)} ago"
  end

  def created_at(item)
    localize item.created_at, format: :short
  end

  def created_at_ago(item)
    "#{helpers.time_ago_in_words(item.created_at)} ago"
  end
end
```

## Usage without Rails

The implementation of `mini_decorator` currently doesn't use any Rails-specific trickery, so you're perfectly safe using
this library in non-Rails apps.

## Implemantion Details

`mini_decorator` is actually only a few lines of Ruby code. You can see the whole mess below.

Note the extending from `Module` trick is because `include` only accepts modules but we still want to be able to pass a
parameter into it. This allows us to write `include MiniDecorator.new(MyFancyDecorator.new)` in the class body of the
object we're decorating.

```ruby
class MiniDecorator < Module
  def initialize(decorator)
    define_method(:decorate) do |property|
      if decorator.respond_to? property
        decorator.public_send(property, self)
      elsif self.respond_to? property
        self.public_send(property)
      else
        raise NoMethodError.new(
          "No decorator or object method found for property: #{property}"
        )
      end
    end
  end
end
```

Hopefully this helps and if you ever end up using `mini_decorator` for anything, I would love to know!
