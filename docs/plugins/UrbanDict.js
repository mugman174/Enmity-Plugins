var b;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(b||(b={}));var h;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(h||(h={}));var g;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(g||(g={}));var d;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(d||(d={}));var t;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number"})(t||(t={}));var f;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(f||(f={}));const w="enmity";async function B(e){return new Promise((s,u)=>{window.enmity.rest.get(e).then(r=>{s(r)}).catch(r=>{u(r)})})}function v(e){window.enmity.plugins.registerPlugin(e)}function S(e,s,u,r){window.enmity.clyde.sendReply(e,s,u,r)}const a={name:"UrbanDict",commands:[],onStart(){const e={id:"urban-dict",applicationId:w,name:"urban",displayName:"urban",description:"Searches urban dictionary for a word",displayDescription:"Searches urban dictionary for a word",type:h.Chat,inputType:g.BuiltInText,options:[{name:"word",displayName:"word",description:"The word to search for",displayDescription:"The word to search for",type:t.String,required:!0},{name:"send",displayName:"send",description:"Whether to send the result in a message",displayDescription:"Whether to send the result in a message",type:t.Boolean,required:!1}],execute:async(s,u)=>{var r;let n=s[0].value,l=await B({url:`https://api.urbandictionary.com/v0/define?term=${n}`});S(u.channel.id,(r=JSON.parse(l.body).list[0])==null?void 0:r.definition)}};this.commands.push(e)},onStop(){this.commands=[]}};v(a);
