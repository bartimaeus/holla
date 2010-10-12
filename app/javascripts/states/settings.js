//= require <jquery.editable>

(function($){
  
jQuery(function(){
  $("input.copy").live("click", function(){
    $(this).select();
  });
})

var state = App.state.add("settings");

state.setup(function(){  
  this.channels.delegate("a.disconnect", "click", function(){
    var channel = $(this).parents(".connect-item").item();
    $.confirm("Are you sure you want to remove this channel?", function(){
      channel.disconnect();
    });
  });
  
  this.channels.delegate("a.share", "click", function(){
    $(this).parents("tr").next(".share").show();
  });
  
  this.channels.delegate("td.name", "edited", function(e, name){
    var channel  = $(this).parents(".connect-item").item();
    channel.name = name;
    channel.save();
    channel.updateRemote();
  });
  
  this.channels.delegate("td.name", "click", function(){
    $(this).startEditable();
  });

  this.channelConnector = new SuperConnect(Channel, this.channels);  
  this.channelConnector.render();
  
  this.create.submit(this.proxy(function(e){
    e.preventDefault();

    var input = this.create.find("input");
    
    if (input.val() == "") return;
    
    var channel = new Channel;
    channel.name = input.val();
    channel.save();
    channel.createRemote();
    
    input.val("");
    input.select();
  }));
});

state.hasView = true;

})(jQuery);