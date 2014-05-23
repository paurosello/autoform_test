Authors = new Meteor.Collection("authors");

var Schemas = {};
Schemas.Book = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    }
});

Schemas.Author = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    books: {
        type: [Schemas.Book],
        label: "Books",
        optional: true,
        minCount: 0
    }
});

Authors.attachSchema(Schemas.Author);

if (Meteor.isClient) {
  Template.update.editingDoc = function () {
    return Authors.findOne({_id: Session.get("selectedDocId")});
  };

  Template.body.authors = function () {
    return Authors.find();
  };

  Template.author.events = {
    "click": function(){
      Session.set("selectedDocId", this._id)
    }
  }
}
