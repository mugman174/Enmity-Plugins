var B;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(B||(B={}));var t;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(t||(t={}));var g;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(g||(g={}));var w;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(w||(w={}));var h;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number"})(h||(h={}));var b;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(b||(b={}));const f="enmity";function l(e){window.enmity.plugins.registerPlugin(e)}function M(e,r,s,u){window.enmity.clyde.sendReply(e,r,s,u)}const v={name:"wttr",commands:[],onStart(){const e={id:"wttr",applicationId:f,name:"wttr",displayName:"wttr",description:"Get the weather",displayDescription:"Get the weather",type:t.Chat,inputType:g.BuiltInText,options:[{name:"location",displayName:"location",description:"Location",displayDescription:"Location",type:h.String,required:!0}],execute:async function(r,s){let u=[{image:{url:`https://wttr.in/${r[0].value}.png`}}];M(s.channel.id,{embeds:u})}};this.commands.push(e)},onStop(){this.commands=[]}};l(v);
