//= require <json2>
//= require <array.ext>
//= require <jquery>
//= require <jquery.tmpl>
//= require <jquery.audio>

//= require <spine>
//= require <spine.model.ajax>
//= require <spine.controller.manager>
//= require <utils>

//= require <models/search>
//= require <models/message>
//= require <models/channel>

//= require <controllers/messages>
//= require <controllers/sidebar>
//= require <controllers/searches>
//= require <controllers/settings>

jQuery(function($){

window.App = Spine.Controller.create({
  el: $("body"),
    
  elements: {
    "#sidebar": "sidebarEl",
    "#messages": "messagesEl",
    "#searches": "searchesEl",
    "#settings": "settingsEl"
  },
  
  init: function(){
    this.messages = Messages.inst({el: this.messagesEl});
    this.sidebar  = Sidebar.inst({el: this.sidebarEl});
    this.searches = Searches.inst({el: this.searchesEl});    
    this.settings = Settings.inst({el: this.settingsEl});
    
    // Activate appropriate view when sidebar is clicked
    this.sidebar.bind("change", this.proxy(function(e, type, item){
      if (type == "channels") this.messages.changeChannel(item);
      else if (type == "settings") this.settings.active();
    }));
    
    // Make sure only one view is visible
    this.manager = Spine.Controller.Manager.inst();
    this.manager.addAll(this.messages, this.searches, this.settings);
    
    // Remove selected sidebar items when searching
    this.manager.bind("change", this.proxy(function(e, current){
      if (current == this.searches) this.sidebar.deactivate();
    }));
  }
}).include(Spine.Log).inst();

});

//= require <juggernaut>