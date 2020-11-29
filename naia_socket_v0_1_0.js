const naia_socket_v0_1_0={channel:null,encoder:new TextEncoder,decoder:new TextDecoder("utf-8"),dropped_outgoing_messages:[],js_objects:{},unique_js_id:0,plugin:function(e){e.env.naia_connect=function(e){naia_socket_v0_1_0.connect(e)},e.env.naia_send=function(e){naia_socket_v0_1_0.send(e)},e.env.naia_resend_dropped_messages=function(){naia_socket_v0_1_0.resend_dropped_messages()},e.env.naia_create_string=function(e, n){return naia_socket_v0_1_0.js_create_string(e,n)},e.env.naia_unwrap_to_str=function(e, n, t){naia_socket_v0_1_0.js_unwrap_to_str(e,n,t)},e.env.naia_string_length=function(e){return naia_socket_v0_1_0.js_string_length(e)},e.env.naia_free_object=function(e){naia_socket_v0_1_0.js_free_object(e)},e.env.naia_random=function(){return Math.random()},e.env.naia_now=function(){return Date.now()}},connect:function(e){let n=this,t="http://"+naia_socket_v0_1_0.get_js_object(e)+"/new_rtc_session",s=new RTCPeerConnection({iceServers:[{urls:["stun:stun.l.google.com:19302"]}]});this.channel=s.createDataChannel("webudp",{ordered:!1,maxRetransmits:0}),this.channel.binaryType="arraybuffer",this.channel.onopen=function(){n.channel.onmessage=function(e){let t=new Uint8Array(e.data),s=n.decoder.decode(t);wasm_exports.receive(naia_socket_v0_1_0.js_object(s))}},this.channel.onerror=function(e){n.error("data channel error",e.message)},s.onicecandidate=function(e){e.candidate},s.createOffer().then(function(e){return s.setLocalDescription(e)}).then(function(){let e=new XMLHttpRequest;e.open("POST",t),e.onload=function(){if(200===e.status){let t=JSON.parse(e.responseText);s.setRemoteDescription(new RTCSessionDescription(t.answer)).then(function(){let e=new RTCIceCandidate(t.candidate);s.addIceCandidate(e).then(function(){}).catch(function(e){n.error("error during 'addIceCandidate'",e)})}).catch(function(e){n.error("error during 'setRemoteDescription'",e)})}else n.error("error sending POST /new_rtc_session request",{response_status:e.status})},e.onerror=function(e){n.error("error sending POST /new_rtc_session request",e)},e.send(s.localDescription.sdp)}).catch(function(e){n.error("error during 'createOffer'",e)})},error:function(e, n){n.naia_desc=e,wasm_exports.error(this.js_object(JSON.stringify(n)))},send_str:function(e){if(this.channel)try{this.channel.send(this.encoder.encode(e))}catch(n){this.dropped_outgoing_messages.push(e)}else this.dropped_outgoing_messages.push(e)},send:function(e){let n=naia_socket_v0_1_0.get_js_object(e);this.send_str(n)},resend_dropped_messages:function(){if(this.channel&&this.dropped_outgoing_messages.length>0){let e=this.dropped_outgoing_messages;this.dropped_outgoing_messages=[];for(let n=0; n<e.length; n+=1)this.send_str(e[n])}},js_create_string:function(e, n){let t=UTF8ToString(e,n);return this.js_object(t)},js_unwrap_to_str:function(e, n, t){let s=this.js_objects[e],r=this.toUTF8Array(s),o=r.length,i=new Uint8Array(wasm_memory.buffer,n,t);for(let e=0; e<o; e++)i[e]=r[e]},js_string_length:function(e){let n=this.js_objects[e];return this.toUTF8Array(n).length},js_free_object:function(e){delete this.js_objects[e]},toUTF8Array:function(e){let n=[];for(let t=0; t<e.length; t++){let s=e.charCodeAt(t);s<128?n.push(s):s<2048?n.push(192|s>>6,128|63&s):s<55296||s>=57344?n.push(224|s>>12,128|s>>6&63,128|63&s):(t++,s=65536+((1023&s)<<10|1023&e.charCodeAt(t)),n.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|63&s))}return n},js_object:function(e){let n=this.unique_js_id;return this.js_objects[n]=e,this.unique_js_id+=1,n},get_js_object:function(e){return this.js_objects[e]}};miniquad_add_plugin({register_plugin:naia_socket_v0_1_0.plugin});