var h;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(h||(h={}));var d;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(d||(d={}));var g;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(g||(g={}));var w;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(w||(w={}));var t;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number"})(t||(t={}));var f;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(f||(f={}));async function b(e){return new Promise((u,s)=>{window.enmity.rest.get(e).then(r=>{u(r)}).catch(r=>{s(r)})})}function n(e){window.enmity.plugins.registerPlugin(e)}function B(e,u,s,r){window.enmity.clyde.sendReply(e,u,s,r)}function l(e){window.enmity.toast.showToast(e)}const v={name:"UrbanDict",commands:[],onStart(){command={name:"urban",displayName:"urban",description:"Searches urban dictionary for a word",displayDescription:"Searches urban dictionary for a word",options:[{name:"word",displayName:"word",description:"The word to search for",displayDescription:"The word to search for",type:t.String,required:!0},{name:"send",displayName:"send",description:"Whether to send the result in a message",displayDescription:"Whether to send the result in a message",type:t.Boolean,required:!1}],execute:async(e,u)=>{var s;word=e[0].value;let r=await b(`https://api.urbandictionary.com/v0/define?term=${word}`).body;B((s=r.list[0])==null?void 0:s.definition)}},this.commands.push(command)},onStop(){this.commands=[]}};try{n(v)}catch{l({content:"o deer urban dict failed to exist"})}
