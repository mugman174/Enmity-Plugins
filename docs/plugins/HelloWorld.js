function registerPlugin(e){window.enmity.plugins.registerPlugin(e)}var ApplicationCommandSectionType;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(ApplicationCommandSectionType||(ApplicationCommandSectionType={}));var ApplicationCommandType;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(ApplicationCommandType||(ApplicationCommandType={}));var ApplicationCommandInputType;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(ApplicationCommandInputType||(ApplicationCommandInputType={}));var ApplicationCommandPermissionType;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(ApplicationCommandPermissionType||(ApplicationCommandPermissionType={}));var ApplicationCommandOptionType;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number"})(ApplicationCommandOptionType||(ApplicationCommandOptionType={}));var InteractionTypes;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(InteractionTypes||(InteractionTypes={}));const EnmitySectionID="enmity";function sendReply(e,t,n,i){window.enmity.clyde.sendReply(e,t,n,i)}function showToast(e){window.enmity.toast.showToast(e)}function showDialog(e={title:"Default dialog"}){window.enmity.dialog.showDialog(e)}function setString(e){window.enmity.clipboard.setString(e)}async function getString(){return window.enmity.clipboard.getString()}const HelloWorld={name:"HelloWorld",commands:[],onStart(){const h={id:"hello-world",applicationId:EnmitySectionID,name:"hello",displayName:"hello",description:"hello world",displayDescription:"hello world",type:ApplicationCommandType.Chat,inputType:ApplicationCommandInputType.BuiltInText,options:[{name:"toast",displayName:"toast",description:"Toast",displayDescription:"Toast",type:ApplicationCommandOptionType.String,required:!1}],execute:async function(e,t){if(sendReply(t.channel.id,"Hello, world!"),e){let n={content:e[0].value,source:42069};showToast(n)}}};toasty=e=>showToast({content:e});const dialog={id:"dialogue",applicationId:EnmitySectionID,name:"dialog",displayName:"dialog",description:"Display a dialog box",displayDescription:"Display a dialog box",type:ApplicationCommandType.Chat,inputType:ApplicationCommandInputType.BuiltInText,options:[{name:"message",displayName:"message",description:"Dialog message",displayDescription:"Dialog message",type:ApplicationCommandOptionType.String,required:!0}],execute:async function(e,t){showDialog({body:e[0].value,title:"Prompt",onCancel:()=>toasty("Cancelled"),onConfirm:()=>toasty("Confirm"),onSecondaryConfirm:()=>toasty("Confirm2")})}},clippy={id:"clip",applicationId:EnmitySectionID,name:"clip",displayName:"clip",description:"Clipboard fun",displayDescription:"Clipboard fun",type:ApplicationCommandType.Chat,inputType:ApplicationCommandInputType.BuiltInText,options:[{name:"data",displayName:"data",description:"Leave empty to get clipboard, or set to set",displayDescription:"Leave empty to get clipboard, or set to set",type:ApplicationCommandOptionType.String,required:!1}],execute:async function(e,t){e.length&&e[0]?(await setString(e[0].value),o=e[0].value):o=await getString(),sendReply(o),toasty(o)}},evalcmd={id:"eval",applicationId:EnmitySectionID,name:"eval",displayName:"eval",description:"Enter some jaberscrep and run",displayDescription:"Enter some javerscrept and run",type:ApplicationCommandType.Chat,inputType:ApplicationCommandInputType.BuiltInText,options:[{name:"js",displayName:"js",description:"the code",displayDescription:"the code",type:ApplicationCommandOptionType.String,required:!0}],execute:async function(args,message){sendReply(eval(args[0].value))}};this.commands.push(evalcmd),this.commands.push(clippy),this.commands.push(h),this.commands.push(dialog)},onStop(){this.commands=[]}};registerPlugin(HelloWorld);
